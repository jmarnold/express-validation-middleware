const Validation = null;

const MyCustomRule = Validation.createRule(async (context) => {
    
});

const sampleValidation = {
    title: v.required().minLength(100).custom(MyCustomRule),
};