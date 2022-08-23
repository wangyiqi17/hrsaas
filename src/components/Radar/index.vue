<template>
  <div class="radarCharts" ref="main">leida</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Radar',
  data() {
    return {}
  },

  created() {},

  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      var myChart = echarts.init(this.$refs.main)
      myChart.setOption({
        title: {
          text: '人员绩效表',
        },
        legend: {
          data: ['张三', '李四'],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '加班', max: 100 },
            { name: 'bug数量', max: 100 },
            { name: '迟到', max: 100 },
            { name: '早退', max: 100 },
            { name: '打游戏', max: 100 },
            { name: '摸鱼', max: 100 },
          ],
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [40, 80, 100, 100, 60, 50],
                name: '张三',
              },
              {
                value: [80, 50, 40, 60, 100, 100],
                name: '李四',
              },
            ],
          },
        ],
      })
    },
  },
}
</script>

<style scoped lang="scss">
.radarCharts {
  width: 500px;
  height: 500px;
}
</style>
