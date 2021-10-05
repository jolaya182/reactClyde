/**
 * @title: rhinoceros.js
 * @author: Javier Olaya
 * @date: 9/7/2021
 * @description: model that holds all the data and functions pertaining to the rhinoceros model
 */
const { v4: uuidv4 } = require('uuid');
const rhinosData = require('./data');

/**
 * gets all the rhinoceros data
 *
 * @return {object}
 */
getAll = () => {
  return rhinosData;
};

/**
 * finds the specific rhino by id
 *
 * @param {integer} id
 * @return {object}
 */
exports.getRhinoById = (id) => {
  const rhin = rhinosData.find((rhino) => id === rhino.id);

  return rhin;
};

/**
 * searches for all endangered rhinos
 *
 * @return {array}
 */
exports.findEndangeredRhinos = () => {
  const speciesCount = new Map();

  rhinosData.forEach((rhino) => {
    const { species } = rhino;
    if (speciesCount.has(species)) {
      speciesCount.set(species, speciesCount.get(species) + 1);
      return;
    }
    speciesCount.set(species, 1);
  });

  const endangeredSpecies = rhinosData.filter((rhino) => {
    const { species } = rhino;
    return !(speciesCount.get(species) > 2);
  });

  return endangeredSpecies;
};

/**
 * filter function that
 * searches for all the rhinoceros with the criteria given by parameters
 *
 * @param {object} query
 * @return {array}
 */
exports.filterRhinosByGivenParams = (query) => {
  const allRhinoceros = [...rhinosData];
  const allParameters = Object.keys(query);

  const filteredRhinceros = allRhinoceros.filter((rhino) =>
    allParameters.every((props) => rhino[props] === query[props])
  );
  return filteredRhinceros;
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
  rhinosData.push(newRhino);
  return newRhino;
};
