
const { NlpManager } = require('node-nlp');
const corpus = require('./corpus.json');

const manager = new NlpManager({ languages: ['en'] });

const trainModel = async () => {
    console.log('Training NLU model...');
    await manager.addCorpus(corpus);
    await manager.train();
    console.log('NLU model trained.');
};

const processText = async (text) => {
    const result = await manager.process('en', text);
    return result;
};

trainModel();

module.exports = { processText };
