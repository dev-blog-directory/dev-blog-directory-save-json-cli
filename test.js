'use strict';

const fs = require('fs-extra');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;
const main = require('dev-blog-directory-save-json-cli');

describe('dev-blog-directory-save-json-cli', () => {
  before(() => {
    return fs
      .remove('./documents')
      .then(() => {
        console.log('remove ./documents success!');
      })
      .catch((error) => {
        console.error(error);
      });
  });

  it('module should to be a function', () => {
    expect(main).to.be.a('function');
  });

  it('should throw an error', () => {
    return expect(main()).to.be.rejected;
  });

  it('should throw a SyntaxError', () => {
    return expect(main('test.js')).to.be.rejectedWith(SyntaxError);
  });

  it('should not throw an error', () => {
    return expect(main('test.json')).to.be.fulfilled;
  });

  it('duplicated url', () => {
    return expect(main('test.json')).to.be.rejectedWith('Duplicated url');
  });

  it('with merge option', () => {
    return expect(main('test.json', { merge: true })).to.be.fulfilled;
  });
});
