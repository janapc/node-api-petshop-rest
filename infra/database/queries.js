const connection = require('./connection');

const execQuery = (query, parameters = '') => new Promise((resolve, reject) => {
  connection.query(query, parameters, (err, results) => {
    if (err) reject(err);
    else resolve(results);
  });
});

module.exports = execQuery;
