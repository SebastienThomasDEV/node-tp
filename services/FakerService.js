const Biere = require('../models/Biere');
const Commande = require('../models/Commande');
const Bars = require('../models/Bars');
const BiereCommande = require('../models/BiereCommande');

const { faker } = require('@faker-js/faker');


const fakerService = {
    generateFakeBiere: () => {
        return Commande.find().then((commandes) => {
            Bars.find().then((bars) => {
                return new Biere({
                    name: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    degree: faker.number.int({min: 0, max: 100}),
                    prix: faker.commerce.price(),
                    bar_id: faker.helpers.arrayElement(bars)._id,
                    commande_id: faker.helpers.arrayElement(commandes)._id
                });
            });
        });
    },

    generateFakeCommande: () => {
        return Bars.find().then((bars) => {
            return new Commande({
                name: faker.commerce.productName(),
                prix: faker.commerce.price(),
                date: faker.date.soon(),
                status: faker.helpers.arrayElement(["en cours", "terminée"]),
                id_bar: faker.helpers.arrayElement(bars)._id
            });
        });
    },

    generateFakeBar: () => {
        return new Bars({
            name: faker.company.name(),
            adresse: faker.location.streetAddress(),
            tel: faker.phone.number(),
            ville: faker.location.city(),
            email: faker.internet.email(),
            description: faker.company.catchPhrase()
        });
    },

    generateBiereCommande: () => {
        return Biere.find().then((bieres) => {
            Commande.find().then((commandes) => {
                return new BiereCommande({
                    id_biere: faker.helpers.arrayElement(bieres)._id,
                    id_commande: faker.helpers.arrayElement(commandes)._id,
                    quantity: faker.number.int({min: 1, max: 10})
                });
            });
        });
    }
}

module.exports = fakerService;