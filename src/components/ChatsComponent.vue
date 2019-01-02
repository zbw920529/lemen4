<template>
<div class="chats">
<Header
  title='对方正在输入'
  />
  <div class="contain">
    <div class="input">
      <input type="text" v-model='inputValue'>
      <button >发送</button>
    </div>
  </div>
</div>
</template>
<script>
import Header from './Header'
export default {
  name:'chatscomponent',
  components:{
    Header
  },
  created(){
    console.log(this.$route.params.mes)
    console.log(this.$route)
  },
  data(){
    return{
      inputValue:''
    }
  }
}
</script>
<style scoped>
  .contain{
    margin-top: 50px;
    width: 100%;
    height:617px;
    background: #ddd;
  }
  .input{
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 30px;
    padding: 10px 0;
    background: #fff;
  }
  .input input{
    width: 70%;
    margin-left: 10px;
    height: 25px;
    outline: none;
    border: 1px solid rgb(81,171,173);
  }
  .input button{
    margin-left: 10px;
    width: 15%;
    height: 25px;
    background: rgb(63,171,177);
    border: none;
    padding: 3px;
    color: #fff
  }
</style>
