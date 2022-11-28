const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema({
  // id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String, required: true, default: "public", enum: ["public", "private"]
  },
},
  {
    timestamps: true
  }
);

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;


