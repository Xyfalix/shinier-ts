const express = require("express");
const router = express.Router();
const itemsCtrl = require("../../controllers/api/items");
const { checkToken, checkAdminRole } = require("../../config/checkToken");

router.get("/", checkToken, checkAdminRole, itemsCtrl.getAllItems);
router.post("/", checkToken, checkAdminRole, itemsCtrl.addItem);

module.exports = router;
