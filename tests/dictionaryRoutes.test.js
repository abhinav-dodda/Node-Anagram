const request = require('supertest');
const server = require('../app');

describe('Test the dictionary routes', () => {
    it('tests the GET /list url', async (done) => {
        const response = await request(server).get('/dict/list');
        expect(response.body.length).toBe(274926);
        expect(response.status).toBe(200);
        expect(response.body[0]).toBe('aa');
        expect(response.body[response.body.length-1]).toBe('zzzs');
        done();
    });

    it('tests the POST /add url', async (done) => {
        const StringArray1 = [ 'alllllllll'];
        const response = await request(server).post('/dict/add').send(StringArray1);

        // wordList is a global variable
        expect(wordList).toContain('alllllllll');
        expect(response.text).toContain('alllllllll');
        expect(response.status).toBe(200);

        done();
    });

    it('tests the POST /remove url', async (done) => {
        const StringArray1 = [ 'aa'];
        const response = await request(server).post('/dict/remove').send(StringArray1);

        // wordList is a global variable
        expect(wordList).not.toContain('aa');
        expect(response.text).toContain('aa');
        expect(response.status).toBe(200);

        done();

    });
})
