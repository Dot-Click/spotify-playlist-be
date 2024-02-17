const User = require("../models/User/user");
const SpotifyPlaylist = require("../models/spotify");
const sendMail = require("../utils/sendMail");
const SuccessHandler = require("../utils/SuccessHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const validator = require("validator");
const playlist = [
  {
    title: "rock this",
    category: "Rock",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXcF6B6QPhFDv?utm_source=generator",
  },
  {
    title: "volume",
    category: "Rock",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWWJOmJ7nRx0C?utm_source=generator",
  },
  {
    title: "rock frequency",
    category: "Rock",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX14rbJEM3cke?utm_source=generator",
  },

  {
    title: "gym hits",
    category: "Workout",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXdxcBWuJkbcy?utm_source=generator",
  },
  {
    title: "power hour",
    category: "Workout",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX32NsLKyzScr?utm_source=generator",
  },
  {
    title: "rock frequency",
    category: "Workout",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX14rbJEM3cke?utm_source=generator",
  },

  {
    title: "ultra gaming tracks",
    category: "Gaming",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWYN9NBqvY7Tx?utm_source=generator&theme=0",
  },
  {
    title: "power gaming",
    category: "Gaming",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX6taq20FeuKj?utm_source=generator",
  },
  {
    title: "ultimate pop gaming",
    category: "Gaming",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWYRNXjFoiid2?utm_source=generator",
  },

  {
    title: "Hip Te Hop",
    category: "Hip-Hop",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DWTqYqGLu7kTX?utm_source=generator&theme=0",
  },
  {
    title: "beast mode",
    category: "Hip-Hop",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator",
  },
  {
    title: "desi hip hop",
    category: "Hip-Hop",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX2RahGIyQXcJ?utm_source=generator",
  },
  {
    title: "last night beat",
    category: "Hip-Hop",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXdipfKDeMPTE?utm_source=generator",
  },
  {
    title: "the blaze",
    category: "Hip-Hop",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX47STdWoPX6D?utm_source=generator",
  },
  {
    title: "free style beats",
    category: "Hip-Hop",
    embedLink:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXd5gAeNDK56u?utm_source=generator",
  },
];
const addPlaylist = async (req, res) => {
  try {
    const { title, category, embedLink } = req.body;

    // const data = await SpotifyPlaylist.updateMany({

    // });
    console.log(playlist);

    // let data = await Promise.all(
    //   playlist.map(async (i) => {
    //     await SpotifyPlaylist.updateOne(
    //       {},
    //       {
    //         title: i.title,
    //         category: i.category,
    //         embedLink: i.embedLink,
    //       }
    //     );
    //   })
    // );

    const data = await SpotifyPlaylist.create({
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
    const { page = 1, pageSize = 10 } = req.body;
    const skipItems = (Number(page) - 1) * Number(pageSize);

    const caetegoryFilter = req.body.category
      ? { category: { $regex: req.body.category, $options: "i" } }
      : {};
    const searchFilter = req.body.search
      ? { title: { $regex: req.body.search, $options: "i" } }
      : {};
    const playlistCount = await SpotifyPlaylist.countDocuments();
    const data = await SpotifyPlaylist.find({
      ...caetegoryFilter,
      ...searchFilter,
    })
      .skip(skipItems)
      .limit(pageSize);
    return SuccessHandler(
      { message: "Fetched Categories", playlistCount, data },
      200,
      res
    );
  } catch (error) {
    return ErrorHandler(error.message, 500, req, res);
  }
};
module.exports = {
  addPlaylist,
  fetchCategories,
  getPlaylist,
};
