/* global test, expect, describe  */
const utils = require('../utils/utils');

test.skip('createRhinoMissingObject should return an object with  negative and prop names that not registered', () => {
  const createdRhinoMissingObjectReceived = utils.createRhinoMissingObject();
  //   console.log('createRhinoMissingObject', createdRhinoMissingObjectReceived);
  const RhinoMissingObjectExpected = {
    id: -1,
    name: 'name not registered',
    species: 'species not registered'
  };
  expect(createdRhinoMissingObjectReceived).toEqual(RhinoMissingObjectExpected);
});

test.skip('errorThrower should return an error', () => {
  //   const messageExpected = 'any text suffices';
  //   const messageReceived = utils.errorThrower('any text suffices');
  //   console.log('messageReceived', messageReceived);
});

const validRhinoBody1 = {
  name: 'javi',
  species: 'javan_rhinoceros'
};

const validRhinoBody2 = {
  name: 'Maria',
  species: 'white_rhinoceros'
};

const rhinoTestObjects1 = [validRhinoBody1, validRhinoBody2];

describe.skip.each(rhinoTestObjects1)(
  'areAnyParameterRulesBroken should test a valid rhino on 6 functions',
  (rhinoBody) => {
    const { name, species } = rhinoBody;

    test('areAnyParameterRulesBroken for the parameters should return true', () => {
      const receivedTestObject = utils.areAnyParameterRulesBroken(rhinoBody);
      // console.log('receivedTestObject', receivedTestObject);
      expect(receivedTestObject.isRuleBroken).toBe(false);
    });

    test('isNameInParametersMissing name should return true', () => {
      const receivedBoolean = utils.isNameInParametersMissing(name);
      // console.log('receivedTestObject', receivedTestObject);
      expect(receivedBoolean).toBe(false);
    });

    test('doesNameBrakeCharactersLimit', () => {
      const receivedBoolean = utils.doesNameBrakeCharactersLimit(name);
      //   console.log('receivedBoolean', receivedBoolean);
      expect(receivedBoolean).toBe(false);
    });

    test('isSpeciesInParametersMissing', () => {
      const receivedBoolean = utils.isSpeciesInParametersMissing(rhinoBody);
      expect(receivedBoolean).toBe(false);
    });

    test('doesSpeciesBreakCorrectSyntax', () => {
      const receivedBoolean = utils.doesSpeciesBreakCorrectSyntax(species);
      expect(receivedBoolean).toBe(false);
    });

    test.only('areParametersBreakingNameSpeciesOnlyRule', () => {
      const receivedBoolean =
        utils.areParametersBreakingNameSpeciesOnlyRule(rhinoBody);
      expect(receivedBoolean).toBe(false);
    });
  }
);

const nonValidRhinoBody = {
  nsame: 'aaaaaaaaaaaaaaaaaaaa2121',
  specises: undefined
};

const missingParametersRhinoBody = {};

const rhinoTestObjects2 = [nonValidRhinoBody, missingParametersRhinoBody];

describe.only.each(rhinoTestObjects2)(
  'areAnyParameterRulesBroken should test a non-valid rhino on 6 functions',
  (rhinoBody) => {
    const { name, species } = rhinoBody;

    test('areAnyParameterRulesBroken for the parameters should return true', () => {
      const receivedTestObject = utils.areAnyParameterRulesBroken(rhinoBody);
      // console.log('receivedTestObject', receivedTestObject);
      expect(receivedTestObject.isRuleBroken).toBe(true);
    });

    test('isNameInParametersMissing name should return true', () => {
      const receivedBoolean = utils.isNameInParametersMissing(name);
      // console.log('receivedTestObject', receivedTestObject);
      expect(receivedBoolean).toBe(true);
    });

    test('doesNameBrakeCharactersLimit', () => {
      const receivedBoolean = utils.doesNameBrakeCharactersLimit(name);
      //   console.log('receivedBoolean', receivedBoolean);
      expect(receivedBoolean).toBe(true);
    });

    test('isSpeciesInParametersMissing', () => {
      const receivedBoolean = utils.isSpeciesInParametersMissing(rhinoBody);
      expect(receivedBoolean).toBe(true);
    });

    test('doesSpeciesBreakCorrectSyntax', () => {
      const receivedBoolean = utils.doesSpeciesBreakCorrectSyntax(species);
      expect(receivedBoolean).toBe(true);
    });

    test('areParametersBreakingNameSpeciesOnlyRule', () => {
      const receivedBoolean =
        utils.areParametersBreakingNameSpeciesOnlyRule(rhinoBody);
      expect(receivedBoolean).toBe(true);
    });
  }
);
