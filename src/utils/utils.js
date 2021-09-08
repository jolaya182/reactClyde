/**
 * @title: utils.js
 * @author: Javier Olaya
 * @date: 9/8/2021
 * @description: all the resuable functions throughout the application
 */
const { allowSpeciesTable, allowedNameTable } = require('../const/const1');

/**
 * determines if the rhino found is true
 *
 * @param {object} rhino
 * @return {boolean}
 */
const isRhinoByIdFound = (rhino) => {
  if (rhino) {
    return rhino;
  }
  const rhinoNotFound = {
    id: -1,
    name: 'name not registered',
    species: 'species not registered'
  };
  return rhinoNotFound;
};

/**
 * checks the rhino object properties to see if they
 * include name and species
 *
 * @param {object} rhinoObject
 * @param {boolean} isFilterOff
 * @return {boolean}
 */
const IsRulePropertyNameSpeciesEnforced = (rhinoObject, isFilterOff) => {
  const properties = Object.keys(rhinoObject);

  let arePropertiesValid = false;
  arePropertiesValid = properties.every((prop) => allowedNameTable.has(prop));
  if (properties.length < allowedNameTable.size && isFilterOff)
    arePropertiesValid = false;
  return arePropertiesValid;
};

/**
 * checks to see if the species names of the given
 * rhino matches with the correct names accepted by the application
 *
 * @param {object} rhinoObject
 * @return {boolean}
 */
const IsRuleNameSpeciesValuesEnforced = (rhinoObject) => {
  let areSpeciesNamesAllowed = false;
  if (allowSpeciesTable.has(rhinoObject.species)) {
    areSpeciesNamesAllowed = true;
    return areSpeciesNamesAllowed;
  }
  return areSpeciesNamesAllowed;
};

/**
 * checks if the length of the name to the
 * rhinoceros is within 20 charaters and is
 * a valid string
 *
 * @param {object} rhinoObject
 * @param {boolean} isFilterOff
 * @return {boolean}
 */
const isRuleNameLengthOfCharactersValidEnforced = (
  rhinoObject,
  isFilterOff
) => {
  const { name } = rhinoObject;
  let numberOfCharactersValid = false;
  if (!isFilterOff && !name) return true;
  if (name.length <= 20 && typeof name === 'string') {
    numberOfCharactersValid = true;
    return numberOfCharactersValid;
  }
  return numberOfCharactersValid;
};

/**
 * helper function to throw errors
 *
 * @param {string} message
 * @param {object} ctx
 */
const errorThrower = (message, ctx) => {
  ctx.throw(400, message);
};

/**
 * checks that the parameters received comply with all
 * the rules of the application
 *
 * @param {object} rhino
 * @param {boolean} isFilterOff
 * @return {boolean}
 */
const areAllRulesBroken = (rhino, isFilterOff) => {
  const isBodyPropertiesCorrect = IsRulePropertyNameSpeciesEnforced(
    rhino,
    isFilterOff
  );
  if (!isBodyPropertiesCorrect)
    return `Rule Property Name Species is not Enforced.\n 
      Properties have to be and written as the \n following 'name' and 'species' `;

  const isBodyContentCorrect = IsRuleNameSpeciesValuesEnforced(rhino);
  if (!isBodyContentCorrect)
    return `Rule Name Species Values is not Enforced.\n 
      Species submitted is not within the permissible species,\n 
      please write another species that is allowed`;

  const isNameNumberOfCharactersValid =
    isRuleNameLengthOfCharactersValidEnforced(rhino, isFilterOff);
  if (!isNameNumberOfCharactersValid)
    return `Rule Name Number Of Characters is not Valid.\n 
        The name submitted is not within the permissible number of characters,\n 
        please write a name between 1 - 20 characters`;

  return false;
};

/**
 * determines is given id is found
 *
 * @param {interger} id
 * @return {boolean}
 */
const isIdMissing = (id) => {
  const message = `missing id parameter,\n please provide a rhino id`;
  if (!id) return message;
  return false;
};

module.exports = {
  isRhinoByIdFound,
  areAllRulesBroken,
  isIdMissing,
  errorThrower
};
