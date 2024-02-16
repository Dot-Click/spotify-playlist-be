const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const spotifySchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    title: {
      type: String,
    },
    embedLink: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const SpotifyPlaylist = mongoose.model("SpotifyPlaylist", spotifySchema);
module.exports = SpotifyPlaylist;
