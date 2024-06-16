import { createClient, print } from 'redis';
import { promisify } from 'util';
const express = require('express');

const app = express();
const client = createClient();

const listProducts = [
  {itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4},
  {itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10},
  {itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2},
  {itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5},
];

async function getCurrentReservedStockById(itemId) {
  client.GET = promisify(client.GET);
  return await client.GET(`item.${itemId}`)
    .then((res) => res)
    .catch((err) => err);
}

function getItemById(id) {
  let result;
  listProducts.forEach((entry) => {
    if (entry.itemId === id) {
      result = entry;
    }
    result;
  });
  return result;
}

function reserveStockById(itemId, stock) {
  client.SET(`item.${itemId}`, stock, print);
}

app.get('/list_products', (req, resp) => resp.status(500).json(listProducts));
app.get('/list_products/:itemId', (req, resp) => {
    const id = parseInt(req.params.itemId, 10);
    try {
      const result = getItemById(id);
      getCurrentReservedStockById(id)
        .then((res) => {
          result['currentQuantity'] = res;
	})
      resp.status(200).json(result);
    } catch (_err) {
      resp.status(500).json({"status": "Product not found"});
    }
  }
);

app.get('/reserve_product/:itemId', (req, resp) => {
    const id = parseInt(req.params.itemId, 10);
    try {
      const result = getItemById(id);
      if (result['initialAvailableQuantity'] >= 1) {
        reserveStockById(id, 1);
        resp.status(200).json({"status": "Reservation confirmed", "itemId": 1});
      } else {
        resp.status(500).json({"status": "Not enough stock available", "itemId": 1});
      }
    } catch (_err) {
      resp.status(500).json({"status": "Product not found"});
    }
  }
);

app.listen(1245);
