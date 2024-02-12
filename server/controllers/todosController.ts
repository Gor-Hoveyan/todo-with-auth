import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Todo from "../models/Todo";
import User from "../models/User";
import { config } from "./config";

async function createTodo(req: Request, res: Response) {
    try {
        const { content, creator } = req.body;
        const todo = new Todo({ content: content, creator: creator });
        await User.updateOne({ _id: creator }, { $push: { todos: todo } });
        res.status(200).json({ message: 'Todo successfully added' });
    } catch (e) {
        console.log('Error', e)
    }
}

async function deleteTodo(req: Request, res: Response) {
    try {
        const { id, creator } = req.body;
        const user = await User.findById(creator);
        if (!user) {
            return res.status(400).json({ Message: 'invalid todo.' });
        }
        const todoIndex = user.todos.findIndex(todo => todo._id == id);
        await User.updateOne({ _id: creator }, {
            $pull: { todos: { $in: [user.todos[todoIndex]] } } 
        })
        res.status(200).json({ message: 'Todo successfully removed' });
    } catch (e) {
        console.log('Error', e);
    }
}

async function updateTodo(req: Request, res: Response) {
    try {
        const { id, creator, newContent } = req.body;
        const user = await User.findById(creator);
        if (!user) {
            return res.status(400).json({ message: 'Invalid todo' });
        }

        const todoIndex = user.todos.findIndex(todo => todo._id == id);

        if (todoIndex === -1) {
            return res.status(400).json({ message: 'Todo not found' });
        }

        const updateObject = {
            $set: {
                [`todos.${todoIndex}.content`]: newContent
            }
        };

        await User.updateOne({ _id: creator }, updateObject);
        res.status(200).json({ message: 'Todo successfully updated' });
    } catch (e) {
        console.log('Error', e)
    }
}

async function getTodos(req: Request, res: Response) {
    try {
        const user = await User.findById({ _id: req.body.creator });
        if (!user || !user.todos) {
            res.status(400).json({ message: 'Todos not found' });
        }
        res.status(200).json({ todos: user?.todos });
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error', e });
    }
}

export const todosController = { createTodo, deleteTodo, updateTodo, getTodos };