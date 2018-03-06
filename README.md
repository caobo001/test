# 广而易买家

## 运行项目

```
// 安装前端包管理工具 yarn
npm install -g yarn

// 安装完 yarn 后设置镜像源：
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global

// 安装项目依赖
yarn

// 编译主题
node_modules/.bin/et

// 运行项目
yarn run ssr:dev

// 安装pm2（若没有梯子可用 yarn 安装，在 Windows 下可能需要手动设置环境变量）
yarn install pm2 -g
yarn global add pm2

// 部署 ssr
yarn run ssr:build
yarn run deploy
yarn run deploy:reload  //重启
pm2 stop 0  //停止 ID 为 0 的进程
pm2 monit //实时监控
```

nginx 配置示例：

```
upstream tomcat {
    server 127.0.0.1:8080;
}

upstream webapp {
    server 127.0.0.1:8068;
}
server {
    listen       80;
    listen 443 ssl;
    server_name  local.guangeryi.com;
    charset utf-8;

    # ssl config start
    ssl_certificate /usr/local/etc/nginx/ssl/gey.pem;
    ssl_certificate_key  /usr/local/etc/nginx/ssl/gey.key;
    ssl_session_timeout  5m;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!ADH:!EXPORT56:RC4+RSA:+MEDIUM;
    # ssl config over

    location / {
        # root /Users/cheney/workspace/webpack/;
        proxy_pass http://tomcat;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
    }
    location ~ ^/webapp {
        proxy_pass http://webapp;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
    }
}
```

注意事项：

- 部署目录，比如部署在 `zencode.cn/path/` 上，必须设置 `config/index` 中的 `assetsPublicPath` 为 `/path/`

## 自定义主题

初始化变量文件和实时编译主题

```
node_modules/.bin/et -i
node_modules/.bin/et -w
```

## 相关文档
- [PM2](http://pm2.keymetrics.io/)，Node.js 进程管理
- [vue](https://cn.vuejs.org/v2/guide/)，构建数据驱动的 web 界面的渐进式框架
- [vue-router](https://router.vuejs.org/zh-cn/)，vue 路由管理
- [vue-loader](https://vue-loader.vuejs.org/en/)，「.vue」文件加载器
- [Vuex](https://vuex.vuejs.org/zh-cn/)，vue 状态管理
- [less](http://www.bootcss.com/p/lesscss/)，CSS 预处理语言
- [axios](https://github.com/mzabriskie/axios)，ajax 库
- [element-ui](http://element.eleme.io/#/zh-CN/component/installation)，UI 框架
- [ECMAScript 6](http://es6.ruanyifeng.com/)，JavaScript 语言的下一代标准
- [webpack](http://webpack.github.io/)，前端打包工具


## 编码规范

### git commit 建议

建议分为四种提交类型，分别是 feat, refactor, chore 和 fix，后面跟小写冒号和一个空格『: 』，然后接着是提交的内容（英文和中文中间用一个空格隔开）

feat 表示功能，refactor 表示代码重构，fix 表示修复 bug 等，chore 表示日常琐事，比如更新文档和依赖等

为了和后端项目规则兼容，现以以下规则提交：

新增|修改|删除|优化|其他 + 空格 + 注释

### vue 文件

components 和 views 两个文件夹分别对应『组件』和『页面』，『组件』文件名加前缀『C』,首字母大写，采用驼峰式命名。『页面』文件名中只能出现小写字符和破折号（dashe）（不是下划线，也不是驼峰命名法）

### HTML

- 用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法
- 嵌套元素应当换行并且缩进一次（即两个空格）

### CSS

#### 语法

- 用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法
- 为选择器分组时，将单独的选择器单独放在一行
- 为了代码的易读性，在每个声明块的左花括号前添加一个空格
- 声明块的右花括号应当单独成行
- 每条声明语句的 : 后应该插入一个空格
- 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，box-shadow）
- 十六进制值应该全部小写，例如，#fff

``` css
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

#### 声明顺序

相关的属性声明应当归为一组，并按照下面的顺序排列：

1. Positioning
2. Box model
3. Typographic
4. Visual

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面

#### class 命名

- class 名称中只能出现小写字符和破折号（dashe）（不是下划线，也不是驼峰命名法）。破折号应当用于相关 class 的命名（类似于命名空间）（例如，.btn 和 .btn-danger）
- 基于最近的父 class 或基本（base） class 作为新 class 的前缀
