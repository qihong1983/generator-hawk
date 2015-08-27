# 前端集成自动化项目构建方案Hawk


<img src="https://raw.githubusercontent.com/qihong1983/generator-hawk/master/app/logo.png"  />


by 小洪 qihongbin@163.com

## Generator-Hawk 方案简介

> Generator-Hawk 是web前端项目脚手架方案，用来生成项目代码骨架，你可以方便的基于此结构来开发你的项目，并享用到 web前端的诸多优秀特性。

<object width="450" height="500" align="middle" id="reader" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param value="window" name="wmode"><param value="true" name="allowfullscreen"><param name="allowscriptaccess" value="always"><param value="http://wenku.baidu.com/static/flash/apireader.swf?docurl=http://wenku.baidu.com/play&amp;docid=ad691e00a6c30c2259019e73&amp;title=%E8%AF%BE%E4%BB%B6%E7%AC%AC%E5%85%AB%E7%AB%A0&amp;doctype=ppt&amp;fpn=5&amp;npn=5&amp;readertype=external&catal=0&amp;cdnurl=http://txt.wenku.baidu.com/play" name="movie"><embed width="450" align="middle" height="500" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="reader" src="http://wenku.baidu.com/static/flash/apireader.swf?docurl=http://wenku.baidu.com/play&amp;docid=ad691e00a6c30c2259019e73&amp;title=%E8%AF%BE%E4%BB%B6%E7%AC%AC%E5%85%AB%E7%AB%A0&amp;doctype=ppt&amp;fpn=5&amp;npn=5&amp;readertype=external&catal=0&amp;cdnurl=http://txt.wenku.baidu.com/play" wmode="window" allowscriptaccess="always" bgcolor="#FFFFFF" ver="9.0.0" allowfullscreen="true"></embed></object>


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


