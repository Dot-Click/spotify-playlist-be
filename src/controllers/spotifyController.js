const User = require("../models/User/user");
const SpotifyPlaylist = require("../models/spotify");
const sendMail = require("../utils/sendMail");
const SuccessHandler = require("../utils/SuccessHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const validator = require("validator");

const addPlaylist = async (req, res) => {
  try {
    const { title, category, embedLink } = req.body;
    const data = await SpotifyPlaylist.create({
      user: req.user._id,
      title,
      category,
      embedLink,
    });
    return SuccessHandler({ message: "Playlis added", data }, 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const fetchCategories = async (req, res) => {
  try {
    const data = await SpotifyPlaylist.find().distinct("category");
    return SuccessHandler({ message: "Fetched Categories", data }, 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};

const getPlaylist = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, search } = req.body;
    const skipItems = (Number(page) - 1) * Number(pageSize);
    const searchFilter = req.body.search
      ? {
          $or: [
            {
              title: { $regex: req.body.search, $options: "i" },
            },
            {
              category: { $regex: req.body.search, $options: "i" },
            },
          ],
        }
      : {};
    const data = await SpotifyPlaylist.find({ ...searchFilter })
      .skip(skipItems)
      .limit(pageSize);
    return SuccessHandler({ message: "Fetched Categories", data }, 200, res);
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
module.exports = {
  addPlaylist,
  fetchCategories,
  getPlaylist,
};
