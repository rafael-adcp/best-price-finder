const moment = require('moment');
const fs = require('fs');
const GeneticAlgorithm = require('./lib/GeneticAlgorithm');
const uuid = require('uuid/v1');
const argv = require('yargs').argv

function calculatePossiblePermutations(dataSet) {
    let permutations = 1;
    for (var item in dataSet) {
        permutations = permutations * dataSet[item].length;
    }
    return permutations;
}

function readOriginalSet() {
    //TODO: receber via cli
    return JSON.parse(fs.readFileSync('../inputs/base_poc.json').toString())
}

const totalPolutationToGenerate = 1000; //TODO: read from cli param
const maximumGenerationsToGenerate = 1000; //TODO: read from CLI
if(!argv.fileName){
    throw new Error('Parameter --fileName is missing')
}
const fileName = argv.fileName;

//the set only need to be read once since it wont change at all
const originalDataset = readOriginalSet();

//todo: read \/ from cli param?
let bestPrice = Number.MAX_SAFE_INTEGER; //assigning some huge big number

console.log(`TOTAL:
    population to generate: ${totalPolutationToGenerate}
    available permutations: ${calculatePossiblePermutations(originalDataset)}
    maximum generations: ${maximumGenerationsToGenerate}`
);
//todo fazer ele rodar, chamar pra gerar os graficos e depois remover todos os arquivos q ele criou no meio do caminho
var outputs = [];
const testTime = moment();
for (var testRound = 0; testRound <= 100; testRound++) {
    var startTime = moment();
    const geneticAlgorithm = new GeneticAlgorithm();
    let currentPopulationBestPrice;


    geneticAlgorithm.init(
        originalDataset,
        totalPolutationToGenerate,
        maximumGenerationsToGenerate,
        `testRound_${fileName}_${testRound}`);

    let result;
    try {
        result = geneticAlgorithm.start();
        currentPopulationBestPrice = JSON.parse(result).price;
        outputs.push(currentPopulationBestPrice);
        if (currentPopulationBestPrice <= bestPrice) {
            //console.log(`found a new best price, changing from ${bestPrice} to ${currentPopulationBestPrice}\n\n`);
            let calculated = geneticAlgorithm.calculateFitness(JSON.parse(result).cart);
            if (calculated != currentPopulationBestPrice) {
                console.log(calculated)
                console.log(bestPrice)
                throw new Error('womp whomp')
            }
            bestPrice = currentPopulationBestPrice;
            //console.log(result);
            //instead of writing a file each time, store into a variable and write it on HERE
            // fs.writeFileSync(`output_${currentPopulationBestPrice}_${uuid()}.json`, result);
        }
    } catch (e) {
        console.log('#########################');
        console.log('something weird happend');
        console.log(e);
        console.log(result);
        console.log('#########################');
    } finally {
        //HERE> just write the file with the best output ONCE
        console.log(`took: ${moment().diff(startTime, 'seconds', true)} seconds`);
    }
}

fs.writeFileSync(`output_best_finding_per_testRound_${fileName}.json`, outputs);
console.log(`total run took: ${moment().diff(testTime, 'seconds', true)} seconds`);
