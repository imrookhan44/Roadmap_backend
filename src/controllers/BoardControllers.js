import Board from "../models/BoardsModel.js";
import User from "../models/AuthModel.js";
import sendEmail from "../Utils/Email.js";
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
    const { userIdd } = req.params;
    Board.find({
      $or: [{ userId: userIdd }, { "member.userId": userIdd }],
    }).then((result) => {
      if (result.length !== 0) {
        res.status(200).json({
          data: result,
        });
      } else {
        res.status(404).json({
          message: "No data found",
        });
      }
    });
  },

  getData: (req, res) => {
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
    const { email, id, userId } = req.body;
    sendEmail(email, id);
    Board.findByIdAndUpdate(
      { _id: req.params._id },
      // { $push: { "Boards.0.cards.0.tasks.0.members": { email } } },
      {
        $push: {
          member: { email, userId },
        },
      },
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
  getAllUsers: async (req, res) => {
    const { email } = req.params;
    let searchData = await User.find({ email: { $regex: email } });
    res.status(200).json({
      data: searchData,
      message: "user Found Successfully"
    });
  },
  dashBoard: async (req, res) => {
    let newClients = await User.find({
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)), },
    }).count().exec();
    res.status(200).json({
      newClients,
    });
  },
};
export default BoardController;
