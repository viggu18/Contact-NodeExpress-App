const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc Create new contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json({ data: contact, message: "Create Contact" });
});

//@desc Get particular contacts
//@route GET /api/contacts/:id
//@access private
const getContactByID = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not fount");
  } else {
    res.status(200).json({ data: contact, message: "Found contact" });
  }
});

//@desc Update contacts
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not fount");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({ data: updatedContact, message: "Contact updated" });
});

//@desc Delete contacts
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not fount");
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Contact Deleted", data: deletedContact });
});

module.exports = {
  getAllContacts,
  createContact,
  getContactByID,
  updateContact,
  deleteContact,
};
