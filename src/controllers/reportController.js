const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");
const wizardModel = require("../models/wizardModel");

const exportWizardCSV = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        res.setHeader("Content-Disposition", "atachment: filename=wizards.csv");
        res.setHeader("Content-Type", "text-csv");

        const csvStream = format({ headers: true });

        wizards.forEach((wizard) => {
            csvStream.write({
                Id: wizard.id,
                Nome: wizard.name,
                Casa: wizard.house_name || "Sem casa"
            });
        });

        csvStream.end()

    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV" })
    }
};

const exportWizardPDF = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline; filename=wizards.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        doc.fontSize(20).text("Relatório de Bruxos", {align: "center"});
        doc.moveDown();

        doc.fontSize(12).text("Id | Nome | Casa,", {underline: true});
        doc.moveDown(0.5);

        wizards.forEach((wizard) => {
            doc.text(
                `${wizard.id} | ${wizard.name} | ${wizard.house_name} || "Sem casa"`
            )
        })
        
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF"});
    }
}

module.exports = { exportWizardCSV, exportWizardPDF }