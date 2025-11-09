# Introduction
This project leverages a Genetic Algorithm to find the best shopping cart.

Based on a dataset containing items, and their price into different stores with the following shape, it will apply Genetic Algorithm principes to find the best combination of items / stores where the purchase should be made.

```
{
    "item1": [
        {
            "store1": 0.2
        },
        {
            "store3": 0.9
        },
        {
            "store5": 0.2
        }
    ],
    "item2": [
        {
            "store1": 0.5
        },
        {
            "store2": 10
        },
        {
            "store3": 0.3
        }
    ],
    "item3": [
        {
            "store1": 2
        },
        {
            "store3": 3
        },
        {
            "store5": 1.90
        }
    ]
}
```

# Running
```
npm start will handle it all, but if you want you can call things separetely (refer to package.json for up to data instructions)

but at a high level its essentially
node src/index.js --testName test_name --population 5000 --generations 1000 --runs 100
node src/gerar_carrinho_de_compra.js
```

# Genetic Algorithm Flow
<image src = "./diagram/flow.png"></image>