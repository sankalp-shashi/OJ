import dotenv from 'dotenv';
import user from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../.env' });

export const register = async (req, res) => {
    try {
        const {username, email, password, isAdmin} = req.body;

        // Check if the fields are empty
        if (!username || !email || !password) {
            return res.status(405).json({message: 'All fields are required!'});
        }

        // Check if the user already exists
        let existingUser = await user.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: 'User with this email already exists!'});
        }

        // Encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new user({
            username,
            email,
            password: encryptedPassword,
            isAdmin: isAdmin || false
        });

        // Save user to the database
        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        res.status(201).json({
            token,
            user: newUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Something went wrong!'});
    }
}


export const login = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        let existingUser = await user.findOne({email});
        if (!email) existingUser = await user.findOne({username});
        if (!existingUser) {
            console.log(req.body);
            console.log(existingUser);
            return res.status(401).json({message: 'User not found'});
        }

        const matched = await bcrypt.compare(password, existingUser.password);
        if (!matched) {
            return res.status(406).json({message: 'Incorrect username or password'});
        }

        const token = jwt.sign(
            {
                id: existingUser._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        const cookieOptions = {
            expiresIn: new Date(
                Date.now() + 1 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };

        res.status(200).cookie('token', token, cookieOptions).json({
            message: 'Login successful',
            success: true,
            token,
            user: {
                username: existingUser.username,
                email: existingUser.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
}

export const validate = async () => {
    try 
    {
        console.log('Validating user');
        if (!req.user) {
            console.log('No user found');
            return res.status(405).json({message: 'All fields are required!'});
        }
        const user = await user.findById(req.user.id).select('-password');
        console.log('checking user: ', user);
        res.json({ user : {username: user.username, email: user.email}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
}