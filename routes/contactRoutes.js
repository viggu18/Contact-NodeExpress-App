const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  createContact,
  getContactByID,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);
router.route("/").get(getAllContacts).post(createContact);
router
  .route("/:id")
  .get(getContactByID)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
