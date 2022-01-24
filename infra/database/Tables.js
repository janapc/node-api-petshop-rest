class Tables {
  init(connection) {
    this.connection = connection;

    this.createAttendances();
    this.createPets();
  }

  createAttendances() {
    const sql = 'CREATE TABLE IF NOT EXISTS Attendances (id int NOT NULL AUTO_INCREMENT, client varchar(11) NOT NULL, pet varchar(20), service varchar(20) NOT NULL, date datetime NOT NULL, createdAt datetime NOT NULL, status varchar(20) NOT NULL, observation text, PRIMARY KEY(id))';
    this.connection.query(sql, (err) => {
      if (err) console.error(err);
      else console.info('Table attendance create success!');
    });
  }

  createPets() {
    const sql = 'CREATE TABLE IF NOT EXISTS Pets (id int NOT NULL AUTO_INCREMENT, name varchar(50), image varchar(200), PRIMARY KEY(id))';
    this.connection.query(sql, (err) => {
      if (err) console.error(err);
      else console.info('Table Pets create success!');
    });
  }
}

module.exports = new Tables();
