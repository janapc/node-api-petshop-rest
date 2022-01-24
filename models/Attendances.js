const moment = require('moment');

const repositories = require('../repositories/Attendance');

class Attendances {
  constructor() {
    this.dateValid = ({ date, createdAt }) => moment(date).isSameOrAfter(createdAt);
    this.clientValid = ({ length }) => length >= 5;
    this.validation = [
      {
        name: 'date',
        valid: this.dateValid,
        message: 'Date must be greater than or equal to current date',
      },
      {
        name: 'client',
        valid: this.clientValid,
        message: 'Client must be at least 5 characters',
      },
    ];

    this.valid = (parameters) => this.validation.filter((field) => {
      const { name } = field;
      const parameter = parameters[name];

      return !field.valid(parameter);
    });
  }

  add(attendance) {
    const createdAt = moment().format('YYYY-MM-DD HH:MM:SS');
    const date = moment(attendance.date, 'DD/MM/YYYY').format(
      'YYYY-MM-DD HH:MM:SS',
    );

    const parameters = {
      date: { date, createdAt },
      client: { length: attendance.client.length },
    };

    const errors = this.valid(parameters);

    if (errors.length) {
      return Promise.reject(errors);
    }
    const attendanceWithDate = { ...attendance, createdAt, date };

    return repositories
      .add(attendanceWithDate)
      .then((result) => ({ ...attendance, id: result.insertId }));
  }

  show() {
    return repositories.show();
  }

  find(id) {
    return repositories.find(id);
  }

  update(id, values) {
    let newValues = {};
    if (values.date) {
      const newDate = moment(values.date, 'DD/MM/YYYY').format(
        'YYYY-MM-DD HH:MM:SS',
      );
      newValues = { ...values, date: newDate };
    }

    return repositories.update(newValues, id);
  }

  remove(id) {
    return repositories.remove(id);
  }
}

module.exports = new Attendances();
