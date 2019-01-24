<template>
    <Layout class="user">
        <Content class="userList">
            <Input placeholder="请输入用户名" v-model="search" search class="search"/> 
            <Button type="success" @click="showModal = true,modalTitle='新增用户'">新增</Button>
            <Table class="table" :columns="columns" :data="data" 
            :loading="tabLoading" @on-selection-change="(items) => selectionList = items"></Table>
            <div class="footer">
                <Button type="error" @click="BatchDelete">批量删除</Button>
                <Page :total="totalCount" :page-size="this.limit" :current.sync="currPage"></Page>
            </div>
        </Content>
        <Modal v-model="showModal" :title="modalTitle" 
        @on-ok="setUser" :loading="modalLoading" >
            <Form :model="form" :rules="formRules" class="userForm">
                <FormItem prop="username">
                    <Input placeholder="请输入用户名" v-model="form.username" clearable/>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" placeholder="请输入密码" v-model="form.password" clearable/>
                </FormItem>
                <FormItem prop="email">
                    <Input placeholder="请输入邮箱" v-model="form.email" clearable/>
                </FormItem>
                <FormItem prop="mobile">
                    <Input placeholder="请输入手机" v-model="form.mobile" clearable/>
                </FormItem>
                <FormItem label="状态" prop="status">
                    <iSwitch v-model="form.status" :true-value="1" :false-value="0"/>
                </FormItem>
            </Form>
        </Modal>
    </Layout>
</template>

<script>
    import ajax from '@/utils/myAxios'
    export default {
        created() {
             this.getUserList()
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
                        key: 'userId'
                    },
                    {
                        title: '用户名',
                        sortable:true,
                        align:'center',
                        key: 'username'
                    },
                    {
                        title: '邮箱',
                        align:'center',
                        key: 'email'
                    },
                    {
                        title: '手机',
                        align:'center',
                        key: 'mebile'
                    },
                    {
                        title: '状态',
                        align:'center',
                        key: 'status',
                        render:(h,params) => {
                            return h('iSwitch',{
                                props:{
                                    value:params.row.status,
                                    size:'large',
                                    trueValue:1,
                                    falseValue:0
                                },
                                on:{
                                    'on-change':(val) => {
                                        this.modalTitle = '修改用户'
                                        const {userId,username,email} = params.row
                                        this.form = {
                                            userId,
                                            username,
                                            email,
                                            status:val
                                        }
                                        this.setUser()
                                    }
                                }
                            },[
                                h('span',{
                                    slot:'open'
                                },'启用'),
                                h('span',{
                                    slot:'close'
                                },'禁用'),
                            ])
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
                        align:'center',
                         render:(h,params) => {
                            return h('div',[
                                h('Button',{
                                    props:{
                                        size:'small',
                                        type:'primary'
                                    },
                                    style:{
                                        marginRight:'10px'
                                    },
                                    on:{
                                        click:() => {
                                            // console.log(params)
                                            this.showModal = true
                                            this.modalTitle = '修改用户'
                                            const {userId,username,email,mobile,status,roleIdList} = params.row
                                            this.form = {
                                                userId,
                                                username,
                                                password:'',
                                                email,
                                                mobile,
                                                status
                                            }
                                        }
                                    }
                                },'修改'),
                                h('Button',{
                                    props:{
                                        size:'small',
                                        type:'error'
                                    },
                                    on:{
                                        click:() => {
                                            this.$Modal.confirm({
                                                title:`删除用户`,
                                                loading:true,
                                                content:`您正在删除用户 <b>${params.row.username}</b>, 是否确认删除？`,
                                                onOk:() => {
                                                    ajax.post('/sys/user/delete',[params.row.userId]).then(({data}) =>{
                                                        if(data.code === 0){
                                                            this.$Notice.success({
                                                                title:'删除成功',
                                                                desc:`用户 <b>${params.row.username}</b> 已成功删除！`
                                                            })
                                                            this.getUserList()
                                                        }else(
                                                            this.$Notice.error({
                                                                title:'删除失败',
                                                                desc:`用户 <b>${params.row.username}</b> 删除失败！`
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
                form:{
                   username:'',
                   password:'',
                   email:'',
                   mobile:'',
                   status:1,
                   roleIdList:[
                       0
                   ]
                },
                formRules:{
                    username:[
                        {required:true,message:'用户名必须',trigger:'blur'},
                        {max:12,min:5,message:'长度必须是5-12位',trigger:'blur'}
                    ],
                    password:[
                        {required:true,message:'密码必须',trigger:'blur'},
                        {max:18,min:5,message:'长度必须是5-18位',trigger:'blur'}
                    ],
                    email:[
                        {required:true,message:'邮箱必须',trigger:'blur'},
                    ]
                }
            }
        },
        methods:{
            BatchDelete(){
                let len = this.selectionList.length
                // console.log(userIdList)
                if(len > 0){
                    let userIdList = this.selectionList.map(item => {
                        return item.userId
                    })
                    this.$Modal.confirm({
                        title:`批量删除`,
                        loading:true,
                        content:`您正在批量删除用户, 是否确认删除？`,
                        onOk:() => {
                            ajax.post('/sys/user/delete',userIdList).then(({data}) =>{
                                if(data.code === 0){
                                    this.$Notice.success({
                                        title:'删除成功',
                                        desc:`批量删除用户成功！`
                                    })
                                    this.getUserList()
                                }else(
                                    this.$Notice.error({
                                        title:'删除失败',
                                        desc:`批量删除用户失败！`
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
            getUserList(){
                this.tabLoading = true
                ajax.get('/sys/user/list',{
                 params:{
                     page:this.currPage,
                     limit:this.limit,
                     sidx:"userId",
                     order:"desc",
                     username:this.search
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
            async setUser(){
                // console.log(this.form)
                // this.modalLoading = true
                if(this.modalTitle == '新增用户'){
                    const result = await ajax.post('/sys/user/save',this.form)
                    const {code,msg} = result.data
                    if(code === 0){
                        this.getUserList()
                        this.form={
                            username:'',
                            password:'',
                            email:'',
                            mobile:'',
                            status:1,
                            roleIdList:[]
                        }
                        this.$Notice.success({
                            title:'添加成功',
                            desc:'用户已成功添加！'
                        })
                    }else if(code === 500){
                        this.$Notice.error({
                            title:'添加失败',
                            desc:msg
                        })
                    }
                }else if(this.modalTitle == '修改用户'){
                    const result = await ajax.post('/sys/user/update',this.form)
                    const {code,msg} = result.data
                    if(code === 0){
                        this.getUserList()
                        this.form={
                            username:'',
                            password:'',
                            email:'',
                            mobile:'',
                            status:1,
                            roleIdList:[]
                        }
                        this.$Notice.success({
                            title:'修改成功',
                            desc:'用户已成功修改！'
                        })
                    }else if(code === 500){
                        this.$Notice.error({
                            title:'修改失败',
                            desc:msg
                        })
                    }
                }
                
                // console.log(result);
            }
        },
        watch: {
            search(val){
                this.getUserList()
            },
            currPage(val){
                this.getUserList()
            }
        },
    }
</script>

<style scoped>
    .user{
        width: auto;
        height: 800px;
        background: #f1f1f1;
        padding: 20px;
        position: flex;
        border:1px solid #dcdee2;
        min-width: 1100px;
        /* overflow: hidden; */
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