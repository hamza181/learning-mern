const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  name: { type: String, required: true },
  image: { type: String, required: true },
  places: [{ type: Schema.Types.ObjectId, required: true, ref: "Place" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
