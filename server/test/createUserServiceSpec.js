'use strict';

let chai = require('chai');
let	expect = chai.expect;
let sinon = require('sinon');

let createUser = require('../services/createUserService')['createUser'];
let HashService = require('../services/hashService');


let req = {
	body: {
		firstname: 'Joe',
		lastname: 'James',
		email: 'joe@james.com',
		password: 'joepassword'
	}
};

describe('createUserService', () => {
	it('returns a new user from the request body', (done) => {
		createUser(req.body).then((user) => {
			expect(user.firstname).to.equal('Joe');
			done();
		});
	});
	
	it('hashes the user password', (done) => {
		createUser(req.body).then((user) => {
			expect(user.password).to.equal(undefined);
			expect(user.salt).to.be.ok;
			expect(user.passwordHash).to.be.ok;
			done();
		});
	});
	
	it('calls the setSalt method once', (done) => {
		let setSalt = sinon.spy(HashService, 'setSalt');
		createUser(req.body).then((user) => {
			expect(setSalt.called).to.be.true;
			done();
		});
	});
	
	it('calls the createHash method once', (done) => {
		let createHash = sinon.spy(HashService, 'createHash');
		createUser(req.body).then((user) => {
			expect(createHash.called).to.be.true;
			done();
		});
	});
	
});


