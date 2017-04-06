/*首先我是通过gulp 去创建任务，
* 我就需要去引入gulp
* require 需要的意思  link href
* */
/*返回的是一个对象*/
var gulp=require("gulp");
/*我需要引入这个gulp-less 来实现编译*/
var gulpless=require("gulp-less");
/*我引入gulp-autoprefixer 这个插件*/
var autoprefixer=require("gulp-autoprefixer");
/*引入css 压缩 gulp-cssmin*/
var cssmin=require("gulp-cssmin");

/*引入的图片压缩*/
var imagemin=require("gulp-imagemin");

/*引入js 的压缩文件*/
var uglify=require("gulp-uglify");
/*引进的是文件合并*/
var concat=require("gulp-concat");
/*引入html 的压缩包*/
var htmlmin=require("gulp-htmlmin");
/*生成版本*/
var rev=require("gulp-rev");
/*文件替换*/
var collector=require("gulp-rev-collector");

/*对文件合并以及重命名.*/
var useref=require("gulp-useref");

/*gulp-if 引入*/

var giif=require("gulp-if");



/*
    任务，去创建任务
        1:任务的名称
        2:我要执行什么样的任务
*
* */
/*我要做的操作是讲less 文件进行编译，编译成css 文件.*/
gulp.task("less",function(){
    gulp.src("./less/*.less")
//   将它执行一个任务 pipe 管道
    //gulp 它是不干活的，它是交给自己的一些插件来完成任务.
        .pipe(gulpless())
        /*输出到硬盘上面的某个位置*/
        .pipe(gulp.dest("./release/lesscss"))
});

/*为所有的css 文件的代码添加私有化前缀. -webkit
 安装这个gulp-autoprefixer 插件  npm install gulp-autoprefixer
 安装在node_modules 里面
 */
/*新建一个任务去完成 添加前缀的*/
gulp.task("prefixer",function(){
      gulp.src("./less/index.css")
          .pipe(autoprefixer())
          .pipe(gulp.dest("./release/prefixer"))
});
/* css 压缩 */
gulp.task("cssmin",function(){
     gulp.src("./less/*.css")
         .pipe(cssmin())
         .pipe(gulp.dest("./release/cssmin"))
});
/*压缩图片.*/
gulp.task("imagemin",function(){
     gulp.src("./images/**/*")
         .pipe(imagemin())
         .pipe(gulp.dest("./release/imagemin"))
});

/*压缩js 文件*/
//一个页面巨多的js 文件.
gulp.task("jsuglify",function(){
    gulp.src("./script/app.js")
        .pipe(uglify())
        .pipe(gulp.dest("./release/jsmin"))
});
//src多就会出性能就不好。合并成一个文件.
gulp.task("concat",function(){
    gulp.src("./script/*.js")
        .pipe(concat("all_1.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./release/concat"))
})

/*压缩html*/
gulp.task("htmlmin",function(){
    gulp.src(["./index.html","./views/*.html"],{"base":"./"})
        /*需要去设置一些参数.*/
        /*
        *{collapseWhitespace: true} 去掉空格的
        * */
        .pipe(htmlmin(
            {collapseWhitespace: true,removeComments:true}))
        .pipe(gulp.dest("./release/htmlmin"))
})
/*
* gulp-rev 生成对应资源文件的版本
* 生成的新的版本.
* 加密
* */
gulp.task("rev",function(){
       gulp.src("./less/*.css")
           .pipe(rev())
           .pipe(gulp.dest("./release/rev"))
})

gulp.task("rev_1",function(){
    gulp.src("./script/app.js")
        .pipe(rev())
        .pipe(gulp.dest("./release/rev"))
        /*清单.*/
        .pipe(rev.manifest())
        /*生成一个清单文件*/
        .pipe(gulp.dest("./release"))
})
/*需要替换的这样的一个操作.*/

/*替换，我们也需要去下载另外的一个插件.
* rev-collector
* */
gulp.task("collect",function(){
    gulp.src(["./release/*.json","./index.html"])
        .pipe(collector())
        .pipe(gulp.dest("./release/con"))
});


/*gulp useref() 合并*/
gulp.task("userefhtml",function(){
    gulp.src("./index.html")
        .pipe(useref())
        /*
            一般一个命令，生成一次输出.
        *   两个任务.
        * */
        .pipe(giif("*.css",uglify()))
        .pipe(gulp.dest("./release/useref"))
});


















