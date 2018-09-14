const chai = require('chai');
const { Provider, StringToken } = require('../src/Localization');
const i18n = require('i18n');

const { expect } = chai;
const { Required } = require('../src/ValidationKeys');

describe('Localization', () => {
  afterEach(() => {
    Provider.clear();
  });

  it('Resolves the default value', () => {
    const token = new StringToken('TEST', 'The default value');
    expect(Provider.valueFor(token)).to.equal('The default value');
  });

  it('Uses the localized values', () => {
    i18n.configure({
      directory: `${__dirname}/locales`,
    });

    Provider.resolveWith(token => i18n.__(token.key));

    expect(Provider.valueFor(Required)).to.equal('This field IS ABSOLUTELY NECESSARY');
  });

  it('Resolves the label token', () => {
    const labelToken = Provider.createLabelToken('somethingSimple');
    expect(labelToken.key).to.equal('somethingSimple');
    expect(labelToken.defaultValue).to.equal('Something Simple');
  });

  it('Uses the configured label token resolver', () => {
    Provider.resolveLabelTokensWith(() => new StringToken('Case:Title', 'My custom value'));
    const labelToken = Provider.createLabelToken('somethingSimple');
    expect(labelToken.key).to.equal('Case:Title');
    expect(labelToken.toString()).to.equal('My custom value');
  });
});
