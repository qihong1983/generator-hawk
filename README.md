# 前端集成自动化项目构建方案Hawk


<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/logo.png"  />


by 小洪 qihongbin@163.com

## Generator-Hawk 方案简介

> Generator-Hawk 是web前端项目脚手架方案，用来生成项目代码骨架，你可以方便的基于此结构来开发你的项目，并享用到 web前端的诸多优秀特性。

### 安装

> npm install -g yo generator-hawk

### 功能介绍

> 按需合并

> 压缩js和css

> 图片压缩

> 一键式启动 （http combo 本地服务）

> 合成雪碧图

> 图片转base64编码

> 一键式发布ftp  测试服务器 & 一键式发布ftp 预发服务器 & 一键式发布ftp  cdn服务器 

> 注释文档

> 代理服务调试代码 

> 线上调试 

> md5戳

> 通用组件管理

> 脚首架 （输出目录结构规范和代码规范--自动关联）

> 页面模块化方案

> 地址映射

> url引用规范  (http://xxx.cdn.cn/a/group/project/0.1.0/...)




## 环境配置

### gitbash 中文环境配置

> vi /etc/gitconfig

```shell
[gui]

encoding = utf-8 #代码库统一用urf-8,在git gui中可以正常显示中文

[i18n]

commitencoding = GB2312 #log编码，window下默认gb2312,声明后发到服务器才不会乱码

[svn]

pathnameencoding = GB2312 #支持中文路径

```

> vi /etc/git-completion.bash

```shell
alias ls='ls --show-control-chars --color=auto' #ls能够正常显示中文
```

> vi /etc/inputrc

``` shell
set output-meta on #bash中可以正常输入中文

set convert-meta off
```

> vi /etc/profile

```shell
export LESSHARSET=utf-8 #$ git log 命令不像其它 vcs 一样，n 条 log 从头滚到底，它会恰当地停在第一页，按  space 键再往后翻页。这是通过将 log 送给 less 处理实现的。以上即是设置 less 的字符编码，使得 $ git log  可以正常显示中文。
```

## 所需工具

<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/tools.jpg" style="width:487px; height:auto;" />


### 主要工具

> Yeoman：脚首架

> Gulp:打包/构建/预发/发布/开发环境

> Bower:组件管理依赖关系

> Gitlab：代码仓库


### 工具下载

> http://msysgit.github.io/   gitbash下载

> http://nodejs.org         nodejs下载

> $npm install –g yo 			  #yeaman安装

> $npm install –g gulp 	 	  #gulp安装

> $npm install –g bower 		  #bower安装

> $npm install –g generator-hawk  #generator-hawk安装

## 走起

<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/zouqi.jpg"  />


### 基本命令-- yo & gulp

#### yo初始化

>yo hawk:h:打印帮助

>yo hawk:初始化一个标准的Project

>yo hawk:初始化一个页面

>yo hawk:mod:初始化一个模块

>yo hawk:widget:初始化一个组件  

#### gulp打包

> gulp dev: 本地运行 

> gulp dev64: 本地运行图片base64编码

> gulp qa: 打包到测试环境 并自动提交到ftp服务器

> gulp qa64: 打包到测试环境图片base64编码 并自动提交到ftp服务器

> gulp online:  打包成线上环境 并自动提交到ftp服务器

> gulp online64: 打包成线上环境64 并自动提交到ftp服务器

> gulp onlineDebug: 打包成线上环境 不提交到ftp服务器

> gulp online64Debug: 打包成线上环境 不提交到ftp服务器 

### 目录结果 & 代码

#### 目录结果


```
./
├── gulpfile.js              项目构建主任务
├── package.json              项目配置文件
├── README.md                 项目自述文件
├── build/                    构建目录
├── doc/                      文档存放目录
├── .bower.json               组件安装源配置(gitlab or github)
├── .bowerrc                  
├── .editorconfig
├── .gitignore
├── abc.json 				  项目配置文件
└── src/                      源码目录
    ├── config.js             项目config.js
    ├── mods/  
    │   │            
    │   ├── mod1			   业务公用模块目录
    │   │   ├── demo.html
    │   │   ├── mod1.html
    │   │   ├── mod1.js
    │   │   └── mod1.css
    │   └── mod2
    │       ├── demo.html
    │       ├── mod2.html
    │       ├── mod2.js
    │       └── mod2.css
    │		
    ├── widgets/              组件目录（通用组件）
    │   │
    │   ├── widget1/
    │   │   ├── demo.html
    │   │   ├── widget1.js
    │   │   └── widget1.css
    │   └── widget2/          
    │       ├── demo.html
    │       ├── widget2.js
    │       └── widget2.css
    └── pages/                         
        └── page1/             
            ├── page1.js      
            ├── page1.sss        
            └── page1.html       
            ...
```

##### 目录和文件结构图

<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/dtree.jpg"  />



##### 模块的引入方式

> 代码演示

```html
@@include('../../mods/mod1/mod1.html')

```


> 如图

<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/includehtml.jpg"  />


##### 采用seajs的加载和定义(//seajs.org)

> 在页面里用sea.use

```javascript
seajs.use('pages/page1/page1',function (Page1) {
    var P = new Page1();

    P.init();
});
```

> seajs模块定义

```javascript
define(function (require, exports, module) {

	    "use strict"

        function Page1(opt) {
            if (!(this instanceof Page1)) {
                return new Page1(opt);
            }
        }

		Page1.prototype = {
            init: function () {
                console.log('init page1');
            },
            rander: function () {
                console.log('rander page1');
            }
	    };
		module.exports = Page1;
});

```

>  页面模块的定义

```html
<!-- css 和 js的引入在构建的过程中会自动被抽取出来合并到页面里-->
<link rel="stylesheet" href="mods/mod1/mod1.css" />
<script type="text/javascript" src="mods/mod1/mod1.js"></script>
<div class="mod1">
	模块1
</div>
<script>
	/** 
	 * @class mod1
	 * @uses mod1
	 */
	seajs.use('mods/mod1/mod1', function (Mod1) {
		var M = new Mod1();

		M.init();
	});
</script>
```

## 调试线上页面和测试页面和代理服务采第三方软件charles或fiddle

> 具体baidu搜索charles使用教程



## http combo功能介绍

> 原理图

<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/http_combo.jpg"  />

> 引用方式

```html
http://xxx.cdn.cn:8801/a/group/project/0.1.0/??pages/page1/page1.js,pages/page2/page2.js
```

> cdn nginx的配置 (https://github.com/alibaba/nginx-http-concat)







