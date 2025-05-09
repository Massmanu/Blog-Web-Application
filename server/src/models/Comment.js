const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
