import * as Koa from 'koa'
import * as path from 'path'
import * as Router from 'koa-router'

const app: Koa = new Koa();
const { getSelectGoods } = require('../server/select_goods/index');
const { setCORSHeader } = require('./middleware/cors-middleware')

type Context = Koa.Context;

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

// render
require('koa-ejs')(app, {
  // @ts-ignore
  // root 为经过webpack编译后的真实模板路径
  root: path.resolve(__dirname, isDev ? '../dist/views' : '../views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false,
  // delimiter: '?',
})


// router
const router: Router = new Router()

router
  .get('/', async (ctx: Koa.Context) => {
    await ctx.render('index', {
      title: '首页'
    })
  })
  .get('/blog', async (ctx: Koa.Context) => {
    await ctx.render('blog', {
      title: '博客'
    })
  })

router.get('/apis/ecom/pc/select/goods', async (ctx: Context) => {

  ctx.body = {
    code: 0,
    data: getSelectGoods()?.data,
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(setCORSHeader)

module.exports = app
export default app