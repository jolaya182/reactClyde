/* global test, expect, describe, afterAll  */
const request = require('supertest');
const server = require('../server');
const rhinoData = require('../data');

afterAll(() => {
  server.close();
});

describe('testing 4 basic routes', () => {
  test('get route with no filters should return and array of rhino objects', async () => {
    const arrayOfRhinoObjectsReceived = await request(server).get(
      '/rhinoceros'
    );
    // console.log(
    //   'arrayOfRhinoObjectsReceived',
    //   arrayOfRhinoObjectsReceived.body
    // );
    expect(arrayOfRhinoObjectsReceived.body).toStrictEqual(rhinoData);
  });
});
