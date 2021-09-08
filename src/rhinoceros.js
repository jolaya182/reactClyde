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

  console.log("rhino", rhino);
  return rhino;
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
