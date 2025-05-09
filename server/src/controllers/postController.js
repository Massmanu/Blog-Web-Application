const Post = require('../models/Post');
const { body, validationResult } = require("express-validator");

// Get all posts or search
exports.getPosts = async (req, res) => {
    const { search, page = 1, limit = 5 } = req.query;

    const currentPage = parseInt(page);
    const pageLimit = parseInt(limit);
    const skip = (currentPage - 1) * pageLimit;
    try {
        let query = {};

        if (search) {
            const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

            query = {
                $or: [
                    { title: { $regex: regex } },
                    { content: { $regex: regex } },
                ],
            };
        }
        // Total matching documents
        const total = await Post.countDocuments(query);

        // Fetch paginated + populated results
        let posts = await Post.find(query)
            .populate("author", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(pageLimit)

        // Post-process filtering by author name
        if (search) {
            const lowerSearch = search.toLowerCase();
            posts = posts.filter((post) =>
                post.author?.name?.toLowerCase().includes(lowerSearch) ||
                post.title.toLowerCase().includes(lowerSearch) ||
                post.content.toLowerCase().includes(lowerSearch)
            );
        }

        res.status(200).json({
            posts,
            totalPages: Math.ceil(total / pageLimit),
            currentPage,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get post by ID
exports.getPostById = async (req, res) => {
    try {
        // Find a post by its id and populate the author and comments fields
        const post = await Post.findById(req.params.id).populate('author').populate('comments');
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPost = async (req, res) => {
    console.log("📥 POST received with body:", req.body); // log incoming

    try {
        const { title, content, author } = req.body;
        const newPost = new Post({ title, content, author });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error("❌ Error saving post:", err);
        res.status(500).json({ message: err.message });
    }
};



// Update post by ID
exports.updatePost = async (req, res) => {
    try {
        // Update the post document using the request body; new:true returns the updated document
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete post by ID
exports.deletePost = async (req, res) => {
    try {
        // Delete the post document by id
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
