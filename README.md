# 使用教程

> 1.  局安装 gulp：

```
    $ npm i -g gulp
```

> 2.  安装依赖

```
    $ npm i
```

> 3.  生成 dist 文件

如果没有 dist 文件的时候，先运行`gulp build`命令，dist 已经存在的话直接运行`gulp serve`即可

> 4.  文件目录

```
 - dist   打包文件
 - src    开发文件
   - images   图片
   - js       js文件
   - sass     样式文件
   - libs     第三方插件
   - c-header.html  头文件 css的引入（需要注意的是引入的最终编译为css文件，所以是XXOO.css结尾）
   - c-footer.html  脚本部分 js的引入
   - index.html   样式模板文件，html文件最好按它来
```
