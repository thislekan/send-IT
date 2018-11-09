import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';

process.env.NODE_ENV = 'test';

const request = supertest(app);
const apiVersion = '/api/v1/';

describe('Home route', () => {
  it('Should return a proper welcome message', (done) => {
    request.get('/')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body.message)).to.equal('string');
        expect(response.body.message).to.equal('Welcome to the send-IT service.');
        done();
      });
  });
});

describe('Create user', () => {
  it('Should create a user', (done) => {
    const email = 'abc@email.com';
    const passowrd = 'abcdef';
    request.post(`${apiVersion}user/create`)
      .send({ email, passowrd })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body.email)).to.equal('string');
        expect(response.body.email).to.equal(email);
        done();
      });
  });
});


// describe('Creating a user account', () => {
//   it('Should create an account with the provided details', () => {
//     const email = 'abc@email.com';
//     const password = '123456';
//     request(app)
//       .post(`${apiVersion}user/create`)
//       .send({ email, password })
//       .expect(201)
//       .expect((res) => {
//         expect(res.email === email);
//       });
//   });
// });

// describe('Creating a user account with invalid email', () => {
//   it('Should return an error', () => {
//     const email = 'abcemail';
//     const password = '123456';
//     request(app)
//       .post(`${apiVersion}user/create`)
//       .send({ email, password })
//       .expect(400)
//       .expect((res) => {
//         expect(res.error).toBeTruthy();
//       });
//   });
// });

// describe('Creating a user account with short password', () => {
//   it('Should return an error', () => {
//     const email = 'abc@email.com';
//     const password = '12345';
//     request(app)
//       .post(`${apiVersion}user/create`)
//       .send({ email, password })
//       .expect(201)
//       .expect((res) => {
//         expect(res.error).toContain();
//       });
//   });
// });
