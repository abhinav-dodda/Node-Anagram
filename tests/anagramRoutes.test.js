const request = require('supertest');
const server = require('../app');

describe('Test the anagram routes', () => {
  it('tests the GET /find route', async (done) => {
    const response = await request(server).get('/find?word=mary');
    expect(response.body).toContain('army');
    expect(response.status).toBe(200);

    const responseWithoutWord = await request(server).get('/find');
    expect(response.body).toMatch('')
    done();
  });

  it('tests the GET /compare route', () => {

  });

  it('tests the GET /find-longest route', () =>{
      
  })
});
