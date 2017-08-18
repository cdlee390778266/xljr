package.json 文件里不要出现中文

一. 安装node .js
https://nodejs.org/en/download/

二. 安装grunt
 
  1. cmd 进入DOS ,cd切换进入项目目录(cd C:\Users\Administrator\Desktop\demo)
  2. 执行 npm install -g grunt-cli
  3. 执行 npm install  grunt
  网址：http://www.gruntjs.net/getting-started

三. 批量安装grunt依赖插件
  切换到项目根目录下 执行 npm install

四. 安装依赖插件(如有需要)
  切换到项目根目录下 npm install <module> --save-dev

五. 运行grunt 
  切换到项目根目录下 执行命令 grunt

六.打开浏览器输入localhost:8000 访问项目文件(能监控文件变化，如文件有变化会自动刷新页面)