<template>
<div class="">
  <Header
    title='详细资料'
    :is-left='true'
    btn_icon='ellipsis-h'
    />
    <div class="contain">
      <InfoCell :show='userInfo'/>
    </div>
    <div class="InfoCell">
      <div class="left-img">
        <img :src="infotion.imgUrl" alt="">
      </div>
      <div class="right-commet">
        <div class="right-commet-top">
          {{infotion.name}}
        </div>
        <div class="right-commet-bottom">
          <span>地区：{{infotion.coutry}}</span><span>电话：{{infotion.phone}}</span>
        </div>
      </div>
    </div>
    <YButton @click='goChats(infotion)'>发消息</YButton>
</div>
</template>

<script>
import YButton from './YButton'
import Header from './Header'
import InfoCell from './InfoCell'
export default {
  name:'infomation',
  components:{
    YButton,
    Header,
    InfoCell
  },
  props:{
    users:this,
  },
  data(){
    return{
      item:this,
      infotion:this.$route.params.mes
    }
  },
  methods:{
    goChats(infotion){
      this.$router.push({name:'dialog',params:{mes:infotion}})
    }
  }
}
</script>

<style scoped>
.contain{
  width: 100%;
  height: 80px;
  margin-top:-30px;
}
.InfoCell{
  width:100%;
  margin: 0;
  height: 6rem;
  background: #ddd;
  display: flex;
  align-items:center;
}
.InfoCell .left-img{
  height: 4rem;
  padding: 1rem;
  width: 20%;
}
.InfoCell .left-img img{
  width:4rem;
  height: 4rem;
}
.InfoCell .right-commet{
  width: 40%;
  height: 4rem;
}
.InfoCell .right-commet{
  width: 80%;
  height: 4rem;
}
.InfoCell .right-commet .right-commet-top{
  width: 100%;
  height: 3rem;
}
.InfoCell .right-commet .right-commet-bottom{
  width: 100%;
  height: 1rem;
  color: rgb(40,44,52);
  font-size: 12px;
  display: flex;
  box-sizing: border-box;
  padding: 0 20px 0 3px;
  justify-content:space-between;
}
</style>
