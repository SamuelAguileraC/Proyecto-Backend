const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("./AuthController");
const { respondWithError } = require("../Utils/Errors");
const { generateToken } = require("./AuthMiddleware");

async function registerUser(req, res) {
    try {
        const createdUser = await createUser(req.body);
        res.status(201).json(createdUser);
    } catch (error) {
        respondWithError(res
            , error);
    }
}
async function login(req, res) {
    try {
        res.status(200).json({ token: req.token, usuario: req.userData });
    } catch (error) {
        respondWithError(res
            , error);
    }
}

router.post('/register', registerUser);
router.post('/login', loginUser, generateToken, login);
module.exports = router;