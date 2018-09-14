let resolveValue = () => {
};

class StringToken {
  constructor(key, defaultValue) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  toString() {
    return resolveValue(this);
  }
}

class LocalizationManager {
  constructor() {
    this.clear();
  }

  valueFor(token) {
    return this.resolver(token);
  }

  resolveWith(resolver) {
    this.resolver = resolver;
  }

  resolveLabelTokensWith(tokenResolver) {
    this.tokenResolver = tokenResolver;
  }

  createLabelToken(key) {
    return this.tokenResolver(key);
  }

  clear() {
    this.cache = {};
    this.resolver = (token) => {
      let value = this.cache[token.key];
      if (typeof (value) === 'undefined') {
        value = token.defaultValue;
        this.cache[token.key] = value;
      }

      return value;
    };

    this.tokenResolver = (key) => {
      let defaultValue = '';
      for (let i = 0; i < key.length; i++) {
        const current = key[i];
        if (i === 0) {
          defaultValue += current.toUpperCase();
          continue;
        }

        if (current === current.toUpperCase()) {
          defaultValue += ' ';
        }

        defaultValue += current;
      }

      return new StringToken(key, defaultValue);
    };
  }
}

const localization = new LocalizationManager();
resolveValue = token => localization.valueFor(token);

module.exports = {
  Provider: localization,
  StringToken,
};
