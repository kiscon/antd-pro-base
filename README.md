# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Antd Pro 最佳实践

- [UmiJS](https://umijs.org/zh-CN/docs)

> Umi 是什么？Umi，中文可发音为乌米，是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。

- [Ant Design Pro](https://pro.ant.design/docs/getting-started-cn)
> Ant Design Pro 是一个企业级中后台前端/设计解决方案。

## 组件列表

- SettingDrawer 布局设置
- Message 提示信息
- InfoList 信息列表
- ExportDropdown 导出选择列表
- XForm 新增/修改表单
- FormDetail 详情表单
- FormQuery 查询表单
- SvgIcon SVG图标
## 页面

- baseDetail 基础详情
- baseForm 基础表单(基于Form和ProForm开发)
- baseList 基础列表
- baseMap 基础地图
- Exception 异常页(403/404/500)

## git hook

```json
"lint-staged": {
  "**/*.less": "stylelint --syntax less",
  "**/*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
  "**/*.{js,jsx,tsx,ts,less,md,json}": [
    "prettier --write"
  ]
},
```
## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
