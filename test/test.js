import supertest from 'supertest';
import { expect } from 'chai';
import app from '../app';

process.env.NODE_ENV = 'test';

const request = supertest(app);
const apiVersion = '/api/v1/';
let userid;
let parcelId;

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
    const password = 'abcdef';
    request.post(`${apiVersion}user/create`)
      .send({ email, password })
      .end((error, response) => {
        userid = response.body.id;
        expect(response.status).to.equal(201);
        expect(typeof (response.body.email)).to.equal('string');
        expect(response.body.email).to.equal(email);
        done();
      });
  });
});

describe('Creating user with string', () => {
  it('Should return an error', (done) => {
    const email = 'abcemail';
    const password = 123456;
    request.post(`${apiVersion}user/create`)
      .send({ email, password })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body.error)).to.equal('string');
        expect(response.body.error).to.equal('Email invalid. Please signup with a valid email');
        done();
      });
  });
});

describe('Creating user with invalid password length', () => {
  it('Should return an error', (done) => {
    const email = 'abc@email.xom';
    const password = 763;
    request.post(`${apiVersion}user/create`)
      .send({ email, password })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body.error)).to.equal('string');
        expect(response.body.error).to.equal('The password needs to be 6 or more characters');
        done();
      });
  });
});

describe('Log in user', () => {
  it('Should log the user in', (done) => {
    const email = 'abc@email.com';
    const password = 'abcdef';
    request.post(`${apiVersion}user/login`)
      .send({ email, password })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body.email)).to.equal('string');
        expect(response.body.email).to.equal(email);
        done();
      });
  });
});

describe('Log in non existent user', () => {
  it('Should return an error', (done) => {
    const email = 'abcxy@email.com';
    const password = 'abcdef';
    request.post(`${apiVersion}user/login`)
      .send({ email, password })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body.error)).to.equal('string');
        expect(response.body.error).to.equal('The email or password is incorrect');
        done();
      });
  });
});

describe('Log in user with wrong password', () => {
  it('Should return an error', (done) => {
    const email = 'abc@email.com';
    const password = 'abcdefghn';
    request.post(`${apiVersion}user/login`)
      .send({ email, password })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body.error)).to.equal('string');
        expect(response.body.error).to.equal('The email or password is incorrect');
        done();
      });
  });
});

describe('Creates Parcel Order', () => {
  it('Should create a parcel order', (done) => {
    const pickup = 'somolu';
    const destination = 'yaba';
    request.post(`${apiVersion}parcels`)
      .send({ pickup, destination })
      .set('userid', userid)
      .end((error, response) => {
        parcelId = response.body.id;
        expect(response.status).to.equal(201);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.pickup).to.equal(pickup);
        done();
      });
  });
});

describe('Create parcel order with non existent user', () => {
  it('Should return an error', (done) => {
    const pickup = 'somolu';
    const destination = 'yaba';
    request.post(`${apiVersion}parcels`)
      .send({ pickup, destination })
      .set('userid', 'opojui')
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error).to.equal('User does not exist.');
        done();
      });
  });
});

describe('Get all parcel', () => {
  it('Should return all parcels', (done) => {
    request.get(`${apiVersion}parcels/`)
      // .set('userid', 'opojui')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        done();
      });
  });
});

describe('Get parcels by Id', () => {
  it('Should return a specific parcel', (done) => {
    request.get(`${apiVersion}parcels/${parcelId}`)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.id).to.equal(parcelId);
        done();
      });
  });
});
