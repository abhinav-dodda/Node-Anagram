const { isAnagram, cleanString } = require('../utils');

describe('Tests the utils functions', () => {
  it('tests the cleanString function', () => {
    const pattern = /[^\w]/g;
    const stringA = 'Loaded with fire!'
    const stringB = stringA.replace(pattern,'').toLowerCase().split('').sort().join();
    const stringC = 'This is a test string';

    const result = cleanString(stringA);
    expect(result).toMatch(stringB);
    expect(result).not.toMatch(stringC);
  });

  it('tests the isAnagram function', () => {
    const stringA = 'mary';
    const stringB = 'army';
    const stringC = 'mango';

    const resultAB = isAnagram(stringA, stringB);
    const resultAC = isAnagram(stringA, stringC);
    expect(resultAB).toBeTruthy();
    expect(resultAC).toBeFalsy();
  });
});
