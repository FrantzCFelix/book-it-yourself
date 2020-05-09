/* eslint-disable arrow-parens */
"use strict";

/* eslint-disable max-len */
const mongoose = require(`mongoose`);
const db = require(`../models`);

mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/bookityourself`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const postsSeed = [
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fc`),
    type: `artistNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203caba9`),
    name: `frantz`,
    title: `Looking for a show`,
    description: `Looking for a show, any ideas please get in touch!`,
    city: `Seattle`,
    address: `2604 1st Ave, Seattle, WA 98121`,
    latLng: `[{lat: 47.615500},{lng: -122.349760}]`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fd`),
    type: `showNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabaa`),
    name: `ryan`,
    title: `Looking for a band`,
    description: `Looking for a band, any ideas please get in touch!`,
    city: `Seattle`,
    address: `925 E Pike St, Seattle, WA 98122`,
    latLng: `[{lat: 47.613838},{lng: -122.319748}]`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8fe`),
    type: `artistNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabab`),
    name: `duc`,
    title: `Looking for a DJ`,
    description: `Looking for a DJ, any ideas please get in touch!`,
    city: `Seattle`,
    address: `800 Occidental Ave S, Seattle, WA 98134`,
    latLng: `[{lat: 47.594971},{lng: -122.331520}]`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de8ff`),
    type: `showNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabac`),
    name: `remy`,
    title: `Looking for a guitar`,
    description: `Looking for a guitar, any ideas please get in touch!`,
    city: `Shoreline`,
    address: `16101 Greenwood Ave N, Shoreline, WA 98133`,
    latLng: `[{lat: 47.747520},{lng: -122.358459}]`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
  {
    _id: mongoose.Types.ObjectId(`5ea866f6298ddd2a5c1de900`),
    type: `artistNeeded`,
    author: mongoose.Types.ObjectId(`5ea863ce84d81942203cabad`),
    name: `george`,
    title: `Looking for a place to crash`,
    description: `Looking for a place to crash, any ideas please get in touch!`,
    city: `Seattle`,
    address: `85 Pike St, Seattle, WA 98101`,
    latLng: `[{lat: 47.609459},{lng: -122.341057}]`,
    startDate: `2019-01-01T00:00:00.000Z`,
    endDate: `2021-01-01T00:00:00.000Z`,
  },
];

db.Classified.deleteMany({})
  .then(() => db.Classified.collection.insertMany(postsSeed))
  .then(data => {
    console.log(`${data.result.n} classifieds posted!`);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
