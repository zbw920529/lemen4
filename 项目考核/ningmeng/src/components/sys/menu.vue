<template>
    <Layout class="home">
        <Tree :data="TreeList" :render="renderContent"></Tree> 
        <Modal v-model="showModal" :title="modalTitle" 
        @on-ok="setMenu" :loading="modalLoading" >
            <Form :model="form" :rules="formRules" class="userForm" label-position="right" :label-width="100">
                <FormItem prop="name" label="菜单名称">
                    <Input placeholder="请输入名称" v-model="form.name" clearable style="width: 300px"/>
                </FormItem>
                <FormItem prop="icon" label="菜单图标">
                    <Input placeholder="请输入图标" v-model="form.icon" clearable style="width: 300px"/>
                </FormItem>
                <FormItem prop="url" label="菜单地址">
                    <Input placeholder="请输入地址" v-model="form.url" clearable style="width: 300px"/>
                </FormItem>
                <FormItem prop="parentId" label="上级菜单">
                    <Select v-model="form.parentId" style="width:300px">
                        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="菜单类型">
                    <RadioGroup v-model="form.type">
                        <Radio :label="1">菜单</Radio>
                        <Radio :label="2">权限</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="菜单排序">
                    <InputNumber :max="999" :min="0" v-model="form.orderNum"></InputNumber>
                </FormItem>
            </Form>
        </Modal>     
    </Layout>
</template>

<script>
    import ajax from '@/utils/myAxios'
    import { mapGetters,mapActions } from 'vuex'
    export default {
        data() {
            return {
                TreeList:[],
                // TreeSel:false,
                buttonProps: {
                    type:'error',
                    size: 'small',
                },
                form:{
                    menuId: 0,
                    name: "",
                    parentId: 0,
                    url: "",
                    perms: "",
                    type: 1,
                    icon: "",
                    orderNum: 0
                },
                formRules:{
                    name:[
                        {required:true,message:'菜单名必须',trigger:'blur'},
                    ]
                },
                showModal:false,
                modalTitle:'',
                modalLoading:false,
                selectList: [],
   
            }
        },
        mounted() {
            this.getList()
        },
        computed: {
            ...mapGetters([
                // 'getUser',
                'menuList'
            ])
        },
        methods: {
            ...mapActions([
                'GET_MENU_LIST'
            ]),
            setMenu(){
                this.showModal = false
            },
            getList(){
                this.TreeList.splice(0,1)
                function deepTree(arr){
                  return  arr.map(item =>{                   
                       return {
                            item,
                            title:item.name,
                            expand:false,
                            children:deepTree(item.children)
                        }
                    })
                }
                function SelectOption(arr){
                    return arr.map(item => {
                        return{
                            value:item.menuId,
                            label:item.name,
                        }
                    })
                }
                if(this.menuList[0]){
                    this.selectList = SelectOption(this.menuList[0].children)
                    this.selectList.unshift({value:this.menuList[0].menuId,label:this.menuList[0].name})
                    // console.log(this.menuList[0])
                    this.TreeList.push({title:this.menuList[0].name,expand:false,
                    children:deepTree(this.menuList[0].children),item:this.menuList[0],                       
                        render:(h, { root, node, data }) => {
                            return h('div', {
                                class:'selTreeList',
                                style: {
                                    display: 'inline-block',
                                    fontSize:'16px',
                                    width: '99%'
                                },
                                on:{
                                click:(e) => {
                                    data.expand = !data.expand
                                }
                            }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'md-home'                                           
                                        },
                                        style: {                                          
                                            marginRight: '8px',
                                            fontSize:'18px'
                                        }
                                    }),
                                    h('span', data.title)
                                ]),
                                h('Button',{
                                    props:{
                                        type:'error',
                                    },
                                    style:{
                                        fontSize:'12px',
                                        marginLeft: '15px',
                                        width:'34px',
                                        height:'18px',
                                        textIndent:'-2px',
                                        padding:'0 2px',
                                        display:'inline-block',
                                    }
                                },'目录'),
                                h('span', {
                                    style: {
                                        display: 'inline-block',
                                        float: 'right',
                                        marginRight: '32px'
                                    }
                                }, [
                                    h('Button', {
                                        props: Object.assign({}, this.buttonProps, {
                                            icon: 'ios-add',
                                            type:'success', 
                                        }),
                                        on: {
                                            click: (e) => { 
                                                e.stopPropagation();
                                                this.modalTitle = '添加菜单'
                                                this.showModal = true
                                                this.form = {
                                                    menuId: 0,
                                                    name: "",
                                                    parentId: data.item.menuId,
                                                    url: "",
                                                    perms: "",
                                                    type: 1,
                                                    icon: "",
                                                    orderNum: 0
                                                }
                                            }
                                        }
                                    },'添加顶级菜单')
                                ])
                            ]);
                        }                      
                    })
                } 
            },
            renderContent (h, { root, node, data }) {
                if(node.parent != 0){
                    return h('div', {
                        class:'selTreeList',
                        style: {
                            display: 'inline-block',
                            fontSize:'14px',
                            width: '99%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'md-return-right'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.title)
                        ]),
                        h('Button',{
                            props:{
                                type:'warning',
                            },
                            style:{
                                fontSize:'12px',
                                marginLeft: '15px',
                                width:'30px',
                                height:'18px',
                                padding:0,
                                display:'inline-block',
                            }
                        },'权限'),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px'
                            }
                        }, [ h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'md-build',
                                    type:'primary',
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: (e) => { 
                                        e.stopPropagation();
                                        this.modalTitle = '修改菜单'
                                        this.showModal = true
                                        this.form = {
                                            menuId: data.item.menuId,
                                            name: data.item.name,
                                            parentId: data.item.parentId,
                                            url: data.item.url,
                                            perms: data.item.perms,
                                            type: data.item.type,
                                            icon: data.item.icon,
                                            orderNum: data.item.orderNum
                                        }
                                    }
                                }
                            },'修改'),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-remove',
                                }),
                                on: {
                                    click: () => { 
                                        this.$Modal.warning({
                                            title:`删除菜单`,
                                            loading:true,
                                            content:`您正在删除菜单<b>${data.item.name}</b>, 是否确认删除？`,
                                            onOk:() => { 
                                                // console.log(data.item.menuId) 
                                                // Object.assign({},)                          
                                                ajax.post('/sys/menu/delete',data.item.menuId).then(({data}) =>{
                                                    if(data.code === 0){
                                                        this.$Notice.success({
                                                            title:'删除成功',
                                                            desc:`菜单删除成功！`
                                                        })
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
                    ]);
                }else{
                    return h('div', {
                        class:'selTreeList',
                        style: {
                            display: 'inline-block',
                            width: '99%',
                            fontSize:'16px'                           
                        },
                        on:{
                            click:() => {
                                data.expand = !data.expand
                            }
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'md-list-box'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.title)
                        ]),
                        h('Button',{
                            props:{
                                type:'info',
                            },
                            style:{
                                fontSize:'12px',
                                marginLeft: '15px',
                                width:'30px',
                                height:'18px',
                                padding:0,
                                display:'inline-block',
                            }
                        },'菜单'),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px'
                            }
                        }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-add',
                                    type:'success',
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: (e) => { 
                                        e.stopPropagation();
                                        this.modalTitle = '添加菜单'
                                        this.showModal = true
                                        this.form = {
                                            menuId: 0,
                                            name: "",
                                            parentId: data.item.menuId,
                                            url: "",
                                            perms: "",
                                            type: 2,
                                            icon: "",
                                            orderNum: 0
                                        }
                                    }
                                }
                            },'添加'),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'md-build',
                                    type:'primary',
                                }),
                                style: {
                                    marginRight: '8px'
                                },
                                on: {
                                    click: (e) => { 
                                        e.stopPropagation();
                                        this.modalTitle = '修改菜单'
                                        this.showModal = true
                                        this.form = {
                                            menuId: data.item.menuId,
                                            name: data.item.name,
                                            parentId: data.item.parentId,
                                            url: data.item.url,
                                            perms: data.item.perms,
                                            type: data.item.type,
                                            icon: data.item.icon,
                                            orderNum: data.item.orderNum
                                        }
                                    }
                                }
                            },'修改'),
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-remove'
                                }),
                                on: {
                                    click: (e) => { 
                                        e.stopPropagation(); 
                                        this.$Modal.warning({
                                            title:`删除菜单`,
                                            loading:true,
                                            content:`您正在删除菜单<b>${data.item.name}</b>, 是否确认删除？`,
                                            onOk:() => { 
                                                // console.log(data.item.menuId) 
                                                // Object.assign({},)                          
                                                ajax.post('/sys/menu/delete',data.item.menuId).then(({data}) =>{
                                                    if(data.code === 0){
                                                        this.$Notice.success({
                                                            title:'删除成功',
                                                            desc:`菜单删除成功！`
                                                        })
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
                    ]);
                }
                
            },
            async setMenu(){
                this.modalLoading = true;
                if(this.modalTitle === "添加菜单"){
                    const {data} = await ajax.post('sys/menu/save',this.form)
                    // console.log(data)
                    if(data.code === 0){
                        this.form = {
                            menuId: 0,
                            name: "",
                            parentId: 0,
                            url: "",
                            perms: "",
                            type: 1,
                            icon: "",
                            orderNum: 0
                        }
                        this.$Notice.success({
                            title:'添加成功',
                            desc:`已成功添加菜单！`
                        })
                        this.GET_MENU_LIST()
                        // this.getList();
                    }else{
                        this.$Notice.error({
                            title:'添加失败',
                            desc:data.msg
                        })
                    }   
                }else if(this.modalTitle === "修改菜单"){
                    const {data} = await ajax.post('sys/menu/update',this.form)
                    if(data.code === 0){
                        this.$Notice.success({
                            title:'修改成功',
                            desc:`已成功修改菜单！`
                        })
                        // this.GET_MENU_LIST()
                        // this.getList();
                    }else{
                        this.$Notice.error({
                            title:'修改失败',
                            desc:data.msg
                        })
                    } 
                }
                
                this.modalLoading = false;
            },
            // append ({data}) {
            //     this.showModal = true               
            // },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            },
        },
    }
</script>

<style>
    .home{
        width: auto;
        height: 800px;
        background: #f1f1f1;
        padding: 20px;
        position: flex;
        border:1px solid #dcdee2;
        min-width: 1100px;
        user-select: none;
        overflow:auto;
        
    }
    .selTreeList:hover{
        cursor: pointer;
        transition: 1s;
        background: #ddd;
        color:#545c64;
    }
</style>