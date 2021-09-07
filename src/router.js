const Router = require('koa-router');
const router = new Router();
const model = require('./rhinoceros');

router.get('/rhinoceros', async (ctx, next) => {
  // const {id} = ctx.req.params;
  const {id} = ctx.request.query;
  
  console.log("id", id);

  const rhinoceroses = model.getAll();

  if(id){
    const rhino = await model.getRhinoById(id);
    if(rhino){
      ctx.response.body = { rhino };
      return;
     }
    ctx.response.body =  {
      id: -1,
      name: 'name not found',
      species: 'species not found',
    };
    // next();
    return;
  }
  ctx.response.body = { rhinoceroses };
});

router.post('/rhinoceros', (ctx, next) => {
  ctx.response.body = model.newRhinoceros(ctx.request.body);
});

module.exports = router;
