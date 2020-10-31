import axios from "axios";

const githubColors = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json",
});

export default githubColors;
