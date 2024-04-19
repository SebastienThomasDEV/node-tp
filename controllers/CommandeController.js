const controller = {};


controller.list = (req, res) => {
    res.send('Liste des commandes');
}

controller.show = (req, res) => {
    res.send('Détail de la commande');
}