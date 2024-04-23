const Biere = require('../models/Biere');
const Commande = require('../models/Commande');
const Bar = require('../models/Bar');
const BiereCommande = require('../models/BiereCommande');

const { faker } = require('@faker-js/faker');


const fakerService = {

    generateFakeBar: () => {
        return new Bar({
            name: faker.company.name(),
            adresse: faker.location.streetAddress(),
            tel: faker.phone.number(),
            ville: faker.location.city(),
            email: faker.internet.email(),
            description: faker.company.catchPhrase()
        });
    },


}

module.exports = fakerService;