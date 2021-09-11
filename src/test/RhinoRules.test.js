/* global test, expect, describe  */
// eslint-disable-next-line import/extensions
const { RhinoRules } = require('../utils/RhinoRules');

const rhinoRulesInstant = new RhinoRules();

test('createRhinoMissingObject should return an object with  negative and prop names that not registered', () => {
  const createdRhinoMissingObjectReceived =
    rhinoRulesInstant.createRhinoMissingObject();
  const RhinoMissingObjectExpected = {
    id: -1,
    name: 'name not registered',
    species: 'species not registered'
  };
  expect(createdRhinoMissingObjectReceived).toEqual(RhinoMissingObjectExpected);
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

describe.each(rhinoTestObjects1)(
  'areAnyParameterRulesBroken should test a valid rhino on 6 functions',
  (rhinoBody) => {
    const { name, species } = rhinoBody;

    test('areAnyParameterRulesBroken for the parameters should return true', () => {
      const receivedTestObject =
        rhinoRulesInstant.areAnyParameterRulesBroken(rhinoBody);
      expect(receivedTestObject.isRuleBroken).toBe(false);
    });

    test('isNameInParametersMissing name should return true', () => {
      const receivedBoolean = rhinoRulesInstant.isNameInParametersMissing(name);
      expect(receivedBoolean).toBe(false);
    });

    test('doesNameBrakeCharactersLimit', () => {
      const receivedBoolean =
        rhinoRulesInstant.doesNameBrakeCharactersLimit(name);
      expect(receivedBoolean).toBe(false);
    });

    test('isSpeciesInParametersMissing', () => {
      const receivedBoolean =
        rhinoRulesInstant.isSpeciesInParametersMissing(rhinoBody);
      expect(receivedBoolean).toBe(false);
    });

    test('doesSpeciesBreakCorrectSyntax', () => {
      const receivedBoolean =
        rhinoRulesInstant.doesSpeciesBreakCorrectSyntax(species);
      expect(receivedBoolean).toBe(false);
    });

    test('areParametersBreakingNameSpeciesOnlyRule', () => {
      const receivedBoolean =
        rhinoRulesInstant.areParametersBreakingNameSpeciesOnlyRule(rhinoBody);
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

describe.each(rhinoTestObjects2)(
  'areAnyParameterRulesBroken should test a non-valid rhino on 6 functions',
  (rhinoBody) => {
    const { name, species } = rhinoBody;

    test('areAnyParameterRulesBroken for the parameters should return true', () => {
      const receivedTestObject =
        rhinoRulesInstant.areAnyParameterRulesBroken(rhinoBody);
      expect(receivedTestObject.isRuleBroken).toBe(true);
    });

    test('isNameInParametersMissing name should return true', () => {
      const receivedBoolean = rhinoRulesInstant.isNameInParametersMissing(name);
      expect(receivedBoolean).toBe(true);
    });

    test('doesNameBrakeCharactersLimit', () => {
      const receivedBoolean =
        rhinoRulesInstant.doesNameBrakeCharactersLimit(name);
      expect(receivedBoolean).toBe(true);
    });

    test('isSpeciesInParametersMissing', () => {
      const receivedBoolean =
        rhinoRulesInstant.isSpeciesInParametersMissing(rhinoBody);
      expect(receivedBoolean).toBe(true);
    });

    test('doesSpeciesBreakCorrectSyntax', () => {
      const receivedBoolean =
        rhinoRulesInstant.doesSpeciesBreakCorrectSyntax(species);
      expect(receivedBoolean).toBe(true);
    });

    test('areParametersBreakingNameSpeciesOnlyRule', () => {
      const receivedBoolean =
        rhinoRulesInstant.areParametersBreakingNameSpeciesOnlyRule(rhinoBody);
      expect(receivedBoolean).toBe(true);
    });
  }
);
