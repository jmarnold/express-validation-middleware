const chai = require('chai');
const { parseRules } = require('../src/RuleParser');

const { expect } = chai;

describe('RuleParser', () => {
  it('Parses required rules', () => {
    const rules = parseRules({
      title: {
        required: true,
      },
      name: {
        required: true,
      },
      email: {
      },
    });

    expect(rules.length).to.equal(2);
    expect(rules[0].field).to.equal('title');
    expect(rules[1].field).to.equal('name');
  });

  it('Parses email rules', () => {
    const rules = parseRules({
      email: {
        email: true,
      },
    });

    expect(rules.length).to.equal(1);
    expect(rules[0].field).to.equal('email');
  });

  it('Parses min length rules', () => {
    const rules = parseRules({
      password: {
        minLength: 8,
      },
    });

    expect(rules.length).to.equal(1);
    expect(rules[0].field).to.equal('password');
    expect(rules[0].rule.length).to.equal(8);
  });
});
