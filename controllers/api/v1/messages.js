const Message = require("../../../models/api/v1/Message");
const create = (req, res) => {
  const text = req.body.message.text;
  const user = req.body.message.user;
  const m = new Message({ user: user, text: text });
  m.save().then(() => {
    res.json({
      status: "success",
      data: {
        message: {
          m,
        },
      },
    });
  });
};

const index = async (req, res) => {
  const messages = await Message.find();
  res.json({
    status: "success",
    message: "GETTING messages",
    data: {
      messages: messages,
    },
  });
};

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


module.exports = {
  create,
  index,
  getById,
  update,
  remove,
  getMessagesByUser,
};
