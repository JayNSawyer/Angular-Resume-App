'use strict';

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

let HashService = require('../services/hashService');


let salt = '$2a$10$5eyaPZln8WikoFkLoeU0Ve';
let password = 'MyPassword';
let hash = '$2a$10$5eyaPZln8WikoFkLoeU0Ve3anvMRQvpFBKQK2TvY3hfuo3dLoj/vm';


describe('HashService', () => {
	it('generates a salt', (done) => {
		HashService.setSalt().then((salt) => {
			expect(salt).to.be.a('string');
			expect(salt).to.have.length.of.at.least(16);
			done();
		});
	});

	it('creates a hash from a password and salt', (done) => {
		HashService.createHash(password, salt).then((hash) => {
			expect(hash).to.be.a('string');
			expect(hash).to.have.length.of.at.least(16);
			expect(hash).to.not.equal(password);
			done();
		});
	});

	it('calls comparePasswordToHash and returns true if password matches hash', (done) => {
		HashService.comparePasswordToHash(password, hash).then((res) => {
			expect(res).to.be.true;
			done();
		});
	});

});