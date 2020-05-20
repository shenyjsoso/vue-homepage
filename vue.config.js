// vue.config.js
var path = require('path')
module.exports = {
    devServer: {
        overlay: {
            warning: false,
            errors: true,
        },
        // 设置代理
        port: 9091,
        proxy: {
            '/api': {
                //target: 'http://localhost:8888/',
                target: 'http://192.168.1.57:8084/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/portal',
                },
            },
            
            '/ssoApi': {
                target: 'http://192.168.2.223:8099/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/ssoApi': '/',
                },
            },
        },
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            //打包去除console.log
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    }
}