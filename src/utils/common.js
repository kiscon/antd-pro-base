const AK = 'f6c5605653a47c5d22640c61d48f24aa'
export function aMapAk () {
  return new Promise(function (resolve, reject) {
    const head = document.head
    let dom = head.querySelector('#aMap')
    if (dom) {
      resolve(1)
      return
    }
    dom = document.createElement('script')
    dom.setAttribute('id', 'aMap')
    dom.src = '//webapi.amap.com/maps?v=1.4.15&key=' + AK
    dom.onerror = reject
    dom.onload = resolve
    head.appendChild(dom)
  })
}

/**
 * 获取全Api
 * @param {Array} context 数组
 * @param {Object} ignore 字符
 */
 export const getApis = (context, ignore) =>
 context.keys().reduce((modules, modulePath) => {
   let o = modules;
   if (modulePath !== ignore) {
     o = { ...modules, ...(context(modulePath).default || {}) };
   }
   return o;
 }, {});

/**
* @desc 节流
* @param {Function} fn 回调函数
* @param {Number} delay 延时时间
* @param {Object} options 参数
*/
export const throttle = (
 fn,
 delay = 300,
 options = {
   ctx: null
 }
) => {
 let lastTime = 0;
 return function (...args) {
   const nowTime = new Date().getTime();
   if (nowTime - lastTime > delay) {
     fn.call(options.ctx, ...args);
     lastTime = nowTime;
   }
 };
};

/**
* @desc 防抖
* @param {Function} fn 回调函数
* @param {Number} delay 延时时间
* @param {Object} options 参数
*/
export const debounce = (
 fn,
 delay = 300,
 options = {
   ctx: null
 }
) => {
 let timer = null;
 return function (...args) {
   clearTimeout(timer);
   timer = setTimeout(() => {
     fn.call(options.ctx, ...args);
   }, delay);
 };
};

/**
* @desc 判断是不是null
* @param {Any} val
*/
export const isNUll = val => typeof val === 'object' && !val;

/**
* @desc 判断是不是JSON数据
* @param {Any} val
*/
export const isJSON = str => {
 if (typeof str === 'string') {
   try {
     JSON.parse(str);
     return true;
   } catch {
     return false;
   }
 }
 return false;
};

/**
* @desc 获取数组的值总和
* @param {Array} arr
* @return {Number}
*/
export const getArrTotal = arr => arr.reduce((a, b) => a + b);

/**
* @desc 拼接数组
* @param {Array} arr
* @return {Array}
*/
export const mergeArr = (...arr) => [].concat(...arr);

/**
* @desc 计算数组对象中某个值的总和
* @param {Array} list
* @param {String} key
* @return {Number}
*/
export const getListKeyTotal = (list, key) => list.reduce((pre, cur) => Number(cur[key]) + pre, 0);

/**
* @desc 合并对象
*/
export function mergeObj(a, b) {
 isObj(a) &&
   isObj(b) &&
   Object.keys(b).forEach(k => {
     if (isObj(a[k]) && isObj(b[k])) {
       mergeObj(a[k], b[k]);
     } else {
       a[k] = b[k];
     }
   });
 return a;
}

/**
* @desc 深度合并，多个对象
* @param {*} args
*/
export function deepAssign(...args) {
 if (args.some(a => !isObj(a) && isTrue(a))) {
   throw new Error('all args must be a Object');
 }
 if (!args[0]) {
   throw new Error('target must be a Object');
 }
 return args.reduce(mergeObj);
}

/**
* @desc 深度克隆
* @param {Any} obj
* @return {Any}
*/
export const deepClone = obj => {
 if (isObj(obj)) {
   return deepAssign(JSON.parse(JSON.stringify(obj)), obj);
 }
 return obj;
};

/**
* @desc 计算dom元素到顶部的距离
* @param {Element} target
* @return {Number}
*/
export function getOffsetTop(target) {
 let top = 0;
 let parent = target;
 if (parent instanceof HTMLElement) {
   while (parent instanceof HTMLElement && parent !== document.body) {
     top += parent.offsetTop;
     parent = parent.offsetParent;
   }
 }
 return top;
}

/**
* @desc 只调用一次
* @param {Function} fn
*/
export function onceCall(fn) {
 let called = false;
 return function () {
   if (!called) {
     called = true;
     fn.apply(this, arguments);
   }
 };
}

/**
* @desc 首字母大写
* @param {String} str
* @return {String}
*/
export function firstToUp(str) {
 if (typeof str !== 'string') return str;
 return str[0].toLocaleUpperCase() + str.slice(1);
}

/**
* @desc 下划线转驼峰
* @param {String} name
* @return {String}
*/
export function toUpper(name) {
 if (typeof name !== 'string') return name;
 return name.replace(/(?:\_|\-)(\w+?)/g, function ($1, $2) {
   return $2.toLocaleUpperCase();
 });
}

/**
* @desc 驼峰转中划线
* @param {String} name
* @return {String}
*/
export function upperToLine(name) {
 if (typeof name !== 'string') return name;
 return name
   .replace(/(?:[A-Z])(\w+?)/g, function ($1, $2) {
     return '-' + $1.toLocaleLowerCase();
   })
   .replace(/^\-/, '');
}

/**
* @desc 是否为空
* @param {Any} obj
* @return {Boolean}
*/
export function isEmpty(obj) {
 if (isObj(obj)) {
   if (['Object', 'Array'].includes(getObjType(obj))) return !Object.values(obj).toString();
 }
 return !isTrue(obj);
}

/**
* @desc 数组扁平化
* @param {Array} arr
* @param {Object} options
* @return {Array}
*/
export function flatMap(arr, options) {
 const flatArr = [];
 const { childrenCode, callBack } = deepAssign(
   {
     childrenCode: 'children'
   },
   options
 );
 const flat = ar => {
   if (Array.isArray(ar)) {
     const d = deepClone(ar);
     d.forEach(a => {
       flatArr.push(a);
       typeof callBack === 'function' && callBack(a);
       isObj(a) && flat(a[childrenCode]);
     });
   }
 };
 flat(arr);
 return flatArr;
}

/**
* @desc 数组去重
* @param {Array} arr
* @param {String} code
* @return {Array}
*/
export function uniqBy(Arr, code) {
 const resultArr = [];
 const valArr = [];
 const codeArr = [];
 Array.isArray(Arr) &&
   Arr.forEach(a => {
     if (isObj(a) && isTrue(code)) {
       !codeArr.includes(a[code]) && resultArr.push(a);
       !codeArr.includes(a[code]) && codeArr.push(a[code]);
     } else {
       !valArr.includes(a) && resultArr.push(a);
       !valArr.includes(a) && valArr.push(a);
     }
   });
 return resultArr;
}

/**
* @desc 获取数据类型
* @param {Any} obj
* @return {Boolean}
*/
export function getObjType(obj) {
 return Object.prototype.toString.call(obj).slice(8, -1);
}

/**
* @desc 清空对象
* @param {Any} obj
*/
export function setEmpty(obj) {
 try {
   return new window[getObjType(obj)]().valueOf();
 } catch (e) {
   return '';
 }
}

/**
* @desc 获取结果 支持 方法，对象，promise
* @param {Any} source
* @return {Any}
*/
export async function getResult(source, ...args) {
 const type = typeof source;
 let r = source;
 if (type === 'function') {
   r = source(...args);
   if (r && typeof r.then === 'function') {
     r = await r;
   }
 } else if (type === 'object') {
   if (typeof source.then === 'function') {
     r = await source;
   }
 }
 return r;
}

/**
* @desc 对象检测
* @param {Any} target
* @return {Boolean}
*/
export function isObj(target) {
 return target !== null && typeof target === 'object';
}

/**
* @desc 判断是不是非空值
* @param {Any} val
* @return {Boolean}
*/
export function isTrue(target) {
 return target !== null && target !== undefined && target !== '';
}

/**
* @desc 随机生成uuid
* @param {String} val
* @return {String}
*/
export function getUuid(s) {
 return s + (Date.now().toString(32) + Math.random() * Math.pow(10, 5)).split('.')[0];
}

