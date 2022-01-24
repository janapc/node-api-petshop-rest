const connection = require('../infra/database/connection');
const uploadFiles = require('../infra/files/uploadFiles');

class Pet {
  add(pet, res) {
    const query = 'INSERT INTO Pets SET ?';

    uploadFiles(pet.image, pet.name, (err, newPath) => {
      if (err) res.status(400).json({ err });

      const newPet = { name: pet.name, image: newPath };

      connection.query(query, newPet, (error) => {
        if (error) res.status(400).json(error);
        else res.status(200).json(newPet);
      });
    });
  }
}

module.exports = new Pet();
