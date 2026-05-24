const Admin = require('../models/Admin');
const express = require('express');

const router = express.Router();

// Register Admin
router.post('/', async (req, res) => {
    try {
        const admin = new Admin(req.body);

        await admin.save();

        return res.status(200).json({
            message: "Admin registered successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
});

// Admin Login
router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const admin = await Admin.findOne({ email: email });

        // Check admin exists or not
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        // Password check
        if (admin.password === password) {

            return res.status(200).json({
                message: "Login Successfully",
                admin: {
                    role: 'admin',
                    id: admin._id,
                    email: admin.email
                }
            });

        } else {

            return res.status(401).json({
                message: "Username or password Incorrect"
            });

        }

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });

    }

});

// Change Password
router.put('/change/:email', async (req, res) => {

    try {

        const { op, np, cnp } = req.body;

        const admin = await Admin.findOne({
            email: req.params.email
        });

        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }

        if (admin.password !== op) {
            return res.status(401).json({
                message: "Old Password is Incorrect"
            });
        }

        if (np !== cnp) {
            return res.status(400).json({
                message: "New Password and Confirm Password do not match"
            });
        }

        const updatedAdmin = await Admin.findOneAndUpdate(
            { email: req.params.email },
            { password: np },
            { new: true }
        );

        return res.status(200).json({
            message: "Password Changed Successfully",
            admin: updatedAdmin
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: "Server error while changing password"
        });

    }

});

module.exports = router;