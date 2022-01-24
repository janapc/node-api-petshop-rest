const query = require('../infra/database/queries');

class Attendance {
  add(attendance) {
    const sql = 'INSERT INTO Attendances SET ?';

    return query(sql, attendance);
  }

  show() {
    const sql = 'SELECT * FROM Attendances';

    return query(sql);
  }

  find(id) {
    const sql = `SELECT * FROM Attendances WHERE id=${id}`;

    return query(sql, id);
  }

  update(values, id) {
    const sql = 'UPDATE Attendances SET ? WHERE id=?';

    return query(sql, [values, id]);
  }

  remove(id) {
    const sql = 'DELETE FROM Attendances WHERE id=?';

    return query(sql, id);
  }
}

module.exports = new Attendance();
