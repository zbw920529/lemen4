<template lang="html">
  <div class="changepassword">
    <Home/>
    <div id="myChart1" :style="{width: '50%', height: '50%'}" class="myChart"></div>
    <div id="myChart2" :style="{width: '50%', height: '50%'}" class="myChart"></div>
    <div id="myChart3" :style="{width: '50%', height: '50%'}" class="myChart"></div>
    <div id="myChart4" :style="{width: '50%', height: '50%'}" class="myChart"></div>
  </div>
</template>

<script>
import Home from './Home'
export default {
  name:'changepassword',
  data(){
    return{
      mychart:{
        sales:[45, 36, 46, 32, 12, 23,58],
        title:'拉夏贝尔XX店销售统计',
        xAxis:["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子","上衣"]
      }
    }
  },
  components:{
    Home,
  },
  methods: {
      drawLine(){
        let myChart = this.$echarts.init(document.getElementById('myChart1'))
        let  option = {
                  backgroundColor: '#2c343c',
                  visualMap: {
                      show: false,
                      min: 80,
                      max: 600,
                      inRange: {
                          colorLightness: [0, 1]
                      }
                  },
                  series : [
                      {
                          name: '访问来源',
                          type: 'pie',
                          radius: '55%',
                          data:[
                              {value:235, name:'视频广告'},
                              {value:274, name:'联盟广告'},
                              {value:310, name:'邮件营销'},
                              {value:335, name:'直接访问'},
                              {value:400, name:'搜索引擎'}
                          ],
                          roseType: 'angle',
                          label: {
                              normal: {
                                  textStyle: {
                                      color: 'rgba(255, 255, 255, 0.3)'
                                  }
                              }
                          },
                          labelLine: {
                              normal: {
                                  lineStyle: {
                                      color: 'rgba(255, 255, 255, 0.3)'
                                  }
                              }
                          },
                          itemStyle: {
                              normal: {
                                  color: '#c23531',
                                  shadowBlur: 200,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
              };
            myChart.setOption(option);
            },
        aa(){
          var base = +new Date(2014, 9, 3);
            var oneDay = 24 * 3600 * 1000;
            var date = [];

            var data = [Math.random() * 150];
            var now = new Date(base);

            function addData(shift) {
                now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/');
                date.push(now);
                data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);

                if (shift) {
                    date.shift();
                    data.shift();
                }

                now = new Date(+new Date(now) + oneDay);
            }

            for (var i = 1; i < 100; i++) {
                addData();
            }

            let option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date
                },
                yAxis: {
                    boundaryGap: [0, '50%'],
                    type: 'value'
                },
                series: [
                    {
                        name:'成交',
                        type:'line',
                        smooth:true,
                        symbol: 'none',
                        stack: 'a',
                        areaStyle: {
                            normal: {}
                        },
                        data: data
                    }
                ]
            };
            setInterval(function () {
                addData(true);
                myChart.setOption({
                    xAxis: {
                        data: date
                    },
                    series: [{
                        name:'成交',
                        data: data
                    }]
                });
            }, 500);
            let myChart = this.$echarts.init(document.getElementById('myChart2'))
            myChart.setOption(option);
          },
          bb(){

            var data1 = [];
            var data2 = [];
            var data3 = [];

            var random = function (max) {
                return (Math.random() * max).toFixed(3);
            };

            for (var i = 0; i < 500; i++) {
                data1.push([random(15), random(10), random(1)]);
                data2.push([random(10), random(10), random(1)]);
                data3.push([random(15), random(10), random(1)]);
            }

          let option = {
                animation: false,
                legend: {
                    data: ['scatter', 'scatter2', 'scatter3']
                },
                tooltip: {
                },
                xAxis: {
                    type: 'value',
                    min: 'dataMin',
                    max: 'dataMax',
                    splitLine: {
                        show: true
                    }
                },
                yAxis: {
                    type: 'value',
                    min: 'dataMin',
                    max: 'dataMax',
                    splitLine: {
                        show: true
                    }
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        start: 1,
                        end: 35
                    },
                    {
                        type: 'slider',
                        show: true,
                        yAxisIndex: [0],
                        left: '93%',
                        start: 29,
                        end: 36
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                        start: 1,
                        end: 35
                    },
                    {
                        type: 'inside',
                        yAxisIndex: [0],
                        start: 29,
                        end: 36
                    }
                ],
                series: [
                    {
                        name: 'scatter',
                        type: 'scatter',
                        itemStyle: {
                            normal: {
                                opacity: 0.8
                            }
                        },
                        symbolSize: function (val) {
                            return val[2] * 40;
                        },
                        data: data1
                    },
                    {
                        name: 'scatter2',
                        type: 'scatter',
                        itemStyle: {
                            normal: {
                                opacity: 0.8
                            }
                        },
                        symbolSize: function (val) {
                            return val[2] * 40;
                        },
                        data: data2
                    },
                    {
                        name: 'scatter3',
                        type: 'scatter',
                        itemStyle: {
                            normal: {
                                opacity: 0.8,
                            }
                        },
                        symbolSize: function (val) {
                            return val[2] * 40;
                        },
                        data: data3
                    }
                ]
            }
            let myChart = this.$echarts.init(document.getElementById('myChart3'))
            myChart.setOption(option);
          },
          myChart.showLoading();
          $.get('data/asset/data/les-miserables.gexf', function (xml) {
              myChart.hideLoading();

              var graph = echarts.dataTool.gexf.parse(xml);
              var categories = [];
              for (var i = 0; i < 9; i++) {
                  categories[i] = {
                      name: '类目' + i
                  };
              }
              graph.nodes.forEach(function (node) {
                  node.itemStyle = null;
                  node.value = node.symbolSize;
                  node.symbolSize /= 1.5;
                  node.label = {
                      normal: {
                          show: node.symbolSize > 10
                      }
                  };
                  node.category = node.attributes.modularity_class;
              });
              option = {
                  title: {
                      text: 'Les Miserables',
                      subtext: 'Circular layout',
                      top: 'bottom',
                      left: 'right'
                  },
                  tooltip: {},
                  legend: [{
                      // selectedMode: 'single',
                      data: categories.map(function (a) {
                          return a.name;
                      })
                  }],
                  animationDurationUpdate: 1500,
                  animationEasingUpdate: 'quinticInOut',
                  series : [
                      {
                          name: 'Les Miserables',
                          type: 'graph',
                          layout: 'circular',
                          circular: {
                              rotateLabel: true
                          },
                          data: graph.nodes,
                          links: graph.links,
                          categories: categories,
                          roam: true,
                          label: {
                              normal: {
                                  position: 'right',
                                  formatter: '{b}'
                              }
                          },
                          lineStyle: {
                              normal: {
                                  color: 'source',
                                  curveness: 0.3
                              }
                          }
                      }
                  ]
              };

              myChart.setOption(option);
          }, 'xml');
          },
mounted(){
    this.drawLine();
    this.aa();
    this.bb()
    this.cc()
        },
    }
</script>

<style scoped>
.changepassword{
  width: 100%;
}
.myChart{
  float: left;
}
</style>
