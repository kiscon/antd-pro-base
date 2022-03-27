import React, { useImperativeHandle, forwardRef, useRef, useState, useEffect } from 'react';
import Echarts from './config/index';

export default forwardRef(function ChartBox(props, ref) {
  const {
    deep,
    defaultData,
    options,
    type = 'bar',
    needClear,
    log,
    onClick,
    dbClick,
    width,
    height,
  } = props;
  const chartContain = useRef('');
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (chartContain.current instanceof HTMLElement) {
      const opts = {
        el: chartContain.current,
        deep,
        data: setOptions(
          {
            type,
          },
          defaultData,
        ),
        options: setOptions(options),
        onClick: (params) => typeof onClick === 'function' && onClick(params),
        dbClick: (params) => typeof dbClick === 'function' && dbClick(params),
      };
      if (!chart) {
        setChart(new Echarts(opts));
      } else {
        chartUpdate(opts);
      }
    }
  }, [options]);

  function chartUpdate(options) {
    if (needClear) clear();
    if (chart) chart.update(options);
    if (log) printLog();
  }
  function setOptions(...options) {
    return Object.assign({}, ...options);
  }
  function resize() {
    chart.resize();
  }
  function clear() {
    chart.clear();
  }
  function printLog() {
    chart.log();
  }

  useImperativeHandle(ref, () => ({
    ...chartContain,
    chartUpdate,
    setOptions,
    resize,
    clear,
    printLog,
  }));

  return (
    <div
      ref={chartContain}
      style={{ width: `${width || '100%'}`, height: `${height || '100%'}` }}
    ></div>
  );
});
