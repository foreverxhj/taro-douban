// 请求连接前缀
let baseUrl = 'http://localhost:3001/douban'
if (process.env.METHOD === 'proxy') {
    baseUrl = 'http://localhost:3001/douban' // 本地代理1(100次/小时)
} else if (process.env.METHOD === 'nginx') {
    baseUrl = 'http://47.106.140.12:3001/douban' // nginx 代理(100次/小时)
}

// 输出日志信息
const noConsole = true;

// console.log('服务模式:' + baseUrl)

export { baseUrl, noConsole }

