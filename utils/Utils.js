// on importe les modules nécessaires, pdf kit pour générer le document PDF
// et le modèle Bar pour récupérer le nom du bar associé à la commande
const PDFDocument = require('pdfkit');
const Bar = require('../models/Bar');


// on crée un objet Utils qui contient une méthode pour générer un document PDF et l'envoyer au client
// il est exporté pour être utilisé dans les autres fichiers, c'est un module utilitaire
const Utils = {
    async generatePdfAndSend(commande, res) {
        // création du document PDF
        // on formate les données de la commande
        let date = new Date(commande.date);
        // format de la date : jj-mm-aaaa
        date = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
        // on récupère le bar associé à la commande pour afficher son nom et non son id
        await Bar.findById(commande.id_bar).then(
            (bar) => {
                // on crée le document PDF
                const doc = new PDFDocument();
                // on applique les styles et on ajoute les données
                doc.fontSize(25).text('Commande', 100, 100);
                doc.fontSize(15).text(`Nom: ${commande.name}`);
                doc.fontSize(15).text(`Prix: ${commande.prix}`);
                doc.fontSize(15).text(`Bar: ${bar.name}`);
                doc.fontSize(15).text(`Date: ${date}`);
                doc.fontSize(15).text(`Status: ${commande.status}`);
                // on termine le document pour qu'il soit prêt à être envoyé
                doc.end();
                // on définit les headers pour le navigateur
                res.setHeader('Content-Type', 'application/pdf');
                // on définit le nom du fichier
                res.setHeader('Content-Disposition', `attachment; filename=${commande.name}.pdf`);
                // on envoie le document PDF au client
                doc.pipe(res);
            }
        )
    }
}
module.exports = Utils;