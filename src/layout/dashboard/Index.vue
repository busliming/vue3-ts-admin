<template>
  <el-main>
    <div style="display: flex;">
      <el-card shadow="always" style="flex: 1;" :body-style="{ padding: '20px' }">
        <div slot="header">
          <div class="card-header">
            <span>订单统计</span>
          </div>
        </div>
        <!-- card body -->
        <CommonEcharts :options="options1"></CommonEcharts>
      </el-card>
      <el-card shadow="always" style="margin-left: 20px;flex: 1;" :body-style="{ padding: '20px' }">
        <div slot="header">
          <div class="card-header">
            <span>财务统计</span>
          </div>
        </div>
        <!-- card body -->
        <CommonEcharts :options="options2"></CommonEcharts>
      </el-card>
      <el-card shadow="always" style="margin-left: 20px;flex: 1;" :body-style="{ padding: '20px' }">
        <div slot="header">
          <div class="card-header">
            <span>搜索统计</span>
          </div>
        </div>
        <!-- card body -->
        <CommonEcharts :options="options3"></CommonEcharts>
      </el-card>
    </div>
  </el-main>
</template>
<script setup lang='ts'>
import { reactive } from 'vue'
import CommonEcharts from '@/components/CommonEcharts.vue';
const options1 = reactive({
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'bar',
      smooth: true
    }
  ]
})
const options2 = reactive({
  title: {
    // subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    // orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      // name: 'Access From',
      type: 'pie',
      radius: '60%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' }, { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});
const options3 = reactive({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
});

</script>
<style scoped lang='scss'>
.home {
  padding: 10px 20px;
}
</style>