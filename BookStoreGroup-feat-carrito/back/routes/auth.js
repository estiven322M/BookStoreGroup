const express=require("express");
const { registroUsuario,logginUser,logOut } = require("../controllers/authController");
const {isAuthenticatedUser}=require("../middleware/auth")
const router= express.Router();

router.route('/usuario/registro').post(registroUsuario)
router.route('/login').get(logginUser)
router.route('/logOut').get(isAuthenticatedUser,logOut)
router.route("/forgotPassword").post(forgotPassword)
router.route('/resetPassword/:token').post(resetPassword)

module.exports= router