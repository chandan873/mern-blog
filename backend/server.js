require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());
app.use(cors({ origin: "https://mern-blog-frontend-4mdi.onrender.com", credentials: true }));
app.use('/uploads', express.static('uploads'));

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error("❌ MongoDB Error:", err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    image: String,
    sections: [{ heading: String, paragraph: String }],
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }],
    comments: [{ username: String, text: String, date: { type: Date, default: Date.now } }],
    createdAt: { type: Date, default: Date.now }
});
const Blog = mongoose.model('Blog', blogSchema);

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', UserSchema);

// 🔥 Like a Blog
app.post("/blogs/:id/like", async (req, res) => {
    try {
        const userId = req.body.userId;
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ error: "Blog not found" });

        if (blog.likedBy.includes(userId)) {
            blog.likes -= 1;
            blog.likedBy = blog.likedBy.filter(id => id !== userId);
        } else {
            blog.likes += 1;
            blog.likedBy.push(userId);
        }

        await blog.save();
        res.json({ likes: blog.likes, likedBy: blog.likedBy });  // ✅ Send valid JSON
    } catch (error) {
        console.error("Error in Like API:", error);
        res.status(500).json({ error: "Server error" });
    }
});


// 🔥 Add Comment
app.post("/blogs/:id/comment", async (req, res) => {
    try {
        const { username, text } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        blog.comments.push({ username, text, date: new Date() });
        await blog.save();

        res.json({ comments: blog.comments });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// 🔥 Upload Blog
app.post('/blogs', upload.single('image'), async (req, res) => {
    try {
        const { title, author, sections, userId } = req.body;
        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const parsedSections = typeof sections === "string" ? JSON.parse(sections) : sections;

        const blog = new Blog({
            title,
            author,
            authorId: userId,
            image: req.file ? `/uploads/${req.file.filename}` : '',
            sections: parsedSections
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error saving blog' });
    }
});

// 🔥 Register User
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
});

// 🔥 Login User
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
});

// 🔥 Get All Blogs
app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// 🔥 Get Single Blog
app.get('/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

// 🔥 Delete Blog
app.delete('/blogs/:id', async (req, res) => {
    try {
        const { userId } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (!blog || String(blog.authorId) !== String(userId)) return res.status(403).json({ error: 'Unauthorized' });

        await blog.deleteOne();
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting blog' });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
