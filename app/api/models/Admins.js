const mongoose = require("mongoose");

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const AdminsSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure unique usernames
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin"], // Allow only "admin" role for admins
  },
});

module.exports =
  mongoose.models.admins || mongoose.model("admins", AdminsSchema);
