<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import Instrument from './2018_12_26/Instrument'
import Index from './2018_12_26/Index'

export default {
  name: 'App',
  data(){
    return{
      routers:60
    }
  },
  components: {
    Instrument,
    Index
  }
}
</script>
<style media="screen">
body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0
}
#app{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
