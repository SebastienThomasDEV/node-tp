



const biere = require('../models/Biere');

const controllerBiere = {};

controllerBiere.getAll = (req, res) => {
    biere.find()
        .then((biere) => {
            res.json(biere);
        })
        .catch((err) => {
            res.json(err);
        });
    }

controllerBiere.store = (req, res) => {
    biere.create(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
}
controllerBiere.update = (req, res) => {
    biere.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
    };

controllerBiere.delete = (req, res) => {
    biere.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
    };
module.exports = controllerBiere;