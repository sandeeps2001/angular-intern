const express = require('express')

const {
    getInvites,
    getInvite,
    createInvite,
    updateInvite,
    deleteInvite,
    getPermissions
} = require('../controllers/invite.controller')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/role.middleware')
const router = express.Router()

router.get("/permissions", auth, getPermissions)

router.get("/", auth, admin, getInvites)

router.get("/:id", auth, admin, getInvite)

router.post("/", auth, admin, createInvite)

router.patch("/:id", auth, admin, updateInvite)

router.delete("/:id", auth, admin, deleteInvite)

module.exports = router