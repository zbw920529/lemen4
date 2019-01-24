<template>
    <Layout class="home">
        <Content class="userList">
            <Input placeholder="请输入bean名称" v-model="search" search class="search"/> 
            <Button type="success" @click="showModal = true,modalTitle='新建任务'">新建任务</Button>
            <Button type="primary" style="margin-Left:10px" @click="logModal = true">任务日志</Button>
            <Table class="table" :columns="columns" :data="data" 
            :loading="tabLoading" @on-selection-change="(items) => selectionList = items"></Table>
            <div class="footer">
                <div>
                    <Button type="info" @click="BatchFunction">批量立即运行</Button>
                    <Button type="success" @click="BatchRecovery" style="margin-Left:5px">批量恢复</Button>
                    <Button type="warning" @click="BatchStop" style="margin-Left:5px">批量停止</Button>
                    <Button type="error" @click="BatchDelete" style="margin-Left:5px">批量删除</Button>
                </div>
                <Page :total="totalCount" :page-size="this.limit" :current.sync="currPage"></Page>
            </div>
        </Content>
        <Modal v-model="showModal" :title="modalTitle" 
        @on-ok="setSchedule" :loading="modalLoading" >
            <Form :model="form" :rules="formRules"  label-position="right" :label-width="100">
                <FormItem prop="beanName" label="bean名称">
                    <Input placeholder="请输入bean名" v-model="form.beanName" clearable style="width: 300px"/>
                </FormItem>
                <FormItem prop="methodName" label="方法名称">
                    <Input placeholder="请输入方法名" v-model="form.methodName" clearable style="width: 300px"/>
                </FormItem>
                <FormItem prop="cronExpression" label="cron表达式">
                    <Input placeholder="如：0 0 12 * * ?" v-model="form.cronExpression" clearable style="width: 300px"/>
                </FormItem>
                <FormItem prop="params" label="参数">
                    <Input placeholder="请输入参数" v-model="form.params" clearable style="width: 300px"/>
                </FormItem>
                <FormItem prop="remark" label="备注">
                    <Input placeholder="请输入备注" v-model="form.remark" clearable style="width: 300px"/>
                </FormItem>
                <FormItem label="状态" prop="status">
                    <iSwitch v-model="form.status" :true-value="0" :false-value="1" size="large">
                        <span slot="open">运行</span>
                        <span slot="close">停止</span>
                    </iSwitch>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="logModal" draggable scrollable title="任务日志" width="970">
            <Input placeholder="请输入bean名" v-model="logSearch" search style="width:200px;margin-bottom:15px"/> 
            <Table  :columns="logColumns" :data="logData" :loading="logLoading" border></Table>
            <div slot="footer">
               <Page :total="logTotalCount" :page-size="this.limit" :current.sync="logCurrPage"></Page> 
            </div>
        </Modal>
    </Layout>
</template>

<script>
    import ajax from '@/utils/myAxios'
    export default {
        created() {
             this.getBeanList()
             this.getlogList()
        },
        data() {
            return {
                // 表头设置
                columns:[
                    {
                        type:'selection',
                        align:'center',
                        width:50
                    },
                    {
                        title: 'ID',
                        width:100,
                        align:'center',
                        sortable:true,
                        key: 'jobId'
                    },
                    {
                        title: 'bean名称',
                        sortable:true,
                        align:'center',
                        key: 'beanName'
                    },
                    {
                        title: '方法名称',
                        align:'center',
                        key: 'methodName'
                    },
                    {
                        title: '参数',
                        align:'center',
                        key: 'params'
                    },
                    {
                        title: 'cron表达式',
                        align:'center',
                        key: 'cronExpression'
                    },
                    {
                        title: '备注',
                        align:'center',
                        key: 'remark'
                    },
                    {
                        title: '状态',
                        align:'center',
                        key: 'status',
                        render:(h,params) => {
                        if(params.row.status === 0){
                            return h('Button',{},
                            [
                                h('span',{
                                    style:{
                                        display:'inline-block',
                                        background:'#57C5F7',
                                        width:'10px',
                                        height:'10px',                                       
                                        borderRadius:'50%',
                                        marginRight:'10px'
                                    }
                                }),
                                h('span',{
                                    style:{
                                        display:'inline-block',
                                    }
                                },'运行'),
                            ])
                        }else{
                            return h('Button',{},
                            [
                                h('span',{
                                    style:{
                                        display:'inline-block',
                                        background:'#FFAD33',
                                        width:'10px',
                                        height:'10px',                                       
                                        borderRadius:'50%',
                                        marginRight:'10px'
                                    }
                                }),
                                h('span',{
                                    style:{
                                        display:'inline-block',
                                    }
                                },'停止'),
                            ])
                        }
                            
                        }
                    },
                    {
                        title: '创建时间',
                        align:'center',
                        sortable:true,
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        width:300,
                        align:'center',
                         render:(h,params) => {
                            return h('div',[
                                h('Button',{
                                    props:{
                                        size:'small',
                                        type:'info'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:() => {
                                            const {jobId} = params.row
                                            ajax.post('/sys/schedule/run',[jobId]).then(({data}) => {
                                                if(data.code === 0){
                                                    this.$Notice.success({
                                                        title:'运行成功',
                                                        desc:`任务已成功运行`
                                                    })
                                                    this.getBeanList()
                                                }else(
                                                    this.$Notice.error({
                                                        title:'运行失败',
                                                        desc:data.msg
                                                    })
                                                )
                                            })
                                        }
                                     }
                                },'运行'),
                                h('Button',{
                                    props:{
                                        size:'small',
                                        type:'primary'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:() => {
                                            // console.log(params)
                                            this.showModal = true
                                            this.modalTitle = '修改任务'
                                            const {jobId,beanName,methodName,cronExpression,status,remark} = params.row
                                            this.form = {
                                                jobId,
                                                beanName,
                                                methodName,
                                                params:params.row.params,
                                                cronExpression,
                                                status,
                                                remark
                                            }
                                        }
                                    }
                                },'修改'),
                                h('Button',{
                                    props:{
                                        size:'small',
                                        type:'success'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:() => {
                                            const {jobId} = params.row
                                            ajax.post('/sys/schedule/resume',[jobId]).then(({data}) => {
                                                if(data.code === 0){
                                                    this.$Notice.success({
                                                        title:'恢复成功',
                                                        desc:`任务已成功恢复`
                                                    })
                                                    this.getBeanList()
                                                }else(
                                                    this.$Notice.error({
                                                        title:'恢复失败',
                                                        desc:data.msg
                                                    })
                                                )
                                            })
                                        }
                                     }
                                },'恢复'),
                                h('Button',{
                                    props:{
                                        size:'small',
                                        type:'warning'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:() => {
                                            const {jobId} = params.row
                                            ajax.post('/sys/schedule/pause',[jobId]).then(({data}) => {
                                                if(data.code === 0){
                                                    this.$Notice.success({
                                                        title:'停止成功',
                                                        desc:`任务已成功停止`
                                                    })
                                                    this.getBeanList()
                                                }else(
                                                    this.$Notice.error({
                                                        title:'停止失败',
                                                        desc:data.msg
                                                    })
                                                )
                                            })
                                        }
                                     }
                                },'停止'),
                                h('Button',{
                                    props:{
                                        size:'small',
                                        type:'error'
                                    },
                                    on:{
                                        click:() => {
                                            this.$Modal.confirm({
                                                title:`删除任务`,
                                                loading:true,
                                                content:`您正在删除bean任务 <b>${params.row.beanName}</b>, 是否确认删除？`,
                                                onOk:() => {
                                                    ajax.post('/sys/schedule/delete',[params.row.jobId]).then(({data}) =>{
                                                        if(data.code === 0){
                                                            this.$Notice.success({
                                                                title:'删除成功',
                                                                desc:`任务 <b>${params.row.beanName}</b> 已成功删除！`
                                                            })
                                                            this.getBeanList()
                                                        }else(
                                                            this.$Notice.error({
                                                                title:'删除失败',
                                                                desc:data.msg
                                                            })
                                                        )
                                                    })  
                                                    this.$Modal.remove()                          
                                                }
                                            })
                                        }
                                    }
                                },'删除')
                            ])
                         }
                    }
                ],               
                data:[],
                limit:10, //每页条数
                totalCount:1,
                totalPage:1,
                search:'',
                currPage:1,
                showModal:false,
                modalTitle:'',
                modalLoading:false,
                tabLoading:false,
                selectionList:[],
                logModal:false,
                form:{
                    jobId: 0,
                    beanName: "",
                    methodName: "",
                    params: "",
                    cronExpression: "",
                    status: 0,
                    remark: ""
                },
                formRules:{
                    beanName:[
                        {required:true,message:'bean名必须',trigger:'blur'},
                    ],
                    methodName:[
                        {required:true,message:'方法名必须',trigger:'blur'},
                    ],
                    cronExpression:[
                        {required:true,message:'cron表达式必须',trigger:'blur'},
                    ]
                },
                logColumns:[
                    {
                        title: 'ID',
                        align:'center',
                        sortable:true,
                        key: 'logId'
                    },
                    {
                        title: '任务ID',
                        align:'center',
                        sortable:true,
                        key: 'jobId'
                    },
                    {
                        title: 'bean名称',
                        sortable:true,
                        align:'center',
                        key: 'beanName'
                    },
                    {
                        title: '方法名称',
                        align:'center',
                        key: 'methodName'
                    },
                    {
                        title: '参数',
                        align:'center',
                        key: 'params'
                    },
                    {
                        title: '状态',
                        align:'center',
                        key: 'status',
                        render:(h,params) => {
                        if(params.row.status === 0){
                            return h('Button',{},
                            [
                                h('span',{
                                    style:{
                                        display:'inline-block',
                                        background:'#57C5F7',
                                        width:'10px',
                                        height:'10px',                                       
                                        borderRadius:'50%',
                                        marginRight:'10px'
                                    }
                                }),
                                h('span',{
                                    style:{
                                        display:'inline-block',
                                    }
                                },'成功'),
                            ])
                        }else{
                            return h('Button',{},
                            [
                                h('span',{
                                    style:{
                                        display:'inline-block',
                                        background:'#E35836',
                                        width:'10px',
                                        height:'10px',                                       
                                        borderRadius:'50%',
                                        marginRight:'10px'
                                    }
                                }),
                                h('span',{
                                    style:{
                                        display:'inline-block',
                                    }
                                },'失败'),
                            ])
                        }
                            
                        }
                    },
                    {
                        title: '耗时/毫秒',
                        align:'center',
                        sortable:true,
                        key: 'time'
                    },
                    {
                        title: '执行时间',
                        align:'center',
                        sortable:true,
                        key: 'createTime'
                    }
                    
                ],
                logTotalCount:1,
                logCurrPage:1,
                logData:[],
                logLoading:false,
                logSearch:''
            }
        },
        methods:{
            BatchStop(){
                let len = this.selectionList.length
                // console.log(userIdList)
                if(len > 0){
                    let jobIdList = this.selectionList.map(item => {
                        return item.jobId
                    })
                    this.$Modal.confirm({
                        title:`批量停止`,
                        loading:true,
                        content:`您正在批量停止任务, 是否确认停止？`,
                        onOk:() => {
                            ajax.post('/sys/schedule/pause',jobIdList).then(({data}) =>{
                                if(data.code === 0){
                                    this.$Notice.success({
                                        title:'停止成功',
                                        desc:`批量停止任务成功！`
                                    })
                                    this.getBeanList()
                                }else(
                                    this.$Notice.error({
                                        title:'停止失败',
                                        desc:`批量停止任务失败！`
                                    })
                                )
                            })
                            this.$Modal.remove()                      
                        }
                           
                    })
                }else{
                   this.$Notice.info({
                       title:`系统提示`,
                       desc:`请先选择您要删除的用户！`,
                   }) 
                }
            },
            BatchRecovery(){
                let len = this.selectionList.length
                // console.log(userIdList)
                if(len > 0){
                    let jobIdList = this.selectionList.map(item => {
                        return item.jobId
                    })
                    this.$Modal.confirm({
                        title:`批量恢复`,
                        loading:true,
                        content:`您正在批量恢复任务, 是否确认恢复？`,
                        onOk:() => {
                            ajax.post('/sys/schedule/resume',jobIdList).then(({data}) =>{
                                if(data.code === 0){
                                    this.$Notice.success({
                                        title:'恢复成功',
                                        desc:`批量恢复任务成功！`
                                    })
                                    this.getBeanList()
                                }else(
                                    this.$Notice.error({
                                        title:'恢复失败',
                                        desc:`批量恢复任务失败！`
                                    })
                                )
                            })
                            this.$Modal.remove()                      
                        }
                           
                    })
                }else{
                   this.$Notice.info({
                       title:`系统提示`,
                       desc:`请先选择您要删除的用户！`,
                   }) 
                } 
            },
            BatchFunction(){
                let len = this.selectionList.length
                // console.log(userIdList)
                if(len > 0){
                    let jobIdList = this.selectionList.map(item => {
                        return item.jobId
                    })
                    this.$Modal.confirm({
                        title:`批量立即运行`,
                        loading:true,
                        content:`您正在批量运行任务, 是否确认运行？`,
                        onOk:() => {
                            ajax.post('/sys/schedule/run',jobIdList).then(({data}) =>{
                                if(data.code === 0){
                                    this.$Notice.success({
                                        title:'运行成功',
                                        desc:`批量运行任务成功！`
                                    })
                                    this.getBeanList()
                                }else(
                                    this.$Notice.error({
                                        title:'运行失败',
                                        desc:`批量运行任务失败！`
                                    })
                                )
                            })
                            this.$Modal.remove()                      
                        }
                           
                    })
                }else{
                   this.$Notice.info({
                       title:`系统提示`,
                       desc:`请先选择您要删除的用户！`,
                   }) 
                }           
            },
            BatchDelete(){
                let len = this.selectionList.length
                // console.log(userIdList)
                if(len > 0){
                    let jobIdList = this.selectionList.map(item => {
                        return item.jobId
                    })
                    this.$Modal.confirm({
                        title:`批量删除`,
                        loading:true,
                        content:`您正在批量删除任务, 是否确认删除？`,
                        onOk:() => {
                            ajax.post('/sys/schedule/delete',jobIdList).then(({data}) =>{
                                if(data.code === 0){
                                    this.$Notice.success({
                                        title:'删除成功',
                                        desc:`批量删除任务成功！`
                                    })
                                    this.getBeanList()
                                }else(
                                    this.$Notice.error({
                                        title:'删除失败',
                                        desc:`批量删除任务失败！`
                                    })
                                )
                            })
                            this.$Modal.remove()                      
                        }
                           
                    })
                }else{
                   this.$Notice.info({
                       title:`系统提示`,
                       desc:`请先选择您要删除的任务！`,
                   }) 
                }
            },
            getBeanList(){
                this.tabLoading = true
                ajax.get('/sys/schedule/list',{
                 params:{
                     page:this.currPage,
                     limit:this.limit,
                     sidx:"jobId",
                     order:"desc",
                     beanName:this.search
                    }
                }).then(({data}) => {
                    const {code,msg,page} = data
                    // console.log(data)
                    if(code === 0){
                        const {list,pageSize,totalCount,totalPage,currPage} = page
                        this.data = list
                        this.limit = pageSize
                        this.totalCount = totalCount
                        this.totalPage = totalPage
                        this.currpage = currPage
                    }else if(code === 500){
                        this.$Notice.error({
                            title:'用户列表获取失败',
                            desc:msg
                        })
                    }
                    this.tabLoading = false
                })
            },
            async setSchedule(){
                // console.log(this.form)
                // this.modalLoading = true
                if(this.modalTitle == '新建任务'){
                    const result = await ajax.post('/sys/schedule/save',this.form)
                    const {code,msg} = result.data
                    if(code === 0){
                        this.getBeanList()
                        this.form={
                            jobId: 0,
                            beanName: "",
                            methodName: "",
                            params: "",
                            cronExpression: "",
                            status: 0,
                            remark: ""
                        }
                        this.$Notice.success({
                            title:'新建成功',
                            desc:'任务已新建成功！'
                        })
                    }else if(code === 500){
                        this.$Notice.error({
                            title:'新建失败',
                            desc:msg
                        })
                    }
                }else if(this.modalTitle == '修改任务'){
                    const result = await ajax.post('/sys/schedule/update',this.form)
                    const {code,msg} = result.data
                    if(code === 0){
                        this.getBeanList()
                        this.form={
                            jobId: 0,
                            beanName: "",
                            methodName: "",
                            params: "",
                            cronExpression: "",
                            status: 1,
                            remark: ""
                        }
                        this.$Notice.success({
                            title:'修改成功',
                            desc:'任务已成功修改！'
                        })
                    }else if(code === 500){
                        this.$Notice.error({
                            title:'修改失败',
                            desc:msg
                        })
                    }
                }
                
                // console.log(result);
            },
            getlogList(){
                this.logLoading = true
                ajax.get('/sys/scheduleLog/list',{
                 params:{
                     page:this.logCurrPage,
                     limit:this.limit,
                     sidx:"logId",
                     order:"desc",
                     beanName:this.logSearch
                    }
                }).then(({data}) => {
                    const {code,msg,page} = data
                    console.log(data)
                    if(code === 0){
                        console.log(list)
                        const {list,totalCount,currPage} = page
                        this.logData = list
                        this.logTotalCount = totalCount  
                        this.logCurrpage = currPage
                    }else if(code === 500){
                        this.$Notice.error({
                            title:'日志列表获取失败',
                            desc:msg
                        })
                    }
                    this.logLoading = false
                })
            },

        },
        watch: {
            search(val){
                this.getBeanList()
            },
            currPage(val){
                this.getBeanList()
            },
            logSearch(val){
                this.getlogList()
            },
            logCurrPage(val){
                this.getlogList()
            },

        },
    }
</script>

<style scoped>
    .home{
        width: auto;
        height: 800px;
        background: #f1f1f1;
        padding: 20px;
        position: flex;
        border:1px solid #dcdee2;
        min-width: 1100px;
    }
    .search{
        width:200px;
        margin: 15px;
    }
    .table{
        margin: 15px;
        min-width: 1000px;
    }
    .footer{
        display: flex;
        justify-content: space-between;
        margin: 15px;
    }

</style>