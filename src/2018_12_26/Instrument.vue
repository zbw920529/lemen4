<template >
  <div class="outer" :style="{background:background}">
    <div class="wrap">
          {{router}} %
      <div class="left" :style="{background:containBg}">
        <div class="leftcontain" :style="{transform:transform}">

        </div>
      </div>
      <div class="right" >
        <div class="rightcontain" :style="{background:containBg}">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Instrument',
  data(){
    return{
      router:20,
      wrapBackground:'#ddd',
      containBackground:'green'
    }
  },
  computed:{
    transform(){
      if(this.router<50){
        var transforms="rotate(" + this.router*3.5 + "deg)"
        return transforms
      }else{
        var transforms="rotate(" + this.router*3.5 + "deg)"
        return transforms
      }
    },
    background(){
      if(this.router<50){
        const bgColor=this.wrapBackground='#ddd'
        return bgColor
      }else{
        const bgColor=this.wrapBackground='green'
        return bgColor
      }
    },
    containBg(){
      if(this.router<50){
        const bgColor=this.wrapBackground='green'
        return bgColor
      }else{
        const bgColor=this.wrapBackground='#ddd'
        return bgColor
      }
    }
  }
}
</script>

<style scoped>
.outer{
  margin:50px auto;
  width: 300px;
  height: 300px;
  padding: 30px;
  position: relative;
  border-radius: 50%;
  z-index:1;
}
.wrap{
  width: 100%;
  height: 100%;
  background: blue;
  border-radius: 50%;
  text-align: center;
  line-height: 300px;
  font-size: 20px;
  color: #ccc;
  font-weight: blod
}

.leftcontain{
  width: 360px;
  height: 360px;
  background: green;
  top:0px;
  left: 0px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0,180px,360px,0);
  z-index:-1;
}

.rightcontain{
  width: 360px;
  height: 360px;
  background: green;
  top:0px;
  left: 0px;
  position: absolute;
  border-radius: 50%;
  clip: rect(0,360px,360px,180px);
  z-index:-1
}

</style>
