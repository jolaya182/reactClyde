/* eslint-disable class-methods-use-this */
/**
 * @title: utils.js
 * @author: Javier Olaya
 * @date: 9/8/2021
 * @description: all the resuable functions throughout the application
 */
const { allowSpeciesTable } = require('../const/const');

/**
 * determines if the rhino found is true
 *
 * @param {object} rhino
 * @return {boolean}
 */
exports.createRhinoMissingObject = () => {
  const rhinoNotFound = {
    id: -1,
    name: 'name not registered',
    species: 'species not registered'
  };
  return rhinoNotFound;
};

/**
 * @param {object} body
 * @return {boolean}
 */
const isNameInParametersMissing = (name) => {
  if (name) return false;
  return true;
};

/**
 * @param {string} name
 * @return {boolean}
 */
const doesNameBrakeCharactersLimit = (name) => {
  if (name === undefined) return true;
  if (name.length <= 20 && typeof name === 'string') return false;
  return true;
};

/**
 * @param {object} body
 * @return {boolean}
 */
const isSpeciesInParametersMissing = (body) => {
  const { species } = body;
  if (species) return false;
  return true;
};

/**
 * @param {string} species
 * @return {boolean}
 */
const doesSpeciesBreakCorrectSyntax = (species) => {
  if (allowSpeciesTable.has(species)) return false;
  return true;
};

/**
 * @param {object} body
 * @return {boolean}
 */
const areParametersBreakingNameSpeciesOnlyRule = (body) => {
  const bodykeys = Object.keys(body);
  if (bodykeys.length === 0) return true;
  const isBodyBreakingNameAndSpeciesOnlyRule = bodykeys.every((props) => {
    return props === 'name' || props === 'species';
  });
  if (isBodyBreakingNameAndSpeciesOnlyRule) return false;
  return true;
};

/**
 * checks that the parameters received comply with all
 * the rules of the application
 *
 * @param {object} rhino
 * @return {object}
 */
exports.areAnyParameterRulesBroken = (rhinoBody) => {
  const { name, species } = rhinoBody;
  const areRulesBrokenObject = { isRuleBroken: true, errorMessage: '' };

  if (isNameInParametersMissing(name)) {
    areRulesBrokenObject.errorMessage = `The 'name' syntax is missing.\n 
      Please have the 'name' contained within the parameters`;
    return areRulesBrokenObject;
  }
  if (doesNameBrakeCharactersLimit(name)) {
    areRulesBrokenObject.errorMessage = `The name has 20 more characters then permitted. \n
    please write a name between 1 - 20 characters`;
    return areRulesBrokenObject;
  }

  if (isSpeciesInParametersMissing(rhinoBody)) {
    areRulesBrokenObject.errorMessage = `The 'species' syntax is missing.\n 
    Please have the 'species' contained within the parameters`;
    return areRulesBrokenObject;
  }
  if (doesSpeciesBreakCorrectSyntax(species)) {
    areRulesBrokenObject.errorMessage = `The context in'species' is incorrect.\n 
    Please write the correct syntax allowed in 'species' within the parameters`;
    return areRulesBrokenObject;
  }
  if (areParametersBreakingNameSpeciesOnlyRule(rhinoBody)) {
    areRulesBrokenObject.errorMessage = `There are parameters that do not match 'name' or 'species' syntax .\n 
    Please have 'names' and 'species' only within the parameters`;
    return areRulesBrokenObject;
  }
  areRulesBrokenObject.isRuleBroken = false;
  return areRulesBrokenObject;
};
