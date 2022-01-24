const axios = require('axios');
const Attendances = require('../models/Attendances');

const URLFAKEUSER = 'http://localhost:8080/';

module.exports = (app) => {
  app.get('/attendances', (req, res) => {
    Attendances.show()
      .then((result) => res.json(result))
      .catch((err) => res.status(400).json(err));
  });

  app.get('/attendances/:id', (req, res) => {
    const id = Number(req.params.id);
    Attendances.find(id)
      .then(async (response) => {
        const { data: client } = await axios.get(
          `${URLFAKEUSER}${response[0].client}`,
        );

        res.status(200).json({ ...response[0], client });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  app.post('/attendance', (req, res) => {
    const attendance = req.body;

    Attendances.add(attendance)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  app.patch('/attendances/:id', (req, res) => {
    const id = Number(req.params.id);
    const values = req.body;

    Attendances.update(id, values)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  app.delete('/attendances/:id', (req, res) => {
    const id = Number(req.params.id);

    Attendances.remove(id)
      .then(() => {
        res.json({ id });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
};
