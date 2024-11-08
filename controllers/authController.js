const User = require('../models/user');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.status(400).json({
        message: 'All Fields Are Required'
    });

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existingUser) return res.status(400).json({
        message: "Username/E-Mail Already In Use"
    });

    const newUser = new User({
        username,
        email,
        password: password
    });
    await newUser.save();

    res.status(201).json({
        message: "User Registered Successfully",
        user: { username: newUser.username, email: newUser.email }
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(400).json({
            message: "All Fields Are Required"
        });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({
            message: "Invalid Username or Password"
        });

        if (!(password === user.password)) return res.status(401).json({
            message: "Invalid Password"
        });

        res.status(200).json({
            message: "Login Successful",
            user: { username: user.username, email: user.email }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Login Failed. Please Try Later"
        });
    }
}

module.exports = { registerUser, login };
