<template lang="html">
  <div class="">
    <Header title='通讯录' btn_icon='user-plus' class="btn_icon"/>
    <div class="clear_flied">
      <div class="cell-wrapper"
        v-for='item of contactsList'
        @click="clickCell(item)">
        <div class="cell-title">
          <img :src="item.imgUrl" alt="">
          <span>{{item.name}}</span>
        </div>
      </div>
      <div class="number">
        <p>{{contactsList.length}}位联系人</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import Infomation from '../components/Infomation'
export default {
  name:'contacts',
  components:{
    Header,
    Infomation
  },
  data(){
    return{
      contactsList:[
        {name:'想做大牛的菜鸟(前端初级工程师)',imgUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2331954524,2332888605&fm=27&gp=0.jpg',id:1,coutry:'中国',phone:'133888888'},
        {name:'iwen(Java高级工程师)',imgUrl:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4294564887,1812467561&fm=27&gp=0.jpg',id:2,coutry:'埃塞俄比亚',phone:'1500087776'},
        {name:'Bob(Java初级工程师)',imgUrl:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3690070270,2979706391&fm=27&gp=0.jpg',id:3,coutry:'埃及',phone:'15000860876'},
        {name:'狗剩(产品经理)',imgUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=347837335,1617350328&fm=27&gp=0.jpg',id:4,coutry:'韩国',phone:'18000866776'},
        {name:'王铁蛋(架构师)',imgUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2331954524,2332888605&fm=27&gp=0.jpg',id:5,coutry:'巴基斯坦',phone:'13813888888'},
        {name:'王尼玛(前端中级工程师)',imgUrl:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=866161935,3028079562&fm=27&gp=0.jpg',id:6,coutry:'大不列颠',phone:'15000866776'},
      ]
    }
  },
  methods:{
    clickCell(item){
      console.log(item)
      this.$router.push({name:'infomation',params:{mes:item}})
    }
  }
}
</script>

<style scoped>
.clear_flied{
  position: absolute;
  margin-top: 3.3rem;
  width: 100%;
}
.cell-wrapper {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: 70px;
  display: flex;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  padding: 0 10px;
  width: 100%;
  line-height: 70px;
  border-bottom: 1px solid #ddd;
}
/* .cell-title {
  flex: 1;
} */
.cell-title img {
  width: 2.6rem;
  height:2.6rem;
  vertical-align: middle;
  margin-right: 0.6rem;
  margin-left: 1rem
}
.cell-title span {
  display: inline-block;
  vertical-align: middle;
}
.number{
  width: 100%;
}
.number p{
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color:rgb(255,140,240);
  font-weight: bold;
}
</style>
