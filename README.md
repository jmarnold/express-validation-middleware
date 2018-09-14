# ExpressJS Validation Middleware 

Simple and composable validation (w/ localization support) that's easy to expose as middleware for your existing ExpressJS endpoints.


## Installation

Using npm:
```
npm install expressjs-validation-middleware --save
```

## Example Usage

For the simplest possible scenario, you can configure your rules and use them as middleware for an existing express route using the following:

```js
const { Validate } = require('expressjs-validation-middleware');

const createUserRules = {
  firstName: {
    required: true,
  },
  lastName: {
    required: true,
  },
  email: {
    required: true,
    email: true,
    // custom: [uniqueEmail],
  },
};

// ...assuming you've created an instance of express()
app.post('/users', Validate(createUserRules), (req, res) => {
  res.status(200);
  res.send({});
});
```

As noted in the example above, you can also specify custom validation rules. Here's a sample of a custom validation rule for validating unique emails:

```js
const { StringToken } = require('expressjs-validation-middleware');
const uniqueEmail = {
  validate(context) {
    if (context.isEmpty()) {
      return Promise.resolve(true);
    }

    // We can also make this an async function and do something like:
    // const isUnique = await emailService.isEmailUnique(email);
    return new Promise((resolve) => {
      const email = context.value();
      if (email === 'in-use@app.com') {
        // This is making use of the localization abstraction module
        context.registerMessage(new StringToken('emailInUse', '"{email}" is already in use'));
      }

      resolve(true);
    });
  },
};
```

The above example makes use of the `StringToken` class. When you do a `toString()` on an instance of this class, it calls out to the localization provider (exported from this package as `Localization`); For examples on how to override how the localization provider resolves text, check out the unit tests in `Localization.test.js`.

## License

ISC
