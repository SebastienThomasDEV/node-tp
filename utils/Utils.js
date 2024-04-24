const PDFDocument = require('pdfkit');
const fs = require('fs');
const Bar = require('../models/Bar');

const Utils = {
    removeDuplicateObjects(array, property) {
        const uniqueIds = [];
        return array.filter(element => {
            const isDuplicate = uniqueIds.includes(element[property]);

            if (!isDuplicate) {
                uniqueIds.push(element[property]);
                return true;
            }
            return false;
        });
    },
    async generatePdf(commande) {
        // write the pdf into public folder
        let date = new Date(commande.date);
        date = date.format('dd-mm-yyyy');
        Bar.find({id: commande.id_bar}).then(
            (bar) => {
                const doc = new PDFDocument();
                doc.fontSize(25).text('Commande', 100, 100);
                doc.fontSize(15).text(`Nom: ${commande.name}`);
                doc.fontSize(15).text(`Prix: ${commande.prix}`);
                doc.fontSize(15).text(`Bar: ${bar.name}`);
                doc.fontSize(15).text(`Date: ${date}`);
                doc.fontSize(15).text(`Status: ${commande.status}`);
                doc.end();
                console.log(`./public/${commande._id}-${commande.id_bar}.pdf`);
                doc.pipe(fs.createWriteStream(`./public/${commande._id}-${commande.id_bar}.pdf`));
            }
        )
    }
}
module.exports = Utils;