const express=require("express");
const { registroUsuario,logginUser,logOut } = require("../controllers/authController");
const router= express.Router();

router.route('/usuario/registro').post(registroUsuario)
router.route('/login').get(logginUser)
router.route('/logOut').get(isAuthenticatedUser,logOut)

module.exports= router