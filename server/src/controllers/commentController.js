const Comment = require('../models/Comment');

// Get all comments
exports.getAllComments = async (req, res) => {
    try {
        // Optionally populate author and post to show the related data
        const comments = await Comment.find().populate('author').populate('post');
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get comment by ID
exports.getCommentById = async (req, res) => {
    try {
        // Find a comment by its id and populate the related fields
        const comment = await Comment.findById(req.params.id).populate('author').populate('post');
        if (!comment) return res.status(404).json({ message: 'Comment not found' });
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new comment
exports.createComment = async (req, res) => {
    try {
        // Extract text, post, and author from the request body
        const { text, post, author } = req.body;
        const newComment = new Comment({ text, post, author });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update comment by ID
exports.updateComment = async (req, res) => {
    try {
        // Update the comment using its ID and return the new version
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedComment) return res.status(404).json({ message: 'Comment not found' });
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete comment by ID
exports.deleteComment = async (req, res) => {
    try {
        // Remove the comment from the database using its ID
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).json({ message: 'Comment not found' });
        res.status(200).json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
