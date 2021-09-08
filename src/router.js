const Router = require("koa-router");
const router = new Router();
const model = require("./rhinoceros");
const {
  isRhinoByIdFound,
  areAllRulesBroken,
  isIdMissing,
  errorThrower,
} = require("./utils/utils.js");

router.get("/rhinoceros", (ctx, next) => {
  try {
    const { query } = ctx.request;
    const isFilterOff = false;
    const areRulesBrokenMessage = areAllRulesBroken(query, isFilterOff);
    if (areRulesBrokenMessage) errorThrower(areRulesBrokenMessage, ctx);

    const allRhinocerosFiltered = model.filterRhinosByGivenParams(query);
    ctx.response.body = { allRhinocerosFiltered };
  } catch (error) {
    ctx.throw(500, error);
  }
});

router.get("/rhinocerosID", (ctx, next) => {
  try {
    const { query } = ctx.request;
    const { id } = query;

    const isIdMissingMessage = isIdMissing(id);
    if (isIdMissingMessage) errorThrower(isIdMissingMessage, ctx);
    const rhino = model.getRhinoById(id);
    const retrievedRhino = isRhinoByIdFound(rhino);

    ctx.response.body = { retrievedRhino };
  } catch (error) {
    ctx.throw(500, error);
  }
});

router.get("/endangered", (ctx, next) => {
  try {
    // const allRhinoceros = model.getAll();
    ctx.response.body = model.findEndangeredRhinos();
  } catch (error) {
    ctx.throw(500, error);
  }
});

router.post("/rhinoceros", (ctx, next) => {
  try {
    const { body } = ctx.request;
    const isFilterOff = true;
    const areRulesBrokenMessage = areAllRulesBroken(body, isFilterOff);
    if (areRulesBrokenMessage) errorThrower(areRulesBrokenMessage, ctx);
    ctx.response.body = model.newRhinoceros(body);
  } catch (error) {
    ctx.throw(500, error);
  }
});

module.exports = router;
