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
  isRhinoByIdFound,
  areAllRulesBroken,
  isIdMissing,
  errorThrower
} = require('./utils/utils');

/**
 * route that returns every rhinoceros or
 * a filtered part of the rhinoceros data
 *
 */
router.get('/rhinoceros', (ctx) => {
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

/**
 * route that finds the rhinoceros by Id
 *
 */
router.get('/rhinocerosID', (ctx) => {
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

/**
 * route that return all the rhinos sepecies that are endangered
 *
 *
 */
router.get('/endangered', (ctx) => {
  try {
    ctx.response.body = model.findEndangeredRhinos();
  } catch (error) {
    ctx.throw(500, error);
  }
});

/**
 * route that allows inserts of rhino objects to the json data object
 *
 */
router.post('/rhinoceros', (ctx) => {
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
