import { style, title, detail, getMarker } from './style';

export const thousands = (num) => {
  if (typeof num !== 'number' && !num) {
    return '';
  }
  return (+num).toLocaleString();
};

export function tooltipFormatter(getOptions) {
  return (params) => {
    // console.log(params, getOptions())

    // 提示框 数值 获取
    function getValue(data) {
      let chartValue = data.value;
      if (typeof data.value === 'object') {
        try {
          chartValue = data.value[getOptions()['series'][data.seriesIndex]['encode']['y']] || 0;
        } catch (e) {
          chartValue = null;
          console.log(e);
        }
      }
      return chartValue;
    }

    // 格式化内容
    let unit = getOptions()['toolTipUnit'] || '';
    let content = '';
    if (Array.isArray(params)) {
      content = title(params[0].axisValueLabel);
      params.forEach((key) => {
        let key_color = key.color.colorStops ? key.color.colorStops[0].color : key.color;
        content += `
        <div style="${style}
        height:20px;
        line-height:20px;
        ">
        ${getMarker(key_color)[key.seriesType]}
        ${
          (typeof key.data === 'object' && key.data.name) ||
          (key.axisId === key.seriesId ? key.axisValueLabel : key.seriesName)
        }：
        ${getValue(key)}${unit}
        </div>`;
      });
      return content;
    } else {
      content = title(params.name);
      if (params.seriesType === 'pie') {
        params.value = typeof params.value === 'object' ? params.value.value : params.value;
        content += detail(`${params.name}：${params.value}${unit}`);
        content += detail(`占比：${params.percent}%`);
      } else {
        content += detail(
          `${getMarker(params.color)[params.seriesType]}${params.name}：${getValue(params)}${unit}`,
        );
      }
      return content;
    }
  };
}

export function axisLabelFormatter(getOptions) {
  return (params) => {
    let fontLength = getOptions()['axisLabelFontSizeLimit'];
    if (!fontLength) {
      return params;
    } else {
      let fontArr = params.split('');
      fontArr.splice(fontLength, 0, '\n');
      return fontArr.join('');
    }
  };
}

export function seriesLabelFormatter(getOptions) {
  return (params) => {
    let val = params.value;
    let total = params.data.chartTotal;
    if (!val && !total) return '';
    if (typeof val === 'object') {
      try {
        let seriesEncodeVal = val[getOptions()['series'][params.seriesIndex]['encode']['y']];
        return thousands(+seriesEncodeVal || '');
      } catch (e) {
        return '';
      }
    }
    return thousands(+params.data.chartTotal || +val || '');
  };
}

// 格式radar类型
export function tooltipRadarFormatter(getOptions) {
  return (params) => {
    // console.log(params, getOptions())
    let content = '';
    if (!Array.isArray(params)) {
      content = title(params.name);
      if (params.seriesType === 'radar') {
        let radarOptions = getOptions()['radar'];
        if (radarOptions.length) {
          radarOptions[0]['indicator'].forEach((item, index) => {
            content += detail(`${item.name}：${params.value[index]}`);
          });
        }
      }
    }
    return content;
  };
}
