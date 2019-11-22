const _ = require('lodash');
const fs = require('fs');

module.exports = class GeneticAlgorithm {
    init(dataSet, populationNumber, maximumGenerations, name) {
        this.dataSet = dataSet;
        this.populationNumber = populationNumber;
        this.population = [];
        this.maximumGenerations = maximumGenerations;
        this.highLanders = [];
        this.bestHighLanderFitness = Number.MAX_SAFE_INTEGER;
        this.metrics = [];
        this.generationName = name;
    }

    generateSubject() {
        const subject = {};
        for (var item in this.dataSet) {
            //choosing a random store from the options
            const randomChoice = _.random(0, this.dataSet[item].length - 1);
            subject[item] = this.dataSet[item][randomChoice];
        }
        return subject;
    }

    generatePopulation() {
        for (var i = 0; i <= this.populationNumber; i++) {

            this.population.push(
                this.generateSubject()
            );
        }
    }

    calculateFitness(subject) {
        var stores = [];
        var prices = [];
        for (var item in subject) {
            const obj = subject[item];
            const store = Object.keys(obj)[0];
            const price = obj[store];

            if (!_.includes(stores, store)) {
                stores.push(store);
            }
            prices.push(price);
        }
        const shippingPrice = 10;
        return (shippingPrice * (stores.length)) + _.sum(prices);
    }

    start() {
        this.generatePopulation();
        var generationsCreated = 0;
        do {
            //console.log(`\n\ngeneration: ${generationsCreated}`)
            var result = [];
            for (var pos in this.population) {
                const subject = this.population[pos];

                //storing just the position to save memory for big data sets
                result.push({
                    position: pos,
                    price: this.calculateFitness(subject)
                });
            }

            const currentHighlanders = this.selectHighLanders(
                _.sortBy(result, (o) => {
                    return o.price;
                })
            );

            //generating new population
            let newPopulation = [];
            //inserting highlander into the new population
            newPopulation.push(currentHighlanders[0])


            // console.log('doing crossOver 12')
            newPopulation.push(
                //crossover first grabbing things from second
                this.crossOver(currentHighlanders[0], currentHighlanders[1])
            )



            // console.log('doing crossOver 21')
            newPopulation.push(
                //crossover second grabbing things from first
                this.crossOver(currentHighlanders[1], currentHighlanders[0])
            );


            const subjectsToGenerate = this.populationNumber - newPopulation.length;
            for (var i = 1; i <= subjectsToGenerate; i++) {
                let subject;
                //making it 50/50 chance to either generate a complete random subject
                //or to just mutate current highlander
                if (_.random(0, 1)) {
                    subject = this.generateSubject();

                    //another 50/50 chance to grab a random property from the highlaner
                    if (_.random(0, 1)) {
                        for (var item in this.dataSet) {
                            if (_.random(0, 1)) { // 50/50 chance to grab a propertry from highlander
                                //choosing a random store from the options
                                // console.log("was")
                                // console.log(subject[item])
                                // console.log("become")
                                // console.log(currentHighlanders[0][item])

                                subject[item] = currentHighlanders[0][item];
                            }
                        }
                    }
                } else { // mutating highlander
                    subject = _.cloneDeep(currentHighlanders[0]);
                    //making it 50/50 wether to keep parent attribute or to mutate it
                    for (var item in this.dataSet) {
                        if (_.random(0, 1)) {
                            //choosing a random store from the options
                            const randomChoice = _.random(0, this.dataSet[item].length - 1);
                            subject[item] = this.dataSet[item][randomChoice];
                        }
                    }
                }

                newPopulation.push(subject)
            }

            this.population = newPopulation;

            generationsCreated++;

        } while (generationsCreated <= this.maximumGenerations); //this can be either a generation amount or a criterea
        /*
    If you run the algorithm just one:

    using a generation amount provides a more finite amount of times this will run and prevent us from discarding a eventual highlander (explained below)

    using a fitness criterea eg, do while fitness > 10 (assuming that the optimal highlander contains the lowest fitness), 
    if it finds 9 it will stop running, however there might be better highlanders.
    */

        const sortedHighLanders = _.sortBy(this.highLanders, (o) => {
            return o.price;
        });

        fs.writeFileSync(`generated_highlanders_on_${this.generationName}`, this.metrics);

        return JSON.stringify(sortedHighLanders[0], null, ' ');
    }

    crossOver(originalA, originalB) {
        // console.log('\n\nORIGINAL A')
        // console.log(originalA)
        // console.log('-------------------------------------------\noriginal B')
        // console.log(originalB)
        var crossOverA = _.cloneDeep(originalA);

        for (var item in originalA) {
            //witha  50% chance im copying property from B to A
            if (_.random(0, 1)) {
                //console.log(`will cross over B to A changing ${item} from ${JSON.stringify(crossOverA[item], null, ' ')} to ${JSON.stringify(originalB[item], null, ' ')}`)
                crossOverA[item] = originalB[item];
            }
        }


        // console.log('-------------------------------------------\n crossover A')
        // console.log(crossOverA)
        // console.log('-------------------------------------------')

        return crossOverA;
    }

    selectHighLanders(set) {
        const subjects = [];
        //finding 2 best subjects so that we can mutate it
        for (var i = 0; i < 2; i++) {
            subjects.push(this.population[set[i].position]);
        }

        this.metrics.push(set[0].price);
        //prevent using memory for worse subjects
        if (set[0].price <= this.bestHighLanderFitness) {
            // console.log(`found a highlander worse storing, changing from ${this.bestHighLanderFitness} to ${set[0].price}`)
            this.bestHighLanderFitness = set[0].price;
            //saving high lander
            this.highLanders.push(
                {
                    price: set[0].price,
                    cart: subjects[0]
                }
            )

        }
        return subjects;
    }
};