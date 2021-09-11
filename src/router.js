/**
 * @title: router.js
 * @author: Javier Olaya
 * @date: 9/8/2021
 * @description: contains the koa routting of the application
 */
const Router = require('koa-router');

const router = new Router();
const { Rhinoceroses } = require('./rhinoceros');
const { RhinoRules } = require('./utils/RhinoRules');

const rhinos = new Rhinoceroses();
const RhinoRuleInstant = new RhinoRules();

/**
 * route that returns every rhinoceros or
 * a filtered part of the rhinoceros based
 * on the paramaters
 */
router.get('/rhinoceros', (ctx, next) => {
  try {
    const { query } = ctx.request;
    const allRhinocerosFiltered = rhinos.filterRhinosByGivenParams(query);
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
    let retrievedRhinoObject = rhinos.getRhinoById(id);
    if (retrievedRhinoObject === undefined)
      retrievedRhinoObject = RhinoRuleInstant.createRhinoMissingObject();

    ctx.response.body = retrievedRhinoObject;
    next();
  } catch (error) {
    ctx.throw(500, error);
  }
});

/**
 * route that return all the rhinos sepecies that are endangered
 */
router.get('/endangered', (ctx, next) => {
  try {
    ctx.response.body = rhinos.findEndangeredRhinos();
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
    const { isRuleBroken, errorMessage } =
      RhinoRuleInstant.areAnyParameterRulesBroken(body);

    if (isRuleBroken) {
      ctx.throw(400, errorMessage);
      return;
    }
    ctx.response.body = rhinos.newRhinoceros(body);
    next();
  } catch (error) {
    ctx.throw(500, error);
  }
});

module.exports = router;
