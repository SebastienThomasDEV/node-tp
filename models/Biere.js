/*Biere
  name: string
  description: text
  degree : float
  prix: float, min(0)
  bars_id: integer*/
const mongoose = require("mongoose");

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
    min: 0,
  },
 // Référence au modèle Bar
  bar_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bar",

  },
  // Référence au modèle Commande
  commande_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commande',
    // required: true
},
});

module.exports = mongoose.model("Biere", biereSchema); // Utilisation de 'Biere' pour le nom du modèle
