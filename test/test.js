import supertest from 'supertest';
import { expect } from 'chai';
import app from '../server/app';

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

describe('Log in user before creating account', () => {
  it('Should return an error', (done) => {
    const email = 'email@user.com';
    const password = 'hfreyuer';
    request.post(`${apiVersion}user/login`)
      .send({ email, password })
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(typeof (response.body.error)).to.equal('string');
        expect(response.body.error).to.equal('Login credentials not found. please sign up');
        done();
      });
  });
});

describe('Create Parcel Order before user is created', () => {
  it('Should return an error', (done) => {
    const pickup = 'somolu';
    const destination = 'yaba';
    request.post(`${apiVersion}parcels`)
      .send({ pickup, destination })
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error).to.equal('User not authorized to create parcel. Please sign up.');
        done();
      });
  });
});

describe('Get user parcels before user is created', () => {
  it('Should return an error', (done) => {
    request.get(`${apiVersion}users/${userid}/parcels`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error).to.equal('No parcel record exist on the Database yet.');
        done();
      });
  });
});

describe('Cancel user parcel before parcel is created', () => {
  it('Should return an error', (done) => {
    request.put(`${apiVersion}parcels/${parcelId}/cancel`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error)
          .to.equal('No parcel record exist on the Database yet.');
        done();
      });
  });
});

describe('Create user without email and password', () => {
  it('Should return an error', (done) => {
    const email = '';
    const password = '';
    request.post(`${apiVersion}user/create`)
      .send({ email, password })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body.error)).to.equal('string');
        expect(response.body.error).to.equal('Email and password are required.');
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

describe('Create user with already existing email', () => {
  it('Should return an error', (done) => {
    const email = 'abc@email.com';
    const password = 'urehreb';
    request.post(`${apiVersion}user/create`)
      .send({ email, password })
      .end((error, response) => {
        expect(response.status).to.equal(403);
        expect(typeof (response.body.error)).to.equal('string');
        expect(response.body.error).to.equal('The user already exist.');
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

describe('Log in user without email or password', () => {
  it('Should return an error', (done) => {
    const email = '';
    const password = '';
    request.post(`${apiVersion}user/login`)
      .send({ email, password })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(typeof (response.body.error)).to.equal('string');
        expect(response.body.error).to.equal('Password and Email required to log in.');
        done();
      });
  });
});

describe('Get all parcel before parcel is created', () => {
  it('Should return an error', (done) => {
    request.get(`${apiVersion}parcels/`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error).to.be.equal('No parcel record found.');
        done();
      });
  });
});

describe('Get parcel by Id before parcel is created', () => {
  it('Should return an error', (done) => {
    request.get(`${apiVersion}parcels/${parcelId}`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error).to.equal('No parcel record exist in Database');
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
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        done();
      });
  });
});

describe('Get parcel by Id', () => {
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

describe('Get parcels with non existent Id', () => {
  it('Should return an error', (done) => {
    request.get(`${apiVersion}parcels/ABL8-U`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(typeof (response.body.error)).to.equal('string');
        expect(response.body.error).to.equal('Parcel with ID: ABL8-U not found');
        done();
      });
  });
});

describe('Get user parcels', () => {
  it('Should return all parcels created by user', (done) => {
    request.get(`${apiVersion}users/${userid}/parcels`)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body[0].id).to.equal(parcelId);
        done();
      });
  });
});

describe('Get user parcels with non existing Id', () => {
  it('Should return all parcels created by user', (done) => {
    request.get(`${apiVersion}users/ab0Ihn/parcels`)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error)
          .to.equal('No parcel record for the user exist');
        done();
      });
  });
});

describe('Cancel user parcels with wrong parcelId', () => {
  it('Should return an error', (done) => {
    request.put(`${apiVersion}parcels/${userid}/cancel`)
      .set('userid', userid)
      .end((error, response) => {
        expect(response.status).to.equal(404);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error)
          .to.equal(`No parcel with ID: ${userid} was found`);
        done();
      });
  });
});

describe('Cancel user parcels with wrong userId', () => {
  it('Should return an error', (done) => {
    request.put(`${apiVersion}parcels/${parcelId}/cancel`)
      .set('userid', 'userid')
      .end((error, response) => {
        expect(response.status).to.equal(401);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.error)
          .to.equal('You are not authorized to change this parcel');
        done();
      });
  });
});

describe('Cancel user parcels', () => {
  it('Should return specific canceled parcel', (done) => {
    request.put(`${apiVersion}parcels/${parcelId}/cancel`)
      .set('userid', userid)
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        expect(response.body.message)
          .to.equal('Parcel succefully canceled');
        expect(response.body.parcel.id).to.equal(parcelId);
        done();
      });
  });
});
