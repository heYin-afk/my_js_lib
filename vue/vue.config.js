//跨域
module.exports = {
    publicPath: '/',
    outputDir: "dist",
    devServer: {
        proxy: {
            '/': {
                target: 'http://test.shared123.cn',
                changeOrigin: true,
            }
        }
    }
};
