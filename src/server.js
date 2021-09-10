/**
 * @title: server.js
 * @author: Javier Olaya
 * @date: 9/7/2021
 * @description: contains the main server that applications
 */
const Koa = require('koa');

const app = new Koa();
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const PORT = process.env.PORT || 3000;

app.proxy = true;

app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log('request received', { method: ctx.method, path: ctx.path });

  await next();
});

app.use(router.routes());

console.log(`Server listening on port: ${PORT}`);
const server = app.listen(PORT);

module.exports = server;
