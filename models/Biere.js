
/*Biere
  name: string
  description: text
  degree : float
  prix: float, min(0)
  bars_id: integer*/
  const mongoose = require('mongoose');

  const biereSchema = new mongoose.Schema({
      name: {
          type: String,
          unique: true,
         // required: true
      },
      description: {
          type: String,
          //required: true
      },
      degree: {
          type: Number,
          //required: true
      },
      prix: {
          type: Number,
          //required: true,
          min: 0
      },
      bar_id: {
          type: Number,
          //required: true
      }
  });
  
  module.exports = mongoose.model('Biere', biereSchema); // Utilisation de 'Biere' pour le nom du modèle
  