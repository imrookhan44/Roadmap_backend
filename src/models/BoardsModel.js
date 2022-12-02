const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    userId: { type: String },
    title: { type: String },
    description: { type: String },
    type: {
      type: String,
      default: "public",
      enum: ["public", "private"],
    },
    Boards: [
      {
        title: { type: String },
        cards: [
          {
            title: { type: String },
            description: { type: String },
            labels: [
              {
                color: { type: String },
                text: { type: String },
              },
            ],
            tasks: [
              {
                completed: {
                  type: String,
                },
                text: {
                  type: String,
                },
                deadline: {
                  type: Date,
                  default: Date.now,
                },
                createdBy: {
                  type: String,
                },
                comments: [
                  {
                    text: { type: String },
                    date: { type: Date, default: Date.now },
                  },
                ],
                members: [
                  {
                    email: { type: String },
                    // name: { type: String },
                    // profile_pic: {
                    //   type: String,
                    //   default: "https://i.imgur.com/8Km9tLL.png",
                    // },
                  },
                ],
                date: {
                  type: Date,
                  default: Date.now,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model("Board", BoardSchema);
module.exports = Board;
