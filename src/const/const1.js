/**
 * @title: const1.js
 * @author: Javier Olaya
 * @date: 9/8/2021
 * @description: contains all the constant values of the application
 */
const allowedNameTable = new Set();
allowedNameTable.add('name');
allowedNameTable.add('species');

const allowSpeciesTable = new Set();
allowSpeciesTable.add('white_rhinoceros');
allowSpeciesTable.add('black_rhinoceros');
allowSpeciesTable.add('indian_rhinoceros');
allowSpeciesTable.add('javan_rhinoceros');
allowSpeciesTable.add('sumatran_rhinoceros');

module.exports = {
  allowSpeciesTable,
  allowedNameTable
};
