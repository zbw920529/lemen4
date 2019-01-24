<template>   
    <Layout>
        <Sider v-model="sider" collapsible class="sider">
            <h1 class="logo"><Icon type="logo-octocat"/>&nbsp;<span v-if="!sider">MS后台管理系统</span></h1>
             <Menu width="auto" theme="dark" class="menu"
              @on-select="selectMenu" active-name="首页">
                <MenuItem to="/admin/home" name="首页"><Icon type="md-home"/>
                    <span v-if="!sider">首页</span>
                </MenuItem>
                <Submenu v-for="item in menu" :key="item.menuId" :name="item.name">
                    <template slot="title">
                        <Icon type="md-menu" />
                        <span v-if="!sider">{{item.name}}</span>
                    </template>
                    <MenuItem v-for="children in item.children" :to="'/admin/'+children.url"
                    :key="children.menuId" :name="children.name" :class="sider?'MenuItem':''">
                        <Icon type="md-document" />
                        <span v-if="!sider">{{children.name}}</span>
                    </MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout class="leftDiv">
            <Header class="header">
                <div>
                    <Button @click="sider = !sider">
                        <Icon type="md-menu"></Icon>
                    </Button>
                </div>
                <Dropdown class="Dropdown">       
                    <Avatar icon="md-person" size="small"/>
                    {{getUser.username}}
                    <Icon type="ios-arrow-down"></Icon>
                    <DropdownMenu slot="list">
                        <DropdownItem><Icon type="md-key" size="18" style="margin-right:5px"/>修改密码</DropdownItem>
                        <DropdownItem><Icon type="ios-exit" size="18" style="margin-right:5px"/>安全退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown> 
            </Header>
            <Content>
                <Tabs type="card" closable @on-tab-remove="handleTabRemove"
                    v-if="cardOnOFF" class="tab" :value="tabValue" @on-click="handleTabSel">
                        <TabPane :label="item" :name="index+''" v-for="(item,index) in tabList" :key="item"></TabPane>
                </Tabs>               
                <router-view class="routerView"></router-view>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
    import ajax from '@/utils/myAxios'
    import {mapActions,mapGetters} from 'vuex'
    export default {
        data() {
            return {
                sider:false,
                cardOnOFF:false,
                tabList:[],
                tabValue:'0',
            }
        }, 
        created() {
            this.SET_USER_INFO()
            this.GET_MENU_LIST()
        },
        computed: {
            ...mapGetters([
                'getUser',
                'menuList'
            ]),
            menu(){
                function deep(arr,parentId){
                    if(!Array.isArray(arr)) return;
                    return arr.filter((k) => {
                        if(k.parentId === parentId){
                            k.children = deep(arr,k.menuId)
                            return true
                        }
                    });
                }
                return deep(this.menuList,0)
            },
        },
        methods: {
            ...mapActions([
                'SET_USER_INFO',
                'GET_MENU_LIST'
            ]),
            handleTabRemove (name) {
                // console.log(this.tabList)
                this.tabList.splice(name,1)
                if(this.tabList.length === 0){
                    return
                }else{
                    let index = this.tabList.length-1
                    let tabName = this.tabList[index]
                    const {children} = this.menu[0]
                    let arr = children.filter(item => {
                        return item.name == tabName
                    })
                    this.$router.push({path:'/admin/'+arr[0].url})
                }
                                  
            },
            selectMenu(name){
                if(name == '首页'){
                    this.cardOnOFF = false
                    return
                }else{
                    this.cardOnOFF = true
                }
                if(this.tabList.indexOf(name) < 0){
                    this.tabList.push(name)
                }else{
                    this.tabValue = this.tabList.indexOf(name)+''
                }
                // console.log(this.menu)
            },
            handleTabSel(name){
                let tabName = this.tabList[name]
                const {children} = this.menu[0]
                let arr = children.filter(item => {
                    return item.name == tabName
                })
                this.$router.push({path:'/admin/'+arr[0].url})
            }
        },
        watch: {
            tabList(val){
                if(this.tabList.length === 0){
                    this.cardOnOFF = false;
                    this.$router.push({path:'/admin/home'})
                }
                this.tabValue = this.tabList.length-1+""
            }
        },
    }
</script>

<style scope>
     .header{
         background: rgb(97,155,197);
         display: flex;
         justify-content: space-between;
         border-bottom: 1px solid #ddd;
         min-width: 1100px;
     }
     .logo{
         color: white;
         height: 64px;
         line-height: 64px;
         text-indent: 10px;
         overflow: hidden;
         background: rgb(97,155,197);
         border-bottom: 1px solid #ddd;
     }
     .menu{
        min-width: 200px;
        overflow: hidden; 
     }
     .sider{
         overflow: hidden;   
     }
     .routerView{   
         margin: 15px;     
         border-radius: 8px;
     }
     .Dropdown{
         min-width: 100px;
         margin-left: 20px;
     }
     .MenuItem{
         margin-left:-18px; 
     }
     .tab{
         background: #363E4F;
         padding-top: 10px;
         padding-left: 5px;
         height: 42px;
     }
     .leftDiv{
         overflow: hidden;
     }
</style>
