/**
 * @title: const1.js
 * @author: Javier Olaya
 * @date: 9/8/2021
 * @description: contains all the constant values of the application
 */

const allowSpeciesTable = new Set();
allowSpeciesTable.add('white_rhinoceros');
allowSpeciesTable.add('black_rhinoceros');
allowSpeciesTable.add('indian_rhinoceros');
allowSpeciesTable.add('javan_rhinoceros');
allowSpeciesTable.add('sumatran_rhinoceros');

const name = 'Clyde';
const species = 'white_rhinoceros';
const nameSpeciesRhinoExpected = {
  name,
  species
};

const filteredRhinoWhiteRhinocerosExpected = [
  {
    id: '08da0048-c5a0-4722-8ec6-75b9b1b046e3',
    name: 'Clyde',
    species: 'white_rhinoceros'
  },
  {
    id: '70314997-b314-4a30-b5bc-1ed9fbd030c8',
    name: 'Clydette',
    species: 'white_rhinoceros'
  },
  {
    id: '3ec7086a-3770-4c41-ac4e-c3139f7b1b5d',
    name: 'Winston',
    species: 'white_rhinoceros'
  },
  {
    id: '8704bbcb-9073-42e4-a3c7-07444dd44bc0',
    name: 'Spike',
    species: 'white_rhinoceros'
  }
];

module.exports = {
  allowSpeciesTable,
  name,
  species,
  nameSpeciesRhinoExpected,
  filteredRhinoWhiteRhinocerosExpected
};
