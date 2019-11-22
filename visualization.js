
const fs = require('fs')
const _ = require('lodash')

const inputFile = JSON.parse(fs.readFileSync('./inputs/input_01.json').toString())

var newDataSet = {};

//identifying items and store to output data in another view
for (var item in inputFile) {
    for(var store of inputFile[item]){
        
        const price = store[Object.keys(store)[0]]
        const name = Object.keys(store)[0];
        
        if(!newDataSet[name]){
            newDataSet[name] = {}
        }
        newDataSet[name][item] = price
    }
}

console.log(JSON.stringify(newDataSet, null, ' '))