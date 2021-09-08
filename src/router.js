const Router = require("koa-router");
const router = new Router();
const model = require("./rhinoceros");
const { allowSpeciesTable, allowedNameTable } = require("./conts/const");

router.get("/rhinoceros", async (ctx, next) => {
  try {
    const { query } = ctx.request;
    const allParameters = Object.keys(query);
    let allRhinoceros = model.getAll();
    let filteredRhinceros = [];
    let rhinosArrayList = new Map();

    allParameters.forEach((props) => {
      console.log("props", props);
      rhinosArrayList.set(props, allRhinoceros);
      filteredRhinceros = rhinosArrayList.get(props).filter((rhino) => {
        return rhino[props] === query[props];
      });
      allRhinoceros = filteredRhinceros;
    });

    ctx.response.body = { allRhinoceros };
  } catch (error) {
    ctx.throw(500, error);
  }
});

router.get("/rhinocerosID", async (ctx, next) => {
  try {
    await console.log("get->id", ctx.params);
    const { query } = ctx.request;
    const { id } = query;
    if (id) {
      const rhino = await model.getRhinoById(id);
      if (rhino) {
        ctx.response.body = { rhino };
        return;
      }
      ctx.response.body = {
        id: -1,
        name: "name not found",
        species: "species not found",
      };
      return;
    }
    const rhinoceroses = model.getAll();
    ctx.response.body = { rhinoceroses };
  } catch (error) {
    ctx.throw(500, error);
  }
});
const IsRulePropertyNameSpeciesEnforced = async (rhinoObject) => {
  const properties = Object.keys(rhinoObject);

  let arePropertiesValid = false;
  arePropertiesValid = await properties.every((prop) =>
    allowedNameTable.has(prop)
  );
  // check if the number of properties are at least the same or higher
  if (properties.length < allowedNameTable.size) arePropertiesValid = false;
  await console.log("arePropVal", arePropertiesValid);
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

router.post("/rhinoceros", async (ctx, next) => {
  const { body } = ctx.request;
  const isBodyPropertiesCorrect = await IsRulePropertyNameSpeciesEnforced(body);
  const isBodyContentCorrect = await IsRuleNameSpeciesValuesEnforced(body);
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

  ctx.response.body = model.newRhinoceros(ctx.request.body);
});

module.exports = router;
