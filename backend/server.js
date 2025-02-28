const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

env = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));


    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
          const uploadPath = 'uploads/';
          if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath);
          }
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
    authorId: { type: String, required: true }, // Store logged-in user's ID
    image: String,
    sections: [{ heading: String, paragraph: String }],
    likes: { type: Number, default: 0 },
    likedBy: [{ type: String }], 
    comments: [
        {
            username: String,
            text: String,
            date: { type: Date, default: Date.now },
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

  
  const Blog = mongoose.model('Blog', blogSchema);

  // User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);




// Like a Blog
app.post("/blogs/:id/like", async (req, res) => {
    try {
        const userId = req.body.userId; // Get user ID (or use IP)
        const blog = await Blog.findById(req.params.id);
  
        if (!blog) return res.status(404).json({ error: "Blog not found" });
  
        if (blog.likedBy.includes(userId)) {
            // Unlike the post if user already liked it
            blog.likes -= 1;
            blog.likedBy = blog.likedBy.filter(id => id !== userId);
        } else {
            // Like the post
            blog.likes += 1;
            blog.likedBy.push(userId);
        }
  
        await blog.save();
        res.json({ likes: blog.likes });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
  });
  
  
  
  // Add Comment to Blog
  app.post("/blogs/:id/comment", async (req, res) => {
    try {
        const { username, text } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });
  
        const newComment = { username, text, date: new Date() };
        blog.comments = [...(blog.comments || []), newComment]; // Add new comment
        await blog.save();
  
        res.json({ comments: blog.comments });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
  });
  




  // upload blog
  
  app.post('/blogs', upload.single('image'), async (req, res) => {
    try {
        const { title, author, sections, userId } = req.body; // Get userId from request
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID is required' });
        }

        const blog = new Blog({
            title,
            author,
            authorId: userId, // Store userId as authorId
            image: imageUrl,
            sections: JSON.parse(sections)
        });

        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Error saving blog' });
    }
});

  


  
// Register Endpoint
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
});


// Login Endpoint

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    });
});





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Get All Blogs Endpoint
app.get('/blogs', async (req, res) => {
  try {
      const blogs = await Blog.find().sort({ date: -1 }); // Fetch blogs, sorted by newest first
      res.json(blogs);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});



// Get a Single Blog by ID
app.get('/blogs/:id', async (req, res) => {
  try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(blog);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

//dlete post api


app.delete('/blogs/:id', async (req, res) => {
    try {
        const { userId } = req.body; // Get userId from request
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        if (blog.authorId !== userId) {
            return res.status(403).json({ error: 'Unauthorized: You can only delete your own blogs' });
        }

        await blog.deleteOne();
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting blog' });
    }
});

  

  






// mongodb+srv://anayatech99:bp3Mnr67TgL7nCOJ@cluster0.cn1zf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// anayatech99

// bp3Mnr67TgL7nCOJ

// "name": "John Doe","email": "johndoe@example.com",
  
  

