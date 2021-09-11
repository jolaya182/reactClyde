/* global test, expect, describe, afterAll  */
const request = require('supertest');
const server = require('../server');
const rhinoData = require('../data');
const {
  name,
  species,
  nameSpeciesRhinoExpected,
  filteredRhinoWhiteRhinocerosExpected
} = require('../const/const');

afterAll(() => {
  server.close();
});

describe('testing 4 basic routes', () => {
  test('get route with no filters should return and array of rhino objects', async () => {
    const arrayOfRhinoObjectsReceived = await request(server).get(
      '/rhinoceros'
    );
    expect(arrayOfRhinoObjectsReceived.body).toStrictEqual(rhinoData);
  });

  test('get route that gets rhinoceros with filters', async () => {
    let filteredRhinoObjectsReceived = await request(server).get(
      `/rhinoceros/?name=${name}&species=${species}`
    );
    delete filteredRhinoObjectsReceived.body[0].id;
    expect(filteredRhinoObjectsReceived.body).toStrictEqual([
      nameSpeciesRhinoExpected
    ]);

    filteredRhinoObjectsReceived = await request(server).get(
      `/rhinoceros/?name=${name}`
    );
    delete filteredRhinoObjectsReceived.body[0].id;
    expect(filteredRhinoObjectsReceived.body).toStrictEqual([
      nameSpeciesRhinoExpected
    ]);

    filteredRhinoObjectsReceived = await request(server).get(
      `/rhinoceros/?species=${species}`
    );
    console.log(
      'filteredRhinoObjectsReceived',
      filteredRhinoObjectsReceived.body
    );

    expect(filteredRhinoObjectsReceived.body).toStrictEqual(
      filteredRhinoWhiteRhinocerosExpected
    );
  });

  test(`Post route that inserts a rhino object to the json object
   and get route that gets rhinoceros by ID`, async () => {
    const createdRhinoObjectsReceived = await request(server)
      .post('/rhinoceros')
      .send(nameSpeciesRhinoExpected);

    const receivedRhino = createdRhinoObjectsReceived.body;
    const receivedRhinoCopy = { ...receivedRhino };
    delete receivedRhino.id;
    expect(receivedRhino).toStrictEqual(nameSpeciesRhinoExpected);

    // here we can test the created rhinobject
    const foundRhinoObjectById = await request(server).get(
      `/rhinocerosId/?id=${receivedRhinoCopy.id}`
    );

    expect(foundRhinoObjectById.body).toStrictEqual(receivedRhinoCopy);
  });

  test.only('get route that gets rhinoceros that are endangered', async () => {
    const endangeredRhinosExpected = [
      {
        species: 'indian_rhinoceros',
        name: 1
      }
    ];
    const endageredRhinoArrayReceived = await request(server).get(
      '/endangered'
    );
    console.log('endageredRhinoArrayReceived', endageredRhinoArrayReceived);
    expect(endageredRhinoArrayReceived.body).toStrictEqual(
      endangeredRhinosExpected
    );
  });
});
