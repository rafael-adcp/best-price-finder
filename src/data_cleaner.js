const moment = require('moment');
const fs = require('fs');
const GeneticAlgorithm = require('./lib/GeneticAlgorithm');
const argv = require('yargs').argv;
const _ = require('lodash');
const execSync = require('child_process').execSync;
const path = require('path');
const rimraf = require("rimraf");

function readOriginalSet() {
    //TODO: receber via cli
    return JSON.parse(
        fs.readFileSync(
            path.resolve(__dirname , "../inputs/base_poc.json")
        ).toString()
    );
}

//the set only need to be read once since it wont change at all
const originalDataset = readOriginalSet();


// as of now the base is { "item": [ {store1: price1}, {store2: price2}]
// we want to transpose so we know all cards sold by a given store so we can eliminate stores where we would be paying
// to muuhc on mailing
var store_dataset = {};
for(var item in originalDataset) {
    for (var store of originalDataset[item]) {
        
        
        const store_name = _.keys(store)[0];
        
        const price = _.find(originalDataset[item], (o) => {
            return _.keys(o)[0] == store_name;
        });

        
        if (!store_dataset[store_name]) {
            store_dataset[store_name] = 0;
        }
        store_dataset[store_name] += price[_.keys(price)[0]];
    }
}

const stores_to_remove = [];
for(var store_name in store_dataset) {
    const price = store_dataset[store_name];
    if (price <= 15) {
        console.log(`should remove "${store_name}" because its inventory price ${price} are not worth the postoffice fee`)
        stores_to_remove.push(store_name);
    }
}

const output = {};
for(var final_item in originalDataset) {
    output[final_item] = [];
    for (var possible_store of originalDataset[final_item]) {
        
        const store_name = _.keys(possible_store)[0];
        
        if (stores_to_remove.indexOf(store_name) == -1) {
            let obj = {};
            const obj_with_price = _.find(originalDataset[final_item], (o) => {
                return _.keys(o)[0] == store_name;
            });
            obj[store_name] = obj_with_price[_.keys(obj_with_price)[0]];;
            output[final_item].push(obj)
        } else {
            console.log(`ignored ${store_name}`)
        }
    }
}

fs.writeFileSync("cleaned_dataset.json", JSON.stringify(output, null, 2))


