import {expect} from 'chai';
import helloWorld from '../../src';

describe('hello world function', function() {

  it('returns the correct string', function() {
    const r = helloWorld();
    expect(r).to.be.equal('hello world');
  });

});