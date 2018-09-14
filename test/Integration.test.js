const express = require('express');
const chai = require('chai');
const request = require('supertest');
const bodyParser = require('body-parser');
const {
  StringToken,
  Validate,
} = require('../index');

const { expect } = chai;

describe('Integration Tests', () => {
  let app;

  beforeEach(() => {
    app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const uniqueEmail = {
      async validate(context) {
        if (context.isEmpty()) {
          return Promise.resolve(true);
        }

        return new Promise((resolve) => {
          const email = context.value();
          if (email === 'in-use@app.com') {
            context.registerMessage(new StringToken('emailInUse', '"{email}" is already in use'));
          }

          resolve(true);
        });
      },
    };

    const createUserRules = {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      email: {
        required: true,
        email: true,
        custom: [uniqueEmail],
      },
    };

    app.post('/users', Validate(createUserRules), (req, res) => {
      res.status(200);
      res.send({});
    });
  });

  it('Validates required fields', async () => {
    const payload = {
      // firstName: '',
      // lastName: '',
      // email: '',
    };

    const { body, statusCode } = await request(app).post('/users').send(payload);
    expect(statusCode).to.equal(400);
    expect(body.errors.length).to.equal(3);
    expect(body.errors[0].field).to.equal('firstName');
    expect(body.errors[1].field).to.equal('lastName');
    expect(body.errors[2].field).to.equal('email');
  });

  it('Validates email fields', async () => {
    const payload = {
      firstName: 'Test',
      lastName: 'User',
      email: 'invalid@',
    };

    const { body, statusCode } = await request(app).post('/users').send(payload);
    expect(statusCode).to.equal(400);
    expect(body.errors.length).to.equal(1);
    expect(body.errors[0].field).to.equal('email');
    expect(body.errors[0].label).to.equal('Email');
    expect(body.errors[0].message).to.equal('Please enter a valid email address');
  });

  it('Executes the custom rule', async () => {
    const payload = {
      firstName: 'Test',
      lastName: 'User',
      email: 'in-use@app.com',
    };

    const { body, statusCode } = await request(app).post('/users').send(payload);
    expect(statusCode).to.equal(400);
    expect(body.errors.length).to.equal(1);
    expect(body.errors[0].field).to.equal('email');
    expect(body.errors[0].label).to.equal('Email');
    expect(body.errors[0].message).to.equal('"in-use@app.com" is already in use');
  });
});
