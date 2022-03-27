## 公用 echarts 组件

封装了 echarts 初始化组件，可快速用以图表开发。

### 使用说明

```js
import ChartBox from '@/components/ChartBox';
```

```jsx
<ChartBox options={options} />
```

### API

```
props 属性：

noData:
  类型： Boolean,  默认为 false

  使用说明 ： 初始化时是否显示 暂无数据 图标， true: 显示， false: 不显示

deep:
  类型： Boolean 、Array、String

  使用说明： 组件 有 默认 config 配置文件 ，默认 为 false

      deep : true   读取所有默认 config 配置，自己只需要添加 必要可变的 options 即可，其余全部使用默认config 配置
      deep: ['xAxis']  只读取 数据中选中的 config 默认配置，其余配置均要自己手动添加，或者使用 echart 自带默认配置
      deep: 'xAxis'   只读取 xAxis 的默认配置

defaultData：
  类型： Object

  使用说明：
    {
      name: 图表的名字，
      type: 图表的类型 line, pie， bar 等 ，
      left: 图表距离左边框的距离，
      right: 图表距离右边框的距离，
      bottom: 图表距离下边框 的距离 ，
      top: 图表距离 上边框的距离，
      xAxis: 数组，x 轴数据，
      series: 数组， 图表数据，配置同 echarts 配置

    }

options:
  类型： Object,

  使用说明：同echarts 配置，可参考官方 配置

type:
  类型： String

  使用说明： 图表类型， line, pie, bar, 等 ，默认为 bar

width:
  类型： String   默认为 “100%”

  使用说明： 图表的 宽， 必须自带 单位 ，如， “100px” , 如果 输入 “100” 则无效

height:
  类型： String   默认为 “100%”

  使用说明： 图表的 高， 必须自带 单位 ，如， “100px” , 如果 输入 “100” 则无效

needClear:
    类型： Boolean

    使用说明： 更新图表前，是否清除缓存， true: 清除， false: 不清除，
        当更新图表数据后，图表显示了 上一次数据 缓存时使用

log:
  类型： Boolean

  使用说明： console.log() 打印图表所有配置， 开发调试时可用，查询配置项是否有误

```
