const { format } = require("@fast-csv/format");

const wizardModel = require("..models/wizardModel");

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

module.exports = { exportWizardCSV }