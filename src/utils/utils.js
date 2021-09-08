const { allowSpeciesTable, allowedNameTable } = require('../const/const1');

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

const IsRulePropertyNameSpeciesEnforced = (rhinoObject, isFilterOff) => {
  const properties = Object.keys(rhinoObject);

  let arePropertiesValid = false;
  arePropertiesValid = properties.every((prop) => allowedNameTable.has(prop));
  if (properties.length < allowedNameTable.size && isFilterOff)
    arePropertiesValid = false;
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

const errorThrower = (message, ctx) => {
  ctx.throw(400, message);
};

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
