/**
 * @title: router.js
 * @author: Javier Olaya
 * @date: 9/8/2021
 * @description: contains the koa routting of the application
 */
const Router = require('koa-router');

const router = new Router();
const model = require('./rhinoceros');
const {
  createRhinoMissingObject,
  areAnyParameterRulesBroken,
  errorThrower
} = require('./utils/utils');

/**
 * route that returns every rhinoceros or
 * a filtered part of the rhinoceros based
 * on the paramaters
 */
router.get('/rhinoceros', (ctx) => {
  try {
    const { query } = ctx.request;
    const allRhinocerosFiltered = model.filterRhinosByGivenParams(query);
    ctx.response.body = { allRhinocerosFiltered };
  } catch (error) {
    ctx.throw(500, error);
  }
});

router.get('/rhinocerosID', (ctx) => {
  try {
    const { query } = ctx.request;
    const { id } = query;

    let retrievedRhinoObject = model.getRhinoById(id);
    if (retrievedRhinoObject === undefined)
      retrievedRhinoObject = createRhinoMissingObject();

    ctx.response.body = { retrievedRhinoObject };
  } catch (error) {
    ctx.throw(500, error);
  }
});

/**
 * route that return all the rhinos sepecies that are endangered
 */
router.get('/endangered', (ctx) => {
  try {
    ctx.response.body = model.findEndangeredRhinos();
  } catch (error) {
    ctx.throw(500, error);
  }
});

/**
 * route that allows inserts of rhino objects while
 * enforcing the rhino properties rules
 */
router.post('/rhinoceros', (ctx) => {
  try {
    const { body } = ctx.request;
    const { isRuleBroken, errorMessage } = areAnyParameterRulesBroken(body);

    if (isRuleBroken) {
      errorThrower(errorMessage, ctx);
      return;
    }
    ctx.response.body = model.newRhinoceros(body);
  } catch (error) {
    ctx.throw(500, error);
  }
});

module.exports = router;
