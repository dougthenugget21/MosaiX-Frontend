import Post, { postObj } from "./Post";
const PlaceholderImage = require("@/assets/images/flowers.jpg");
const PlaceholderImageTwo = require("@/assets/images/bad-house.jpg");
const PlaceholderIcon = require("@/assets/images/icon.png");

const exampleUser = {
  id: 1,
  name: "olilliterate",
  title: "The Food Finder",
  image: PlaceholderIcon,
};

const examplePostOne: postObj = {
  id: 1,
  image: PlaceholderImage,
  user: exampleUser,
  title: "Flowers",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  liked: false,
  saved: false,
  tags: ["pretty", "nature", "flowers"],
  latitude: 0,
  longitude: 0,
};

const examplePostTwo: postObj = {
  id: 2,
  image: PlaceholderImageTwo,
  user: exampleUser,
  title: "Scary House",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  liked: false,
  saved: false,
  tags: ["scary", "abandoned", "seaside", "house"],
  latitude: 0,
  longitude: 0,
};
const data = [new Post(examplePostOne), new Post(examplePostTwo)];

export default function getExampleData(): Post[] {
  return data;
}
