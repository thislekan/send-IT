// import expect from 'expect';
// import request from 'supertest';
// import describe from 'mocha';
// import chai from 'chai';
// import request from 'supertest';
// import app from '../app';
// import store from '../db/store';

// import assert from 'assert';

// var assert = require('assert');
// describe('Array', () => {
//   describe('#indexOf()', () => {
//     it('should return -1 when the value is not present', () => {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

// const {assert} = chai.assert;
// const {expect} = chai.expect;
// const {should} = chai.should;

// describe('GET /', () => {
//   it('Should welcome the user', (done) => {
//     request(app)
//       .get('/')
//       .expect(200)
//       .end(done);
//   });
// });

import request from 'supertest';
import app from '../server';

// console.log(app);

describe('homepage', () => {
  it('welcomes the user', (done) => {
    request(app).get('/')
      .expect(200, done);
  });
});
