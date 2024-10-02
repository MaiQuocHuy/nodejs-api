"use strict";
var express = require("express");
var router = express.Router();
const TodoModel = require('../models/todo.model');

router.get('/hello', (req, res, next) => {
    res.render('todo');
})

// GET all todos
router.get('/', async (req, res) => {
    try {
        const todos = await TodoModel.findAll();
        res.render('index', { todos });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST a new todo
router.post('/add', async (req, res) => {
    const { title } = req.body;
    try {
        await TodoModel.create({ title });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// DELETE a todo
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await TodoModel.destroy({ where: { id } });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// UPDATE a todo's status
router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await TodoModel.findByPk(id);
        if (todo) {
            todo.completed = !todo.completed;
            await todo.save();
        }
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});
module.exports = router;