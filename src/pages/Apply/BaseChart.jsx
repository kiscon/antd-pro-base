import React, { useState, useEffect } from 'react';
import ChartBox from '@/components/ChartBox';
import SvgIcon from '@/components/SvgIcon';

/*eslint-disable*/
export default function Chart() {
  const [options, setOptions] = useState({});

  function getOptions(chart) {
    return {
      tooltip: {
        confine: true // 是否将 tooltip 框限制在图表的区域内
      },
      grid: {
        top: '15%',
        left: '6%'
      },
      xAxis: [
        {
          data: chart.xAxis
        }
      ],
      yAxis: [
        {
          name: '平均耗时'
        }
      ],
      series: chart.series.map(key =>
        Object.assign(
          {
            type: 'line',
            name: '',
            data: []
          },
          key
        )
      )
    };
  }

  useEffect(() => {
    const opts = getOptions({
      xAxis: new Array(10).fill().map(() => new Date().toLocaleDateString()),
      series: [
        {
          name: '平均耗时',
          data: new Array(10).fill().map(() => parseInt(100 * Math.random()))
        }
      ]
    });
    setOptions(opts);
  }, []);

  const onClick = v => {
    console.log('点击事件', v);
  };

  return (
    <div>
      <ChartBox deep height="300px" options={options} onClick={onClick}></ChartBox>
      <h3>SvgIcon</h3>
      <div style={{
          backgroundColor: '#ccc',
          padding: 20
        }}>
        <SvgIcon.BackTop />
        <SvgIcon.Unbind />
        <SvgIcon.Upload />
      </div>
    </div>
  );
}
