const contentPost = require("../models/content");

const contentController = {
  async createContent(req, res) {
    const { title, description, picture } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "please filled the field" })
    }
    const board = new contentPost({
      title,
      description,
      picture
    });
    const savedBoard = await board.save();
    res.status(201).json(savedBoard);
  },

  async getContent(req, res) {
    const content = await contentPost.find();
    res.status(200).json(content);
  },

  async updateId(req, resp) {
    const IdUpdate = await contentPost.findByIdAndUpdate(req.params._id, req.body);
    return resp.status(202).json({ meassge: "successfully" })
  },

  async DeleteByID(req, resp) {
    const DeleteContent = await contentPost.findByIdAndDelete(req.params._id);
    return resp.status(203).json({ message: "Delete succesfully" })
  }
};
module.exports = contentController;

