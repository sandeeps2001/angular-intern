const express = require("express")

const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller")
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/role.middleware')

const router = express.Router()

router.get("/", auth, admin, getUsers)

router.get("/:id", auth, admin, getUser)

router.patch("/:id", auth, admin, updateUser)

router.delete("/:id", auth, admin,deleteUser)

module.exports = router