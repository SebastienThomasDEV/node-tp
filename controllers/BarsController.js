const controller = {};
const Bar = require('../models/Bars');

controller.getAll = (req, res) => {
    Bar.findAll()
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controller.get = (req, res) => {
    Bar.find({ _id: req.params.id })
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controller.post = (req, res) => {
    const bars_data = {
        name: req.body.name,
        adresse: req.body.adresse,
        tel: req.body.tel,
        email: req.body.email,
        description: req.body.description
    }

    Bar.create(bars_data)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
}

controller.update = (req, res) => {
    const bars_data = {}

    
}


// faire le put, delete
