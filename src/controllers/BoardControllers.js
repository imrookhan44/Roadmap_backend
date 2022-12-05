const Board = require("../models/BoardsModel");
const User = require("../models/AuthModel");
const sendEmail = require("../Utils/Email");
const BoardController = {
  async createBoard(req, res) {
    const { userId, title, description, type, Boards } = req.body;
    const board = new Board({
      userId,
      title,
      description,
      type,
      Boards,
    });
    await board.save().then((result) => {
      res.status(201).json({
        userId: result.userId,
        title: result.title,
        description: result.description,
        Boards: result.Boards,
        id: result._id,
      });
    });
  },
  getBoards: (req, res) => {
    Board.find({}, (err, boards) => {
      if (!err && boards.length !== 0) {
        res.status(200).json({
          message: "success",
          data: boards,
        });
      } else {
        res.status(200).json({
          message: "no board found",
        });
      }
    });
  },

  updateRoadmap: (req, res) => {
    const { title, description, type, Boards } = req.body;
    Board.findByIdAndUpdate(
      { _id: req.params._id },
      { $set: { title, description, type, Boards } },
      { new: true },
      (err, updatedRoadmap) => {
        if (err) {
          res.status(500).json({ message: "Error updating Roadmap" });
        } else {
          res.status(200).json({
            message: "Roadmap updated successfully",
            updatedRoadmap,
          });
        }
      }
    );
  },
  deleteRoadmap: (req, res) => {
    Board.findByIdAndDelete({ _id: req.params._id }, (err, deletedRoadmap) => {
      if (err) {
        res.status(500).json({ message: "Error deleting roadmap" });
      } else {
        res.status(200).json({ message: "Roadmap deleted successfully" });
      }
    });
  },
  GetById: (req, res) => {
    Board.findById({ _id: req.params._id }, (err, boards) => {
      if (err) {
        res.status(500).json({ message: "Error getting board" });
      } else {
        res.status(200).json({ message: "Board found successfully", boards });
      }
    });
  },
  sendEmailAndSave: async (req, res) => {
    const { email } = req.body;

    sendEmail(email)
    Board.findByIdAndUpdate(
      { _id: req.params._id },
      { $push: { "Boards.0.cards.0.tasks.0.members": { email } } },
      { new: true },
      (err, updatedRoadmap) => {
        if (err) {
          res.status(500).json({ message: "Error updating Roadmap" });
        } else {
          res.status(200).json({
            message: "Roadmap updated successfully",
            updatedRoadmap,
          });
        }
      }
    );
  },
};
module.exports = BoardController;
