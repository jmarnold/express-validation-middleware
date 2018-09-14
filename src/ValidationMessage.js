class ValidationMessage {
  constructor(field, label, token, context) {
    this.field = field;
    this.label = label;
    this.token = token;
    this.context = context;
  }

  toHash() {
    return `${this.field}:${this.token.key}`;
  }

  toString() {
    let message = this.token.toString().replace('{field}', this.label);
    const keys = Object.keys(this.context);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      message = message.replace(`{${key}}`, this.context[key]);
    }

    return message;
  }

  toPayload() {
    return {
      field: this.field,
      label: this.label.toString(),
      message: this.toString(),
    };
  }
}

module.exports = ValidationMessage;
