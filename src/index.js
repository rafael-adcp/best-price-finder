const moment = require('moment');
const fs = require('fs');
const GeneticAlgorithm = require('./lib/GeneticAlgorithm');
const uuid = require('uuid/v1');

function readOriginalSet() {
    return JSON.parse(fs.readFileSync('../inputs/basic_sample.json').toString());
    //return JSON.parse(fs.readFileSync('../inputs/basic_sample.json').toString())
}

const totalPolutationToGenerate = 10000; //TODO: read from cli param
const maximumGenerationsToGenerate = 100; //TODO: read from CLI

//the set only need to be read once since it wont change at all
const originalDataset = readOriginalSet();

//todo: read \/ from cli param?
let bestPrice = Number.MAX_SAFE_INTEGER; //assigning some huge big number
for (var testRound = 0; testRound <= 1000; testRound++) {
    var startTime = moment();
    const geneticAlgorithm = new GeneticAlgorithm();
    let currentPopulationBestPrice;


    geneticAlgorithm.init(
        originalDataset,
        totalPolutationToGenerate,
        maximumGenerationsToGenerate);
    // console.log(
    //     `
    // TOTAL:
    //     population to generate: ${totalPolutationToGenerate}
    //     available permutations: ${geneticAlgorithm.calculatePossiblePermutations()}
    //     maximum generations: ${geneticAlgorithm.maximumGenerations}`
    // )

    let result;
    try {
        result = geneticAlgorithm.start();
        currentPopulationBestPrice = JSON.parse(result).price;
        if (currentPopulationBestPrice <= bestPrice) {
            console.log(`found a new best price, changing from ${bestPrice} to ${currentPopulationBestPrice}`);
            bestPrice = currentPopulationBestPrice;
            fs.writeFileSync(`output_${currentPopulationBestPrice}_${uuid()}.json`, result);
        }
    } catch (e) {
        console.log('#########################');
        console.log('#########################');
        console.log('#########################');
        console.log('something weird happend');
        console.log(e);
        console.log(result);
    } finally {
        console.log(`took: ${moment().diff(startTime, 'seconds', true)} seconds`);
    }
}
