const Board = require("../models/BoardsModel");
const BoardController = {
  async createBoard(req, res) {
    const { userId, title, description, type } = req.body;
    const board = new Board({
      userId,
      title,
      description,
      type,
    });
    const savedBoard = await board.save();
    res.status(201).json(savedBoard);
  },
  async getBoards(req, res) {
    const boards = await Board.find();
    res.status(200).json(boards);
  },
};
module.exports = BoardController;
