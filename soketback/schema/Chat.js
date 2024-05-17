const mongoose = require("mongoose");

const messagess = new mongoose.Schema(
  {
    message: { type: String, required: true },
    From: { type: String, ref: "users" },
    To: { type: String, ref: "users" },
    username:{ type: String, required: true }
  },
  { timestamps: true }
);

const Chats = mongoose.model("message", messagess);

module.exports = { Chats };
