const express = require("express");
const router = express.Router();
const messagesController = require("../../../controllers/api/v1/messages");

let messages = [
  { id: 1, user: "pikachu", message: "Wassup" },
  { id2: 2, user: "Zayd", message: "Yoo hello" },
];

//GET1
router.get("/", messagesController.getAll);

//GET2 ID
router.get("/:id", messagesController.getById);

//POST
router.post("/", messagesController.create);

//PUT
router.put("/:id", messagesController.update);

//DELETE
router.delete("/:id", messagesController.remove);

//GET3
router.get("/user/:user", messagesController.getMessagesByUser);

module.exports = router;
