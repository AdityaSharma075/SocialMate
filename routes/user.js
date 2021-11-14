const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);
// router.get('/post/update' ,postController.update );
// router.get('/post/delete' ,postController.delete );
module.exports = router;
