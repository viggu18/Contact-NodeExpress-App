const mongooes = require("mongoose");

const contactSchema = mongooes.Schema(
  {
    user_id: {
      type: mongooes.Schema.Types.ObjectId,
      required: [true],
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Plase add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Plase add the contact email"],
    },
    phone: {
      type: String,
      required: [true, "Plase add the contact phone no"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongooes.model("Contacts", contactSchema);
