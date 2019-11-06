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

# Genetic Algorithm Flow
<image src = "./diagram/flow.png"></image>