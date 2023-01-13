import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema(
  {
    userId: [{ type:mongoose.Schema.Types.ObjectId,
      ref:"User"}],
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
            assign: [{ email: { type: String } }],
            title: { type: String },
            desc: { type: String },
            date: {
              type: String,
            },
            labels: [
              {
                color: { type: String },
                text: { type: String },
              },
            ],
            points: {
              type: Number,
            },
            files: {
              type: String
            },
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
                assign: [
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
    member: [
      {
        email: { type: String },
        userId: { type: String },
        profilePicture:{ type: String },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Board = mongoose.model("Board", BoardSchema);
export default Board;
