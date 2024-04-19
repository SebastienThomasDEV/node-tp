const mongoose = require('mongoose');
/*Biere
  name: string
  description: text
  degree : float
  prix: float, min(0)
  bars_id: integer*/
const biereSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    degree: {
        type: Number,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    bar_id: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('Biere', biereSchema);