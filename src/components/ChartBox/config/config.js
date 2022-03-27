import { tooltipFormatter, axisLabelFormatter } from './formatter';
import { barColor, lineColor } from './color';
export default function creatOption(
  data = {},
  options = {
    xAxis: [{}],
    yAxis: [{}],
    series: [],
  },
  getOptions,
) {
  if (options) {
    if (!options.xAxis || !Array.isArray(options.xAxis)) options.xAxis = [{}];
    if (!options.yAxis || !Array.isArray(options.xAxis)) options.yAxis = [{}];
    if (!options.series || !Array.isArray(options.series)) options.series = [];
  }
  let xAxisData = data.xAxis ? { data: data.xAxis } : {};
  return {
    title: {
      text: data.name,
      textStyle: {
        fontSize: 14,
      },
    },
    color: data.type === 'line' ? lineColor : barColor,
    legend: {
      type: 'plain',
      // left: data.left || '5%',
      left: 'auto',
      top: '5%',
      right: '5%',
      bottom: 'auto',
      orient: 'horizontal',
      itemWidth: 14,
      itemHeight: 14,
      icon: 'circle',
      data: options.series.map((key) => key.name),
    },
    tooltip: {
      show: true,
      showContent: true, // 显示提示框
      alwaysShowContent: false, // 永久显示提示框
      trigger: data.type === 'pie' ? 'item' : 'axis',
      axisPointer: {
        // 鼠标hover 效果
        show: true,
        type: 'shadow', // 'shadow'
        lineStyle: {
          color: '#ccc',
        },
        shadowStyle: {
          color: 'rgba(24, 144, 255, .1)',
        },
        z: 0,
      },
      triggerOn: 'mousemove|click',
      showDelay: 0,
      hideDelay: 100,
      enterable: false,
      renderMode: 'html',
      confine: false, // 提示框 只在图表内显示，默认为false
      transitionDuration: 0.4,
      formatter: tooltipFormatter(getOptions),
      backgroundColor: '#fff',
      borderColor: '#333',
      borderWidth: 0,
      padding: [0, 0, 6, 0],
      textStyle: {
        color: '#333',
      },
      extraCssText: 'box-shadow: 0 2px 6px 0 rgba(0,0,0,0.14);border-radius: 2px;',
    },
    grid: {
      left: data.left || '5%',
      right: data.right || '5%',
      bottom: data.bottom || '5%',
      top: data.top || '10%',
      containLabel: true,
    },
    // animation: true,
    xAxis: options.xAxis.map(() =>
      Object.assign(
        {
          type: 'category',
          name: '',
          // nameTextStyle: {},
          nameGap: 15,
          nameRotate: null,
          boundaryGap: true,
          // splitNumber: 5,
          // minInterval: 0,
          // maxInterval: 1000,
          // interval: 1,
          axisLine: {
            // 轴线
            show: true,
            lineStyle: {
              color: '#E8E6EF',
            },
          },
          axisTick: {
            // 刻度
            show: false,
            // lineStyle: {}
          },
          axisLabel: {
            // 刻度标签
            show: true,
            interval: 'auto',
            inside: false,
            rotate: 0,
            margin: 20,
            formatter: axisLabelFormatter(getOptions),
            color: '#6D737A',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontFamily: 'sans-serif',
            fontSize: 12,
            align: 'center',
            verticalAlign: 'middle',
            // lineHeight: 40,
          },
          splitArea: {
            // 分割区域
            interval: 'auto',
            show: false,
            // areaStyle: {},
          },
          splitLine: {
            // 分割线
            show: false,
            lineStyle: {
              color: '#E8E6EF',
              type: 'dashed',
            },
          },
        },
        xAxisData,
      ),
    ),
    yAxis: options.yAxis.map(() => ({
      type: 'value',
      name: data.unitStr,
      minInterval: 1,
      nameGap: data.nameGap || 20,
      nameLocation: 'end',
      splitLine: {
        lineStyle: {
          color: '#E8E6EF',
          type: 'solid',
        },
      },
      nameTextStyle: {
        align: 'center', // left
        fontFamily: 'Microsoft YaHei',
        lineHeight: 14,
        fontSize: 12,
        color: '#666',
        padding: [0, 24, 0, 0],
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          color: '#666',
          fontSize: 12,
        },
      },
      // 设置轴线的属性
      axisLine: {
        lineStyle: {
          color: 'rgba(230,233,238,1)',
          // width: 0, // 这里是为了突出显示加上的
          // height: 0
        },
      },
    })),
    series: options.series.map(() => ({
      name: '',
      type: data.type,
      barWidth: 20,
      // radius: ['40%', '60%'],
      center: ['50%', '50%'],
      selectedMode: 'single',
      selectedOffset: 10,
      barGap: 0,
      cursor: 'pointer',
      label: {
        normal: {
          show: false,
          position: 'top',
          fontSize: 12,
          // formatter: seriesLabelFormatter(getOptions)
        },
      },
    })),
  };
}
