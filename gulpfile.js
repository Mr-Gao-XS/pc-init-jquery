var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
var reload = browserSync.reload; //browserSync 的自动刷新文件  要设置参数stream:true
var fileinclude = require('gulp-file-include');
var cssnano = require('gulp-cssnano'); //CSS压缩
var htmlBeautify = require('gulp-html-beautify');
var htmlmin = require('gulp-htmlmin');

// 监控html文件
gulp.task("html", function (done) {
    // 适配page中所有文件夹下的所有html，排除!下的页面
    gulp.src(['src/*.html','!src/Login-pop.html', '!src/c-footer.html', '!src/c-header.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlBeautify({
            indent_size: 4,
            indent_char: ' ',
            // 这里是关键，可以让一个标签独占一行
            unformatted: true,
            // 默认情况下，body | head 标签前会有一行空格
            extra_liners: []
        }))
        // 最后使用 htmlmin 来统一输出的 html 格式
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'))
        .pipe(reload({
            stream: true
        }))
        .on('error', function (err) {
            console.log('Less Error!', err.message);
            this.end();
        })
    done();
});

// 监控第三方libs插件
gulp.task("libs", function (done) {
    gulp.src("src/libs/**/*", {
        base: 'src'
    })
        .pipe(gulp.dest("dist"))
        .pipe(reload({
            stream: true
        }));
    done();
});

// 监控js文件
gulp.task('script', function (done) {
    gulp.src('src/js/*.js') // ES6源代码
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .on('error', function (err) {
            console.log('Less Error!', err.message);
            this.end();
        })
        .pipe(gulp.dest('dist/js')) //转化为ES5存放的地方
        .pipe(reload({
            stream: true
        }));
    done();
});


//监控图片
gulp.task("image", function (done) {
    gulp.src(["src/images/*.*", "src/images/**/*"])
        .pipe(gulp.dest("dist/images"))
        .pipe(reload({
            stream: true
        }));
    done();
});

// 监控scss
gulp.task('sass', function (done) {

    gulp.src('src/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: true, //是否美化属性值 默认：true 
            remove: false //是否去掉不必要的前缀 默认：false
        }))
        // 此处会导致outputStyle失效
        // .pipe(cssnano({
        //     safe: false
        // })) //压缩 CSS
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({
            stream: true
        }));
    done();
});

// 删除dist所有文件
gulp.task('clean', function (cb) {
    del([
        'dist/**/*',
        //  '!dist/mobile/deploy.json'   // 我们不希望删掉这个文件，所以我们取反这个匹配模式
    ], cb);
    cb();
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "dist" //静态服务器的首页地址  相对路径
        }
    });
    gulp.watch("src/*.html", gulp.parallel('html')); //监控该目录下的内容  发送变化执行html服务
    gulp.watch(["src/images/*.*", "src/images/**/*"], gulp.parallel('image'));
    gulp.watch("src/libs/*.*", gulp.parallel('libs'));
    gulp.watch("src/js/*.js", gulp.parallel('script'));
    gulp.watch(["src/sass/*.scss"], gulp.parallel('sass'));
});
gulp.task('build', gulp.series('clean', gulp.parallel('html', 'libs', 'script', 'image', 'sass')));