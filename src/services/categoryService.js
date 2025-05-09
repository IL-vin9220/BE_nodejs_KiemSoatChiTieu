let axios = require("axios");
let dotenv = require("dotenv");

dotenv.config();

let statusCodes = require("../config/statusCodes");
let AppError = require("../config/error");

const githubToken = process.env.GITHUB_TOKEN;
const repoOwner = process.env.GITHUB_USERNAME;
const repoName = process.env.REPO_NAME;

const spendingURL = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/Database/User2/data1.json`