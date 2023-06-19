const express = require('express');
const router = express.Router();
const Articles = require('../repositories/articlesRepository');

// GET all articles
router.get('/articles', async (req, res) => {
    try {
        const articles = await Articles.getAll();
        res.status(200).json({ success: true, data: articles});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
  
});

// GET an article by ID
router.get('/articles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Articles.getById(id);

        if (!article)
            return res.status(404).json({ success: false, error: 'Client not found'});
        
        res.status(200).json ({ success: true, data: article});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
});

// CREATE a new article
router.post('/articles', async (req, res) => {
    try {
        const { title, content, author_id } = req.body;
        const createdArticle = await Articles.create({ title, content, author_id });
        res.status(200).json({ success: true, data: createdArticle});
    } catch (err) {
        res.status(500).json({ success: false, date: err.message});
    }
});

// UPDATE an existing article by ID
router.put('/articles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, } = req.body;
        const updatedArticle = await Articles.updateById(id, { title, content, });
        
        if (!updatedArticle)
            return res.status(404).json ({ success: false, error: 'Article not found'});

        res.status(200).json({ success: true, data: updatedArticle });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
});


//DELETE a article by ID
router.delete('/articles/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedArticle = await Articles.deleteById(id);

        if (!deletedArticle)
            return res.status(404).json({ success: false, error: 'Article not found'});

        res.status(200).json({ success: true, data: deletedArticle });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
});

module.exports = router;