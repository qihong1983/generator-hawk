# 前端集成自动化项目构建方案Hawk


<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/logo.png"  />


by 小洪 qihongbin@163.com

## Generator-Hawk 工具简介

> KISSY MINI 是一款面向无线前端研发的 JavaScript 类库，Generator-Mask 是 KISSY MINI 项目脚手架工具，用来生成项目代码骨架，你可以方便的基于此结构来开发你的项目，并享用到 KISSY MINI 的诸多优秀特性。

Generator-Mask 是 Generator-clam 简化开源版本，设计原理完全一致，Clam 绑定了更多阿里内部私有容器技术规范，阿里内部（阿里旅行）的同学请异步Generator-clam

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


