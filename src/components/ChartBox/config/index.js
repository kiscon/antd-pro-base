import echarts from 'echarts';
import getDefaultOptions from './config';
import noDataImg from '../imgs/no-data.png';
import defaultsDeep from 'lodash/defaultsDeep';

/* eslint-disable */
export default class {
  constructor({ ...args }) {
    // 初始化图表
    this.charts = echarts.init(this.createDom(args));
    this.setOption(args);
    this._count = 0;
    this.onClick(args);
  }

  // 更新图表数据
  update({ ...args }) {
    this.appendDom(this.chartDom);
    this.setOption(args);
  }

  // 图表无数据 时调用 noData
  noData() {
    let box = this.getDomSize(this.parentNode);
    let canvas = document.createElement('canvas');
    canvas.width = box.width;
    canvas.height = box.height;
    let cxt = canvas.getContext('2d');
    let img = new Image();
    img.src = noDataImg;
    img.onload = () => {
      cxt.drawImage(
        img,
        (box.width - img.width) / 2,
        (box.height - img.height) / 2,
        img.width,
        img.height,
      );
    };
    this.appendDom(canvas);
  }

  onClick({ onClick, dbClick }) {
    this.charts.on('click', (params) => {
      this._count++;
      if (this._count < 2 && this.isFn(dbClick)) {
        this.timer = setTimeout(() => {
          if (this.isFn(onClick)) {
            onClick(params);
            this._count = 0;
            clearTimeout(this.timer);
          }
        }, 500);
      } else {
        clearTimeout(this.timer);
        this._count = 0;
        if (this.isFn(dbClick)) {
          dbClick(params);
        } else if (this.isFn(onClick)) {
          onClick(params);
        }
      }
    });
  }

  getOptions() {
    return this.charts.getOption();
  }

  setOption(args) {
    // 合并配置
    let options = this.options(args);
    // 不存在点击事件时，默认鼠标移入为指针形状
    if (!args.onClick && !args.dbClick) {
      options.series &&
        Array.isArray(options.series) &&
        options.series.forEach((s) => (s.cursor = 'default'));
    }
    // 检查数据是否为有效数据
    if (!this.checkSeries(options)) return;
    this.charts.setOption(options);
    this.addDomListenerRisize(this.chartDom, this.resize);
  }

  options({ data = {}, options, deep }) {
    options = Object.assign(
      {},
      {
        series: data && data.series,
      },
      { ...options },
    ); // 将data 中的 series 属性合并到 options 中
    let deaultData = getDefaultOptions({ ...data }, { ...options }, () => this.getOptions());
    if (deep) {
      if (deep.length) {
        // 指定 属性 深拷贝
        let copyData = {};
        if (Array.isArray(deep)) {
          deep.forEach((key) => {
            deaultData[key] && (copyData[key] = deaultData[key]);
          });
        } else if (typeof deep === 'string') {
          deaultData[deep] && (copyData[deep] = deaultData[deep]);
        }
        // console.log('指定属性深拷贝')
        return Object.assign({}, deaultData, defaultsDeep({ ...options }, copyData, {}));
      }
      // 未指定属性则 全部属性深拷贝
      // console.log('深拷贝')
      return defaultsDeep({ ...options }, deaultData, {});
    }
    // deep 为 false 时 默认为浅拷贝
    // console.log('浅拷贝')
    return Object.assign({}, deaultData, { ...options });
  }

  checkSeries({ series, dataset, noCheckSeries }) {
    if (noCheckSeries) return true;
    if (dataset) {
      // 使用 dataset 时 判断数据 是否有效
      if (!Array.isArray(dataset)) {
        dataset = [dataset];
      }
      if (
        series.some((s) => {
          if (!s) return false;
          let data = dataset[s.datasetIndex || 0];
          let isSource = data && Array.isArray(data.source);
          if (s.type === 'pie') {
            return isSource && data.source.some((d) => d.value);
          } else {
            return isSource && data.source.some((d) => d[s.encode.y]);
          }
        })
      )
        return true;
    } else if (series && series.length) {
      // 使用series 时 判断数据是否有效
      if (
        series.some((s) => {
          return (
            s &&
            Array.isArray(s.data) &&
            s.data.some((d) => {
              if (typeof d === 'object') return d.value;
              return d;
            })
          );
        })
      )
        return true;
    }
    // 图表数据无效时 自动显示暂无数据
    this.noData();
    this.addDomListenerRisize(this.chartDom, this.noData);
    return false;
  }

  resize() {
    this.charts.resize();
  }

  createDom({ el }) {
    let parentNode = '';
    if (el) {
      if (typeof el === 'string') {
        parentNode = document.querySelector(el);
      } else if (el instanceof window.HTMLElement) {
        parentNode = el;
      } else {
        throw new Error('el 不是dom 对象 或 css 选择器');
      }
    } else {
      throw new Error('el is undefined');
    }
    let dom = document.createElement('div');
    dom.style.width = '100%';
    dom.style.height = '100%';
    this.parentNode = parentNode;
    this.chartDom = dom;
    this.appendDom(dom);
    return dom;
  }

  appendDom(dom) {
    this.parentNode.innerHTML = '';
    this.parentNode.appendChild(dom);
  }

  addDomListenerRisize(dom, callBack) {
    this.removeDomListenerResize();
    let { width, height } = this.getDomSize(dom);
    if (typeof callBack === 'function') callBack.call(this);
    this.resizeTimers = setInterval(() => {
      if (
        (this.getDomSize(dom).width !== width || this.getDomSize(dom).height !== height) &&
        this.getDomSize(dom).width !== 0 &&
        this.getDomSize(dom).height !== 0
      ) {
        width = this.getDomSize(dom).width;
        height = this.getDomSize(dom).height;
        if (typeof callBack === 'function') callBack.call(this);
      }
    }, 10);
  }

  removeDomListenerResize() {
    clearInterval(this.resizeTimers);
  }

  getDomSize(dom) {
    return dom.getBoundingClientRect();
  }

  clear() {
    this.removeDomListenerResize();
    this.charts.clear();
  }

  log() {
    console.log(this.getOptions());
  }

  isFn(obj) {
    return obj && typeof obj === 'function';
  }
}
