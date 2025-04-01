const express = require("express");
const router = express.Router();
const wizardController = require("../controllers/wizardController");

router.get("/wizard", wizardController.getAllWizards);
router.get("/wizard/:id", wizardController.getWizard);
router.post("/wizard", wizardController.createWizard);
router.put("/:id", wizardController.updateWizard);
router.delete("/:id", wizardController.deleteWizard);

module.exports = router;
