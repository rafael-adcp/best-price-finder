const qtdeItems = 20;
const qrdeStores = qtdeItems;
let database = {};
let storeToHaveBestPrice = 1;

for (var i = 1; i <= qtdeItems; i++) {
    const itemName = `item_${i}`
    database[itemName] = [];
    for (var j = 1; j <= qrdeStores; j++) {
        const storeName = `store_${j}`;

        let price = storeToHaveBestPrice == j ? Math.random() : Math.random() + 100;
        database[itemName].push(
            {
                [storeName]: price
            }
        );
    }
    storeToHaveBestPrice++;
}

console.log(JSON.stringify(database, null, ' '))