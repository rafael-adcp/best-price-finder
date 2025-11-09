const fs = require("fs");
const path = require("path");
const _= require('lodash');

const highlanders = require(path.resolve(
  __dirname,
  "../output/highlanders_test_name.json"
));

(async function () {
  let shopping_cart = {}
  const highlander = highlanders[0].cart;
  for(var card in highlander) {
    const store_name = _.keys(highlander[card])[0]
    if (!shopping_cart[store_name]) {
        shopping_cart[store_name] = []
    }
    shopping_cart[store_name].push(card)
  }

  console.log(shopping_cart)
})();
