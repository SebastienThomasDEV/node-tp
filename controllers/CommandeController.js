const controller = {};
const Commande = require('../models/Commande');
const Bars = require('../models/Bars');


controller.list = (req, res) => {
    Commande.find(req.params)
        .then((queryResult) => {
            res.json(queryResult);
        })
        .catch((err) => {
            res.json(err);
        });

}

controller.show = (req, res) => {
    Commande.findById(req.params.id)
        .then((queryResult) => {
            res.json(queryResult);
        })
        .catch((err) => {
            res.json(err);
        });
}

controller.create = (req, res) => {
    if (!req.body.name || !req.body.prix || !req.params.id_bar || !req.body.date || !req.body.status) {
        return res.json('Veuillez remplir tous les champs');
    }
    const newCommande = new Commande({
        name: req.body.name,
        prix: req.body.prix,
        id_bar: req.params.id_bar,
        date: req.body.date,
        status: req.body.status
    });
    newCommande.save()
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err))
}

controller.update = (req, res) => {
    /* if (!req.body.name || !req.body.prix || !req.params.id_bar || !req.body.date || !req.body.status) {
        return res.json('Veuillez remplir tous les champs');
    } */
    Commande.findByIdAndUpdate(req.params.id_commande, req.body)
        .then(() => res.json('commande modifiée'))
        .catch((err) => res.json("err"));
}

controller.remove = (req, res) => {
    Commande.findOneAndDelete(req.params.id)
        .then(() => {
            res.json('Commande supprimée');
        })
        .catch((err) => {
            res.json(err);
        });
}


// controller.addCommandeToBars = (req, res) => {
//     Commande.findById(req.params.id)
//         .then((commande) => {
//             Bars.findById(req.params.id)
//                 .then((bars) => {
//                     bars.commandes.push(commande);
//                     bars.save()
//                         .then(() => {
//                             res.json('Commande ajoutée au bars');
//                         })
//                         .catch((err) => {
//                             res.json(err);
//                         });
//                 })
//                 .catch((err) => {
//                     res.json(err);
//                 });
//         })
//         .catch((err) => {
//             res.json(err);
//         });
// }

module.exports = controller;