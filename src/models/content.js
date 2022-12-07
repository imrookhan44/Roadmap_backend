const mongoose = require('mongoose')

const contentPage = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  picture:{type:String}

},
  {
    timestamps: true    //createdAt: a date representing when this document was created
                        // updatedAt: a date representing when this document was last updated
  }
);

const contentPost = mongoose.model("contentpost", contentPage);
module.exports = contentPost;
// contentpost is name s file banjata a mongodb ma