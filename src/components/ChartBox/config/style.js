// 公共样式
export const style = `
  padding:0 12px;
  color:#333;
  font-size:12px;`;

// 提示框 标题 样式
export function title(name) {
  return `<div style="${style}
  border-bottom:1px solid #DCDAE2;
  height:28px;
  line-height:28px;
  margin-bottom:6px;
  ">${name}</div>`;
}

// 提示框 内容 样式
export function detail(text) {
  return `
  <div style="${style}
  height:20px;
  line-height:20px;
  ">${text}</div>       
  `;
}

// 小图标样式
export function getMarker(color) {
  // 公共样式
  const publicStyle = `
  display:inline-block;
  margin-right:5px;
  width:10px;
  height:10px;
  `;
  return {
    // 拆线图 - 实心圆
    // 空心圆 border: 2px solid ${color};
    line: `<span style="
    ${publicStyle}        
    border-radius: 50%;
    background-color:${color};
    "></span>`,
    // 柱状图 - 实心方块
    bar: `<span style="
    ${publicStyle}
    border-radius: 2px;
    background-color:${color}
    "></span>`,
    // 饼图 - 实心圆
    pie: `<span style="
    ${publicStyle}
    border-radius: 50%;
    background-color:${color}
    "></span>`,
  };
}
