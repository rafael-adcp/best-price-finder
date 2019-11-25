const fs = require('fs');
const _ = require('lodash');
const files = fs.readdirSync('./');
//const bestFitnessValue = 210.1044121;
//receber viaCLI
//const bestFitnessValue = 525.7529436;
//se receber preenche else 0
const bestFitnessValue = 0;


const highlanderPerGeneration = [];
const bestValuePerTestRound = [];
for (var fileName of files) {
    if (fileName.startsWith('generated') || fileName.startsWith('output_best')) {
        const content = fs.readFileSync(fileName).toString();
        var data = [];
        data.push(fileName);
        content.split(",").forEach((x) => {
            data.push(parseFloat(x))
        });

        if (fileName.startsWith('generated')) {
            highlanderPerGeneration.push(data)
        } else {
            bestValuePerTestRound.push(data);
        }
    }
}



const handlebars = require('handlebars');




// set up your handlebars template
var source = fs.readFileSync('template.hb').toString();

// compile the template
var template = handlebars.compile(source);

// call template as a function, passing in your data as the context
console.log(bestValuePerTestRound)
var outputString = template(
    {
      highlanderPerGeneration: JSON.stringify(highlanderPerGeneration),
        bestValuePerTestRound: JSON.stringify(bestValuePerTestRound),
        bestFitnessValue
    }
);

fs.writeFileSync("output_graph.html", outputString);