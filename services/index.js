const express = require('express');
const faker = require('faker');

const app = express();

app.get('/:cpf', (req, res) => {
  res.status(200).json({
    cpf: req.params.cpf,
    name: faker.name.findName(),
    dateBirthday: faker.date.past(),
  });
});

app.listen(8080, () => console.info('Listen port 8080'));
