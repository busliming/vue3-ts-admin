import * as echarts from 'echarts'
export default function useEcharts(ele: HTMLElement) {
  // 创建echarts实例
  const echartsInstance = echarts.init(ele);
  // 设置options
  const setOptions = (options: any) => {
    echartsInstance.setOption(options)
  }
  const resize = () => {
    echartsInstance.resize()
  }
  return {
    setOptions,
    resize
  }
}