
import Koa from 'koa'
import * as User from './lib/user'
import bodyParser from 'koa-bodyparser'
const app = new Koa();
 
app.use(bodyParser());
// // response
app.use(async ctx => {

  try{
    const ret = await User[ctx.request.path.replace('/','')](ctx.request.body.f, ctx.request.body.s) 

    ctx.body = JSON.stringify(ret);
  } catch(error) {
    ctx.body = error;
  }
  
});

console.log('start')
app.listen(3232);