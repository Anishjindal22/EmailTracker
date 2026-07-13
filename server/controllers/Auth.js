const bcrypt = require('bcrypt');
const User = require('../models/User');
const signup = async (req, res) => {
    try{
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !email || !password){
            return res.status(400).send('Missing required fields');
        }
        if(await User.findOne({email})){
            return res.status(400).send('Email already exists');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            passwordHash
        });
        await newUser.save();
        res.status(201).json({success: true, message: 'User registered successfully'});
    }   
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal Server Error');
    }
}

const login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send('Missing required fields');
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch){
            return res.status(400).send('Invalid email or password');
        }
        res.status(200).json({success: true, message: 'Login successful'});
    }
    catch(error){
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = { signup, login };