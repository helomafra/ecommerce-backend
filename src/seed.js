const knex = require('./database/knex');
const fs = require('fs');
const fastcsv = require('fast-csv');

const stream = fs.createReadStream(`${__dirname}/products.csv`);
const csvData = [];
const csvStream = fastcsv
  .parse()
  .on('data', function (data) {
    csvData.push(data);
  })
  .on('end', async function () {
    csvData.shift(); //remove o primeiro item do array (cabeçalho)

    //cada registro do csvData é um array de string
    for await (const [id, name, price, stock] of csvData) {
      await knex('products').insert({
        id: Number(id),
        name,
        price: Number(price),
        stock: Number(stock)
      });
    }

    process.exit(); //forçar encerramento do servidor node
  });

stream.pipe(csvStream);
