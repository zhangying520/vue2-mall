## 基于 vue2 + vuex 构建一个单页面的电商网站

## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + axios + sass + svg + Element

## 项目运行

### 注意：由于涉及 ES6/7 等新属性，node 需要 6.0 以上版本

```
git clone https://github.com/zhoushengdong/vue2-mall.git

cd vue2-mall

npm install

npm run dev
```

## 此外
此项目有后台源码，如果想前后台同时开发，可以下载对应的后台：[后台项目传送地址](https://github.com/zhoushengdong/Vue-Express-Server)。

# 部分截图

```
├── build                      // 构建相关
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局 filter
│   ├── icons                  // 项目所有 svg icons
│   ├── lang                   // 国际化 language
│   ├── router                 // 路由
│   ├── store                  // 全局 store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── vendor                 // 公用vendor
│   ├── views                   // view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   └── permission.js          // 权限管理
├── static                     // 第三方不打包资源
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json
```
