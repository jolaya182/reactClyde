const Router = require('koa-router');
const router = new Router();
const model = require('./rhinoceros');
const {allowSpeciesTable, allowedNameTable} = require('./conts/const');

router.get('/rhinoceros', async (ctx, next) => {
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
    return;
  }
  ctx.response.body = { rhinoceroses };
});

const IsRulePropertyNameSpeciesEnforced = async (rhinoObject)=>{
  const properties = Object.keys(rhinoObject);

  let arePropertiesValid = false;
  arePropertiesValid = await properties.every((prop)=>allowedNameTable.has(prop))
  // check if the number of properties are at least the same or higher
  if(properties.length < allowedNameTable.size) arePropertiesValid = false;

  await console.log("arePropVal", arePropertiesValid);

  return arePropertiesValid;
}

const IsRuleNameSpeciesValuesEnforced =  (rhinoObject)=>{
  // const table set
  // get it from hash table from const file


  let  areSpeciesNamesAllowed = false;

  if(allowSpeciesTable.has(rhinoObject.species)){
    areSpeciesNamesAllowed = true;
    return areSpeciesNamesAllowed
  };

  return areSpeciesNamesAllowed;
}


router.post('/rhinoceros', async (ctx, next) => {
  const {body} = ctx.request;
  const isBodyPropertiesCorrect = await IsRulePropertyNameSpeciesEnforced(body);
  const isBodyContentCorrect = await IsRuleNameSpeciesValuesEnforced(body);
  if(!isBodyPropertiesCorrect){
    //throw error exception
    const RhinoNotPermitted =  {
      id: -1,
      errorMessage: 'properties have to be and written as the following \'name\' and \'species\' ',
    };
    ctx.response.body = RhinoNotPermitted;
    return
  }

  if(!isBodyContentCorrect){
    //throw error exception
    const RhinoNotPermitted =  {
      id: -1,
      errorMessage: 'species submitted is not within the permissible species, please write another species that is allowed',

    };
    ctx.response.body = RhinoNotPermitted;
    return
  }

  ctx.response.body = model.newRhinoceros(ctx.request.body);
});

module.exports = router;
