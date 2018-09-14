const Context = require('./ValidationContext');
const Notification = require('./ValidationNotification');
const Registry = require('./ValidationRegistry');

class Validator {
  constructor(rules) {
    this.rules = rules;
  }

  async validate(target, req) {
    const promises = [];
    const root = new Notification();

    this.rules.forEach((_) => {
      const templateContext = {};
      const keys = Object.keys(target);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        templateContext[key] = target[key];
      }

      const ruleKeys = Object.keys(_.rule);
      for (let i = 0; i < ruleKeys.length; i++) {
        const key = ruleKeys[i];
        if (typeof (_.rule[key]) !== 'function') {
          templateContext[key] = _.rule[key];
        }
      }

      const context = new Context(_.field, _.label, templateContext, root, req);
      const value = _.rule.validate(context);

      const promise = new Promise(async (resolve) => {
        await value;

        resolve();
      });

      promises.push(promise);
    });

    await Promise.all(promises);

    return root;
  }
}

class ValidationMiddleware {
  define(configure) {
    const registry = new Registry();
    configure(registry);

    const validator = new Validator(registry.rules);
    return (req, res, next) => {
      const target = req.params || {};
      const keys = Object.keys(req.body);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        target[key] = req.body[key];
      }

      const query = req.query || {};
      Object.keys(query).forEach((key) => {
        target[key] = req.query[key];
      });

      validator.validate(target, req).then((notification) => {
        if (notification.isValid()) {
          next();
          return;
        }

        res.status(400);
        res.send({
          errors: notification.allMessages().map(_ => _.toPayload()),
        });
      });
    };
  }
}

module.exports = new ValidationMiddleware();
