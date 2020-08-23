const request = require('supertest');

describe('loading express', function () {
  let server;
  beforeEach(function () {
    server = require('./server');
  });
  afterEach(function () {
    server.close();
  });
  it('responds to /video/list', function (done) {
    request(server).get('/video/list').expect(200, done);
  });
  it('should return 404 for nonexistent routes', function (done) {
    request(server).get('/nothinghere').expect(404, done);
  });
  it('should return 404 if a nonexistent file is requested', function (done) {
    request(server).get('/video/nonexistentfile').expect(404, done);
  });
});
