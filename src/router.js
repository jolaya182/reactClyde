/**
 * @title: router.js
 * @author: Javier Olaya
 * @date: 9/8/2021
 * @description: contains the koa routting of the application
 */
const Router = require('koa-router');

const router = new Router();
const {
  filterRhinosByGivenParams,
  getRhinoById,
  findEndangeredRhinos,
  newRhinoceros
} = require('./rhinoceros');
const {
  createRhinoMissingObject,
  areAnyParameterRulesBroken
} = require('./utils/RhinoRules');

/**
 * route that returns every rhinoceros or
 * a filtered part of the rhinoceros based
 * on the paramaters
 */
router.get('/rhinoceros', (ctx, next) => {
  try {
    const { query } = ctx.request;
    const allRhinocerosFiltered = filterRhinosByGivenParams(query);
    ctx.response.body = allRhinocerosFiltered;
    next();
  } catch (error) {
    ctx.throw(500, error);
  }
});

router.get('/rhinocerosID', (ctx, next) => {
  try {
    const { query } = ctx.request;
    const { id } = query;
    let retrievedRhinoObject = getRhinoById(id);
    if (retrievedRhinoObject === undefined)
      retrievedRhinoObject = createRhinoMissingObject();

    ctx.response.body = retrievedRhinoObject;
    next();
  } catch (error) {
    ctx.throw(500, error);
  }
});

/**
 * route that return all the rhinoceroses sepecies that are endangered
 */
router.get('/endangered', (ctx, next) => {
  try {
    ctx.response.body = findEndangeredRhinos();
    next();
  } catch (error) {
    ctx.throw(500, error);
  }
});

/**
 * route that allows inserts of rhino objects while
 * enforcing the rhino properties rules
 */
router.post('/rhinoceros', (ctx, next) => {
  try {
    const { body } = ctx.request;
    const { isRuleBroken, errorMessage } = areAnyParameterRulesBroken(body);

    if (isRuleBroken) {
      ctx.throw(400, errorMessage);
      return;
    }
    ctx.response.body = newRhinoceros(body);
    next();
  } catch (error) {
    ctx.throw(500, error);
  }
});

module.exports = router;
