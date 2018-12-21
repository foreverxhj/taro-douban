const Koa = require('koa')
const router = require('koa-router')()
const request = require('co-request')
// CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。
// 下面以koa2-cors为例，
const cors = require('koa2-cors');

// const URI = 'https://api.douban.com/v2/movie'
const URI = 'https://movie.douban.gusaifei.com/v2/movie'
router.prefix('/douban')

const app = new Koa()

// 具体参数我们在后面进行解释
app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

router.get(['/:type', '/:type/:id'], async ctx => {
  let result
  try {
    let url = ctx.url.replace(/\/douban(\w*)/, URI + '$1')
    console.log(':::', url, ':::')
    result = await request({uri: url, method: ctx.method}) // 返回的是字符串
  } catch (error) {
    throw new Error(error)
  } finally {
    ctx.body = JSON.parse(result.body)
  }
})

app.use(router.routes())

app.listen(3001, () => {
  console.log(`Server started on 3001`)
})
