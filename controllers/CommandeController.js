const controller = {};
const Commande = require('../models/Commande');
const Bars = require('../models/Bars');


controller.list = (req, res) => {
    Commande.find()
        .then((commandes) => {
            res.json(commandes);
        })
        .catch((err) => {
            res.json(err);
        });

}

controller.show = (req, res) => {
    Commande.findById(req.params.id)
        .then((commande) => {
            res.json(commande);
        })
        .catch((err) => {
            res.json(err);
        });
}

controller.create = (req, res) => {
    if (!req.body.name || !req.body.prix || !req.body.bars_id || !req.body.date || !req.body.status) {
        return res.json('Veuillez remplir tous les champs');
    }
    const newCommande = new Commande({
        name: req.body.name,
        prix: req.body.prix,
        bars_id: req.body.bars_id,
        date: req.body.date,
        status: req.body.status
    });
    newCommande.save()
        .then(() => {
            res.json('Commande créée');
        })
        .catch((err) => {
            res.json(err);
        });
}

controller.update = (req, res) => {
    if (!req.body.name || !req.body.prix || !req.body.bars_id || !req.body.date || !req.body.status) {
        return res.json('Veuillez remplir tous les champs');
    }
    Commande.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        prix: req.body.prix,
        bars_id: req.body.bars_id,
        date: req.body.date,
        status: req.body.status
    })
        .then(() => {
            res.json('Commande modifiée');
        })
        .catch((err) => {
            res.json(err);
        });
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