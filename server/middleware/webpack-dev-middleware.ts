import * as Koa from 'koa'
import * as WebpackDevMiddleware from 'webpack-dev-middleware'
import webpack = require('webpack')
import { NextHandleFunction } from 'connect'

const devMiddleware = (compiler: webpack.ICompiler, opts: WebpackDevMiddleware.Options) => {
  const middleware = WebpackDevMiddleware(compiler, opts)
  return async (ctx: Koa.Context, next: NextHandleFunction) => {
    ctx.set(
      'Access-Control-Allow-Origin', '*'
    )
    await middleware(ctx.req, {
      // @ts-ignore
      end: (content: string) => {
        ctx.body = content
      },
      setHeader: (name, value: any) => {
        console.log('header', name, value)
      }
    }, next)
  }
}

export default devMiddleware