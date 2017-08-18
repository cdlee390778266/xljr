module.exports = function(grunt) {


    // LiveReload的默认端口号，你也可以改成你想要的端口号
    var lrPort = 35729;
  // 使用connect-livereload模块，生成一个与LiveReload脚本
  // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
  var lrSnippet = require('connect-livereload')({ port: lrPort });
  // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var lrMiddleware = function(connect, options, middlwares) {
      return [
      lrSnippet,
    // 静态文件服务器的路径 原先写法：connect.static(options.base[0])
    serveStatic(options.base[0]),
    // 启用目录浏览(相当于IIS中的目录浏览) 原先写法：connect.directory(options.base[0])
    serveIndex(options.base[0])
    ];
};


grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      options: {
        // 服务器端口号
        port: 8000,
        // 服务器地址(可以使用主机名localhost，也能使用IP)
        hostname: 'localhost',
        // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
        base: '.'
    },

    // server: {
    //     options: {
    //       open: true, //自动打开网页 http://
    //       keepalive: true,
    //       base: [
    //         'tpls'  //主目录
    //         ]
    //     }
    // },

    livereload: {
        options: {
          // 通过LiveReload脚本，让页面重新加载。
          middleware: lrMiddleware
      }
  }
},
        // concat: {
        //     options: {
        //         //separator: ';'
        //     },
        //     allInOne: { //所有JS文件全部合并成一份文件
        //         src: ['src/js/**/*.js'],
        //         dest: 'dest/src-concated/js/<%= pkg.name %>.js'
        //     }
        // },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            // buildrelease: {
            //     options: {
            //         mangle: true,
            //         compress: {
            //             drop_console: true
            //         },
            //         report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
            //     },
            //     files: [{
            //         expand: true,
            //         cwd: 'dest/src-concated/js', //js目录
            //         src: '**/*.js', //所有js文件
            //         dest: 'dest/release/js', //输出到此目录下
            //         ext: '.min.js' //指定扩展名
            //     }]
            // },
            // buildsrc: { //按照原来的目录结构压缩所有JS文件
            //     options: {
            //         mangle: true,
            //         compress: {
            //             drop_console: true
            //         },
            //         report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
            //     },
            //     files: [{
            //         expand: true,
            //         cwd: 'src', //js目录
            //         src: '**/*.js', //所有js文件
            //         dest: 'dest/src-min', //输出到此目录下
            //         ext: '.min.js' //指定扩展名
            //     }]
            // },
            buildall: { //按照原来的目录结构压缩所有JS文件
                options: {
                    mangle: true,
                    compress: {
                        drop_console: true
                    },
                    report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
                },
                files: [{
                    expand: true,
                    cwd: 'js', //js目录
                    src: '*.js', //所有js文件
                    dest: 'dist', //输出到此目录下
                    ext: '.min.js' //指定扩展名
                }]
            }
        },
        //  jshint: {
        //     files: ['test.js'],
        //     options: {
        //         //覆盖默认配置
        //         globals: {
        //             jQuery: true,
        //             console: true,
        //             module: true,
        //             document: true
        //         }
        //     }
        // },
        watch: {
            javascript: {
                files: ['js/*.js'],
                tasks: ['uglify:buildall'],
                options: {
                    spawn: true,
                    interrupt: true
                }
            },

            client: {
        // 我们不需要配置额外的任务，watch任务已经内建LiveReload浏览器刷新的代码片段。
        options: {
          livereload: lrPort
      },
        // '**' 表示包含所有的子目录
        // '*' 表示包含所有的文件
        files: ['tpls/*.html', 'css/*', 'js/*', 'images/*']
    }
}
});

grunt.loadNpmTasks('grunt-contrib-uglify');
   // grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-connect');

   grunt.registerTask('default', ['uglify','connect','watch']);
};
