const User = require('../models/user');

const registerUser = async (req,res) => {
    const {username, email, password} = req.body;
    
    if(!username || !email || ! password) return res.status(400).json({
        message: 'All Fields Are Required'
    });

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    });
    if(existingUser) return res.status(400).json({
        message: "Username/E-Mail Already In User"
    });

    const newUser = new User({
        username,
        email,
        password: password
    });
    await newUser.save();

    res.status(201).json({
        message: "User Registered Successfully"
    });
}


module.exports = registerUser;