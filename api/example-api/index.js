
exports.handler = async function (event, context) {
    try {
        // Check if lodash library is able to be used from the layer
        const _ = require('lodash');
        console.log("Lodash is working");
    } catch (err) {
        console.log("Lodash is not working");
    }
    console.log("Hello World");
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello World" }),
    };
  };