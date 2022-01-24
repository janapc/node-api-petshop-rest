const customExpress = require('./config/customExpress');
const connection = require('./infra/database/connection');
const Tables = require('./infra/database/Tables');

connection.connect((err) => {
  if (err) console.error(err);
  else {
    console.info('connected');
    Tables.init(connection);
    const app = customExpress();

    app.listen(3000, () => console.info('Listen port 3000'));
  }
});
