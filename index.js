const repl = require('repl');

const getRandomNumber = () => Math.random();

const replServer = repl.start();

replServer.context.getRandomNumber = getRandomNumber;