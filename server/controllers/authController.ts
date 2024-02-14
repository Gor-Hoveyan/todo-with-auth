import express, { Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcryptjs';
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import { config } from './config.js'

const generateAccessToken = (id: any) => {
    const payload = {id};
    return jwt.sign(payload, config.secret , {expiresIn: '7d'})
}

async function registration(req: Request, res: Response) {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({message: 'Registration error', errors});
        }
        const {userName, password} = req.body;
        const candidate = await User.findOne({userName});

        if(candidate) {
            return res.status(400).json({message: 'UserName is already taken'})
        }
        
        const passwordHash = bcrypt.hashSync(password, 7);
        const user = new User({userName: userName, password: passwordHash});
        await user.save();
        const token = generateAccessToken(user._id);
        res.cookie('_ajwt', token, {httpOnly: true, sameSite: 'strict', maxAge: 7*24*3600*1000});
        return res.status(200).json({message: 'Success'});
    } catch(e) {
        console.log(e);
    }
}

async function login(req: Request, res: Response) {
    try {
        const {userName, password} = req.body;
        const user = await User.findOne({userName});
        if(!user) {
            return res.status(400).json({message: 'Entered invalid userName or password'})
        }
        const validPassword = bcrypt.compareSync(password, user.password as string);
        if(!validPassword) {
            res.status(400).json({message: 'Entered invalid userName or password'});
        }
        const token = generateAccessToken(user._id);
        res.cookie('_ajwt', token, {httpOnly: true, sameSite: 'strict', maxAge: 7*24*3600*1000});
        return res.status(200).json({message: 'Success'});
    } catch(e) {
        res.status(500).json({message: 'Internal server error'});
        console.log('error', e);
    }
}

async function authoLog(req: Request, res: Response) {
    try {
        const token = req.cookies._ajwt;
        const decodedToken: any = jwt.verify(token, config.secret);
        const user = await User.findById({_id: decodedToken.id});
        if(!user) {
            res.status(400).json({message: 'Authorization token expires'});
        }
        res.status(200).json({user: user});
    } catch(e) {
        res.status(500).json({message: 'Internal server error', e});
    }
}

async function signOut(req: Request, res: Response) {
    try {
        res.clearCookie('_ajwt');
        res.status(400).json({message: 'Success'});
    } catch (e) {
        res.status(500).json({message: 'Internal serverError'})
    }
}

export const authController = {registration, login, authoLog, signOut};