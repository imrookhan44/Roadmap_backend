const Board = require("../models/BoardsModel");
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
    const savedBoard = await board.save();
    res.status(201).json({
      message: "created successfully",
      data: savedBoard,
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
        res.status(404).json({
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
};
module.exports = BoardController;
