const {v4:uuidv4} = require('uuid');
let rhinoceroses = require('./data');

exports.getAll = () => {
  return rhinoceroses;
};
exports.getRhinoById =  (id) => {
  const rhino =  rhinoceroses.find((rhino)=>{
    const rhId = rhino.id;
    if( rhId === id) return true;
    return false;
  });

  return rhino;
};

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
      value,
    })
  );
  return endangeredSpeciesArray;
};

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

exports.newRhinoceros = data => {
  const newRhino = {
    id: uuidv4(),
    name: data.name,
    species: data.species,
  };
  rhinoceroses.push(newRhino);
  return newRhino;
};
