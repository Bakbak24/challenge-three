const Message = require("../../../models/Messages");

const getAll = async function (req, res) {
  const query = {};
  if (req.query.user) {
    query.user = req.query.user;
  }

  const messages = await Message.find();

  res.json({
    status: "success",
    message: "GETTING messages",
    data: {
      messages: messages,
    },
  });
};

const create = async function (req, res, next) {
  let message = new Message({
    user: req.body.user,
    message: req.body.message,
  });

  const savedMessage = await message.save();

  res.json({
    status: "success",
    message: "Message created",
    data: {
      message: savedMessage,
    },
  });

  if (req.body.user === "error") {
    return next(new Error("This is a fake error"));
  }
};

//GET ID
const getById = async function (req, res) {
  const message = await Message.findById(req.params.id);
  res.json({
    status: "success",
    message: `GETTING message ${req.params.id}`,
    data: {
      message: message,
    },
  });
};

//PUT
const update = async function (req, res) {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    status: "success",
    message: `PUT message ${req.params.id}`,
    data: {
      message: message,
    },
  });
};

//DELETE
const remove = async function (req, res) {
  const message = await Message.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: `DELETE message ${req.params.id}`,
    data: {
      message: message,
    },
  });
};

//GET USER ALL MESSAGES
const getMessagesByUser = async function (req, res) {
  const messagesUser = await Message.find({ user: req.params.user });

  res.json({
    status: "success",
    message: `Messages from user ${req.query.user}`,
    data: {
      messages: messagesUser,
    },
  });
};

module.exports.getAll = getAll;
module.exports.create = create;
module.exports.getById = getById;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getMessagesByUser = getMessagesByUser;
