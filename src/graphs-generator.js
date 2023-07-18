const argv = require('yargs').argv;
const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(
    path.resolve(__dirname, '../output')
);


let bestFitnessValue = 0;
if (argv.bestValueSoFar) {
    bestFitnessValue = argv.bestValueSoFar;
}

const highlanderPerGeneration = [];
const bestValuePerTestRound = [];
console.log(files)
for (var fileName of files) {
    if (fileName.startsWith('generated') || fileName.startsWith('output_best')) {
        const content = fs.readFileSync(
            path.resolve(__dirname, "../output/" + fileName)
        ).toString();

        var data = [];
        data.push(fileName);
        content.split(',').forEach((x) => {
            data.push(parseFloat(x));
        });

        if (fileName.startsWith('generated')) {
            highlanderPerGeneration.push(data);
        } else {
            bestValuePerTestRound.push(data);
        }
    }
}


const handlebars = require('handlebars');

// set up your handlebars template
var source = fs.readFileSync(path.resolve(__dirname, './template.hb')).toString();

// compile the template
var template = handlebars.compile(source);

// call template as a function, passing in your data as the context
console.log(bestValuePerTestRound)
var outputString = template({
    graphs: [
        {
            id: 'highlanderPerGeneration',
            data: JSON.stringify(highlanderPerGeneration),
            title: 'High lander Per Generation',
            bestFitnessValue
        },
        {
            id: 'bestValuePerTestRound',
            data: JSON.stringify(bestValuePerTestRound),
            title: 'Best Value Per Test Round',
            bestFitnessValue
        },
    ],
});

fs.writeFileSync(
    path.resolve(__dirname, '../output/output_graph.html'),
    outputString
);