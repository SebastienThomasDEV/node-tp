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
    async generatePdfAndSend(commande, res) {
        // write the pdf into public folder
        let date = new Date(commande.date);
        date = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
        await Bar.findById(commande.id_bar).then(
            (bar) => {
                const doc = new PDFDocument();
                doc.fontSize(25).text('Commande', 100, 100);
                doc.fontSize(15).text(`Nom: ${commande.name}`);
                doc.fontSize(15).text(`Prix: ${commande.prix}`);
                doc.fontSize(15).text(`Bar: ${bar.name}`);
                doc.fontSize(15).text(`Date: ${date}`);
                doc.fontSize(15).text(`Status: ${commande.status}`);
                doc.end();
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', `attachment; filename=${commande.name}.pdf`);
                doc.pipe(res);

            }
        )
    }
}
module.exports = Utils;