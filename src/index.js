const moment = require('moment');
const fs = require('fs');
const GeneticAlgorithm = require('./lib/GeneticAlgorithm');
const argv = require('yargs').argv;
const _ = require('lodash');
const execSync = require('child_process').execSync;
const path = require('path');
const rimraf = require("rimraf");

console.log('cleaning output directory!')
const outputPath = path.resolve(__dirname, "../output");
if (fs.existsSync(outputPath)) {
    rimraf.sync(outputPath);
}
fs.mkdirSync(outputPath);


function calculatePossiblePermutations(dataSet) {
    let permutations = 1;
    for (var item in dataSet) {
        permutations = permutations * dataSet[item].length;
    }
    return permutations;
}

function readOriginalSet() {
    //TODO: receber via cli
    return JSON.parse(
        fs.readFileSync(
            path.resolve(__dirname , "../inputs/base_poc.json")
        ).toString()
    );
}


if (!argv.testName) {
    throw new Error('Parameter --testName is missing');
}

if (!argv.population) {
    throw new Error('Parameter --population is missing');
}

if (!argv.generations) {
    throw new Error('Parameter --generations is missing');
}

if (!argv.runs) {
    throw new Error('Parameter --runs is missing');
}

const totalPolutationToGenerate = argv.population;
const maximumGenerationsToGenerate = argv.generations;
const testName = argv.testName;
const runs = argv.runs;

//the set only need to be read once since it wont change at all
const originalDataset = readOriginalSet();

let bestPrice = Number.MAX_SAFE_INTEGER; //assigning some huge big number

console.log(`TOTAL:
    population to generate: ${totalPolutationToGenerate}
    maximum generations: ${maximumGenerationsToGenerate}
    available permutations: ${calculatePossiblePermutations(originalDataset)}`
);

var bestPricePerPopulation = [];
var highlanders = [];

const testTime = moment();
for (var testRound = 0; testRound <= runs; testRound++) {
    var startTime = moment();
    const geneticAlgorithm = new GeneticAlgorithm();
    let currentPopulationBestPrice;


    geneticAlgorithm.init(
        originalDataset,
        totalPolutationToGenerate,
        maximumGenerationsToGenerate,
        `testRound_${testName}_${testRound}`);

    let result;
    try {
        result = geneticAlgorithm.start();
        currentPopulationBestPrice = JSON.parse(result).price;
        bestPricePerPopulation.push(
            currentPopulationBestPrice
        );
        if (currentPopulationBestPrice <= bestPrice) {
            // console.log(`found a new best price, changing from ${bestPrice} to ${currentPopulationBestPrice}\n\n`);
            highlanders.push(JSON.parse(result));

            let calculated = geneticAlgorithm.calculateFitness(JSON.parse(result).cart);
            if (calculated != currentPopulationBestPrice) {
                console.log(calculated)
                console.log(bestPrice)
                throw new Error('womp whomp')
            }
            bestPrice = currentPopulationBestPrice;
        }
    } catch (e) {
        console.log('#########################');
        console.log('something weird happend');
        console.log(e);
        console.log(result);
        console.log('#########################');
    } finally {
        console.log(`took: ${moment().diff(startTime, 'seconds', true)} seconds`);
    }
}

fs.writeFileSync(
    path.resolve(__dirname, `../output/output_best_price_per_population_${testName}.json`),
    JSON.stringify(bestPricePerPopulation, null, 2)
);

highlanders = _.sortBy(highlanders, (o) => { return o.price; })
fs.writeFileSync(
    path.resolve(__dirname, `../output/highlanders_${testName}.json`),
    JSON.stringify(highlanders, ' ', 2)
);

console.log(`total run took: ${moment().diff(testTime, 'seconds', true)} seconds`);
console.log('best highlander found: ' + highlanders[0].price);

const pathForGraphsGenerator = path.resolve(__dirname, "./graphs-generator.js");
const command = `node "${pathForGraphsGenerator}"${argv.bestValueSoFar ? "--bestValueSoFar " + argv.bestValueSoFar : ''}`;
console.log('>>'+command+"<<")
execSync(command);
