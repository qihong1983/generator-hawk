# 前端集成自动化项目构建方案Hawk


<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/logo.png"  />


by 小洪 qihongbin@163.com

## Generator-Hawk 方案简介

> Generator-Hawk 是web前端项目脚手架方案，用来生成项目代码骨架，你可以方便的基于此结构来开发你的项目，并享用到 web前端的诸多优秀特性。

### Generator-Hawk 安装

> npm install -g yo generator-hawk

### Generator-Hawk 所需要的环境

> node
> gitbash
> charles


## 环境配置

### gitbash 中文环境配置

> gitbashgitbashgitbashgitbashgitbashgitbash

## Generator-Hawk 方案的使用 

> 方案的使用方案的使用方案的使用  

## Generator-Hawk 组成

<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/logo.png"  />

## 插件的使用(gulpfile.js)
```javascript
var gulp = require('gulp'),
  hawkcss = require('gulp-hawkcss');

gulp.task('default', function() {
  gulp.src('./*.html')
    .pipe(hawkcss())
    .pipe(gulp.dest('dest/'));
});
```

## 示例html代码

> http://a.cdn.cn/??assets/a1.css,assets/a2.css,assets/a3.css

```html
<!DOCTYPE html>
<html>
<head lang="zh-cmn-Hans">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="renderer" content="webkit">
    <link rel="stylesheet" href="assets/mian.css" />
    <!-- css:start -->

    <!-- css:end -->

    <title>cssCombo</title>
</head>
<body>
    <link rel="stylesheet" href="assets/a1.css" />
    <link rel="stylesheet" href="assets/a2.css" />
    <div class="a1">
        a1
    </div>
    <div class="a2">
        a2
    </div>

    <link rel="stylesheet" href="assets/a3.css" />
    <div class="a3">
        a3
    </div>


</body>
</html>
```


