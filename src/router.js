const Router = require("koa-router");
const router = new Router();
const model = require("./rhinoceros");
const { allowSpeciesTable, allowedNameTable } = require("./conts/const");

router.get("/rhinoceros", (ctx, next) => {
  try {
    const { query } = ctx.request;
    const allParameters = Object.keys(query);
    let allRhinoceros = model.getAll();
    let filteredRhinceros = [];

    allParameters.forEach((props) => {
      console.log("props", props);
      filteredRhinceros = allRhinoceros.filter((rhino) => {
        return rhino[props] === query[props];
      });
      allRhinoceros = filteredRhinceros;
    });

    ctx.response.body = { allRhinoceros };
  } catch (error) {
    ctx.throw(500, error);
  }
});

router.get("/rhinocerosID",  (ctx, next) => {
  try {
    const { query } = ctx.request;
    const { id } = query;
    if (id) {
      const rhino =  model.getRhinoById(id);
      if (rhino) {
        ctx.response.body = { rhino };
        return;
      }
      ctx.response.body = {
        id: -1,
        name: "name not registered",
        species: "species not registered",
      };
      return;
    }
    const rhinoceroses = model.getAll();
    ctx.response.body = { rhinoceroses };
  } catch (error) {
    ctx.throw(500, error);
  }
});

const IsRulePropertyNameSpeciesEnforced =  (rhinoObject) => {
  const properties = Object.keys(rhinoObject);

  let arePropertiesValid = false;
  arePropertiesValid =  properties.every((prop) =>
    allowedNameTable.has(prop)
  );
  // check if the number of properties are at least the same or higher
  if (properties.length < allowedNameTable.size) arePropertiesValid = false;
  return arePropertiesValid;
};

const IsRuleNameSpeciesValuesEnforced = (rhinoObject) => {
  let areSpeciesNamesAllowed = false;
  if (allowSpeciesTable.has(rhinoObject.species)) {
    areSpeciesNamesAllowed = true;
    return areSpeciesNamesAllowed;
  }
  return areSpeciesNamesAllowed;
};

router.post("/rhinoceros",  (ctx, next) => {
 try{ const { body } = ctx.request;
  const isBodyPropertiesCorrect =  IsRulePropertyNameSpeciesEnforced(body);
  const isBodyContentCorrect =  IsRuleNameSpeciesValuesEnforced(body);
  if (!isBodyPropertiesCorrect) {
    //throw error exception
    ctx.throw(
      400,
      "Rule Property Name Species is not Enforced. Properties have to be and written as the following 'name' and 'species' '"
    );
  }

  if (!isBodyContentCorrect) {
    //throw error exception
    ctx.throw(
      400,
      "Rule Name Species Values is not Enforced. Species submitted is not within the permissible species, please write another species that is allowed"
    );
  }

  ctx.response.body = model.newRhinoceros(ctx.request.body);} catch(error)
  {
    ctx.throw(500, error);
  }
});

router.get("/endangered", (ctx, next) => {
  try{ 
    const allRhinoceros = model.getAll();
    const endangeredSpecies = new Map();
    const speciesCount = new Map();

    allRhinoceros.forEach(rhino => {
      const rhinoSpecies = rhino.species;
      if(speciesCount.has(rhinoSpecies)){
        const currentRhinoCount = speciesCount.get(rhinoSpecies) + 1; 
        endangeredSpecies.set(rhinoSpecies, currentRhinoCount );
        speciesCount.set(rhinoSpecies, currentRhinoCount );
        if( currentRhinoCount > 2 ){
          console.log("endangeredSpecies", endangeredSpecies);
          console.log("speciesCount", speciesCount);
          console.log("currentRhinoCount", currentRhinoCount);
          if(endangeredSpecies.has(rhinoSpecies) ) endangeredSpecies.delete(rhinoSpecies);
          console.log("endangeredSpecies", endangeredSpecies);
          
        }
        return
      }
      endangeredSpecies.set(rhinoSpecies, 1);
      speciesCount.set(rhinoSpecies, 1);
    });
    console.log("end endangeredSpecies", endangeredSpecies);
    ctx.response.body = Array.from(endangeredSpecies).map(([key, value])=>({key, value}) );

  } catch(error)
   {
     ctx.throw(500, error);
   }
 });

module.exports = router;
