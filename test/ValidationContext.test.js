const chai = require('chai');
const ValidationContext = require('../src/ValidationContext');
const ValidationNotification = new require('../src/ValidationNotification');

const { expect } = chai;

describe('ValidationContext', () => {
  it('Gets value from the target', () => {
    const context = new ValidationContext('title', { title: 'Test' });
    expect(context.get('title')).to.equal('Test');
  });

  it('Resolves the value of the field', () => {
    const context = new ValidationContext('title', { title: 'Test' });
    expect(context.value()).to.equal('Test');
  });

  it('Sets values in the store', () => {
    const store = {};
    const notification = new ValidationNotification();
    const context = new ValidationContext('title', { title: 'Test' }, notification, store);

    const value = { id: 'My Object' };
    context.set('test', value);

    expect(store.test).to.equal(value);
  });

  it('isSet (true)', () => {
    const context = new ValidationContext('title', { title: 'Test' });
    expect(context.isSet('title')).to.be.true;
  });

  it('isSet (false)', () => {
    const context = new ValidationContext('title', { status: 'Test' });
    expect(context.isSet('title')).to.be.false;
  });

  it('isEmpty (true)', () => {
    const context = new ValidationContext('title', { status: 'Test' });
    expect(context.isEmpty()).to.be.true;
  });

  it('isEmpty (false)', () => {
    const context = new ValidationContext('title', { title: 'Test' });
    expect(context.isEmpty()).to.be.false;
  });
});
