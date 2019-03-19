const request = require('supertest');
const server = require('../app');

describe('Test the anagram routes', () => {
  it('tests the GET /find route', async (done) => {
    const response = await request(server).get('/find?word=mary');
    expect(response.body).toContain('army');
    expect(response.status).toBe(200);

    const responseWithoutWord = await request(server).get('/find');
    expect(responseWithoutWord.body).toEqual({});
    expect(responseWithoutWord.text).toMatch('Please provide a valid word');
    expect(responseWithoutWord.status).toBe(400);
    done();
  });

  it('tests the GET /compare route', async (done) => {
    const stringA = 'mary';
    const stringB = 'army';
    const stringC = 'test';
    
    const URL1 = `/compare?word1=${stringA}&word2=${stringB}`;
    const URL2 = `/compare?word1=${stringA}&word2=${stringC}`
    const response1 = await request(server).get(URL1);

    expect(response1.body).toBeTruthy();
    expect(response1.status).toBe(200);

    const response2 = await request(server).get(URL2);

    expect(response2.body).toBeFalsy();
    expect(response2.status).toBe(200);

    const URL3 = `/compare`;

    const responseWithoutWords = await request(server).get(URL3);
    expect(responseWithoutWords.body).toEqual({});
    expect(responseWithoutWords.text).toMatch('Please provide a valid first word');
    expect(responseWithoutWords.status).toBe(400);

    done();
  });

  it('tests the GET /find-longest route', async (done) =>{
    const longestAnagrams = [["microphotographies","photomicrographies"],["pathophysiological","physiopathological"]];

    const response = await request(server).get('/find-longest');
    expect(response.body).toEqual(longestAnagrams);
    expect(response.status).toBe(200);  
    done();
  });
});
