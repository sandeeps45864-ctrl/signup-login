const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(__dirname));

// Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Contact Route
app.post("/send", async (req, res) => {

    const { name, email, message } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.verify();
        console.log("Email server ready");

        const mailOptions = {
            from: process.env.EMAIL_USER,
            replyTo: email,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `,
        };

        await transporter.sendMail(mailOptions);

        console.log("Email Sent Successfully");

        res.send("Message sent successfully!");

    } catch (error) {

        console.log(error);

        res.status(500).send("Error sending message");
    }
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});