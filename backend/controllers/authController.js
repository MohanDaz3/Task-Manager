const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async (req, res) => {
    console.log("Signup attempt detected");

    const { username, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            console.log("User already exists with username:", username);
            return res.status(400).json({ msg: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new User({ username, password: hashedPassword });

        // Save the user
        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },  // payload
            process.env.JWT_SECRET, // secret key
            { expiresIn: '1h' }     // expiration time
        );

        // Send response with the token
        console.log("User registered successfully with username:", username);
        res.status(201).json({ token });

    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ msg: 'Server error' });
    }
};


exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
