/**
 * @title: rhinoceros.js
 * @author: Javier Olaya
 * @date: 9/7/2021
 * @description: model that holds all the data and functions pertaining to the rhinoceros model
 */
const { v4: uuidv4 } = require('uuid');
const rhinoceroses = require('./data');

/**
 * gets all the rhinoceros data
 *
 * @return {object}
 */
exports.getAll = () => {
  return rhinoceroses;
};

/**
 * finds the specific rhino by id
 *
 * @param {integer} id
 * @return {object}
 */
exports.getRhinoById = (id) => {
  const rhin = rhinoceroses.find((rhino) => {
    const rhId = rhino.id;
    if (rhId === id) return true;
    return false;
  });

  return rhin;
};

/**
 * searches for all endangered rhinos
 *
 * @return {array}
 */
exports.findEndangeredRhinos = () => {
  const endangeredSpecies = new Map();
  const speciesCount = new Map();

  rhinoceroses.forEach((rhino) => {
    const rhinoSpecies = rhino.species;
    if (speciesCount.has(rhinoSpecies)) {
      const currentRhinoCount = speciesCount.get(rhinoSpecies) + 1;
      endangeredSpecies.set(rhinoSpecies, currentRhinoCount);
      speciesCount.set(rhinoSpecies, currentRhinoCount);
      if (currentRhinoCount > 2) {
        if (endangeredSpecies.has(rhinoSpecies))
          endangeredSpecies.delete(rhinoSpecies);
      }
      return;
    }
    endangeredSpecies.set(rhinoSpecies, 1);
    speciesCount.set(rhinoSpecies, 1);
  });
  const endangeredSpeciesArray = Array.from(endangeredSpecies).map(
    ([key, value]) => ({
      key,
      value
    })
  );
  return endangeredSpeciesArray;
};

/**
 * filter function that
 * searches for all the rhinoceros with the criteria given by parameters
 *
 * @param {object} query
 * @return {array}
 */
exports.filterRhinosByGivenParams = (query) => {
  let allRhinoceros = [...rhinoceroses];
  const allParameters = Object.keys(query);
  let filteredRhinceros = [];

  allParameters.forEach((props) => {
    filteredRhinceros = allRhinoceros.filter(
      (rhino) => rhino[props] === query[props]
    );
    allRhinoceros = filteredRhinceros;
  });
  return allRhinoceros;
};

/**
 * creates a new rhino object
 *
 * @param {object} data
 * @return {object}
 */
exports.newRhinoceros = (data) => {
  const newRhino = {
    id: uuidv4(),
    name: data.name,
    species: data.species
  };
  rhinoceroses.push(newRhino);
  return newRhino;
};
