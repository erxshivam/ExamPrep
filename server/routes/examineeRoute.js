const Examinee = require('../models/Examinee');
const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendMail');
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, "uploads/");

  },

  filename: function (req, file, cb) {

    cb(null, Date.now() + path.extname(file.originalname));

  },

});

const upload = multer({ storage });


// ================= UPDATE PROFILE =================

router.put("/:id", upload.single("profileImage"), async (req, res) => {

  try {

    const {
      name,
      email,
      number,
      address,
      password,
      college,
      qualification,
      status,
      session,
    } = req.body;

    let updateData = {

      name,
      email,
      number,
      address,
      password,
      college,
      qualification,
      status,
      session,

    };

    if (req.file) {

      updateData.profileImage = req.file.filename;

    }

    const updatedExaminee = await Examinee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: 'after' }
);

    if (!updatedExaminee) {

      return res.status(404).json({
        success: false,
        message: "Examinee not found"
      });

    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedExaminee,
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});


// ================= GET SINGLE USER =================

router.get('/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const examinee = await Examinee.findById(id);

    if (!examinee) {

      return res.status(404).json({
        message: "Examinee not found"
      });

    }

    return res.json({
      data: examinee
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= GET ALL USERS =================

router.get('/', async (req, res) => {

  const examinee = await Examinee.find();

  return res.json({
    data: examinee
  });

});


// ================= REGISTER USER =================

router.post('/', async (req, res) => {

  try {

    const { email } = req.body;

    const existingExaminee = await Examinee.findOne({
      email: email
    });

    if (existingExaminee) {

      return res.status(400).json({
        message: "Examinee with this email already exists"
      });

    }

    const examinee = new Examinee(req.body);

    await examinee.save();

    return res.status(200).json({
      message: "Examinee registered successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= GOOGLE LOGIN =================

router.post('/google-login', async (req, res) => {

  try {

    const { name, email } = req.body;

    // Existing user check
    let examinee = await Examinee.findOne({ email });

    // Create user if not exists
    if (!examinee) {

      examinee = new Examinee({

        name: name,

        email: email,

        password: "google-auth",

        number: "Not Added",

        address: "Not Added",

        college: "Not Added",

        qualification: "Not Added",

        status: "active"

      });

      await examinee.save();

    }

    return res.status(200).json({

      message: "Google Login Successful",

      user: {

        _id: examinee._id,
        name: examinee.name,
        email: examinee.email,
        role: "user"

      }

    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= NORMAL LOGIN =================

router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    const examinee = await Examinee.findOne({
      email: email
    });

    if (!examinee) {

      return res.json({
        message: "Your Email Incorrect"
      });

    }

    if (examinee.password === password) {

      return res.json({

        message: "Login Successfully",

        user: {

          email: examinee.email,
          role: "user",
          id: examinee._id

        }

      });

    }

    return res.json({
      message: "Password Incorrect"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= DELETE USER =================

router.delete('/:id', async (req, res) => {

  try {

    const { id } = req.params;

    await Examinee.findByIdAndDelete(id);

    return res.json({
      message: "Deleted successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error"
    });

  }

});


// ================= CHANGE PASSWORD =================

router.put('/change/:id', async (req, res) => {

  try {

    const { op, np, cnp } = req.body;

    const examinee = await Examinee.findById(req.params.id);

    if (!examinee) {

      return res.json({
        message: "User not found"
      });

    }

    if (examinee.password !== op) {

      return res.json({
        message: "Old password is incorrect"
      });

    }

    if (np !== cnp) {

      return res.json({
        message: "New password and confirm password do not match"
      });

    }

    await Examinee.findByIdAndUpdate(
      req.params.id,
      { password: np },
      { returnDocument: 'after' }
);

    return res.json({
      message: "Password Updated Successfully"
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server Error"
    });

  }

});

module.exports = router;