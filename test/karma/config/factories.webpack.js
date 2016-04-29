var context = require.context("../", true, /_factory\.js$/);
context.keys().forEach(context);
