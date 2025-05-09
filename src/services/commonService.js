let axios = require("axios");
let dotenv = require("dotenv");
let statusCodes  = require("../config/statusCodes");
const AppError = require("../config/error");

dotenv.config();

const githubToken = process.env.GITHUB_TOKEN;
const repoOwner = process.env.GITHUB_USERNAME;
const repoName = process.env.REPO_NAME;

// get data
async function getAll(url){
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${githubToken}`, // hoặc gán token trực tiếp nếu test tạm
                Accept: 'application/vnd.github.v3+json'
            }
        });
    
        // GitHub trả về nội dung base64
        const contentBase64 = response.data.content;
        const contentDecoded = Buffer.from(contentBase64, 'base64').toString('utf-8');

        const json = JSON.parse(contentDecoded);
        return json;
    
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu từ GitHub:', error.message);
        return [];
    }
}

// push data
async function pushData(url, data){
    try{
        const response = await axios.put(url, data, {
            headers: {
                Authorization: `token ${githubToken}`
            }
        });
    } catch (error) {
        throw new AppError("Lỗi khi đẩy dữ liệu lên github", statusCodes.INTERNAL_SERVER_ERROR);
    }
}

// encode & standard data
async function standardDataBeforePush(url, data){
    let encodeBase64 = Buffer.from(JSON.stringify(data)).toString("base64");

    return {
        message: "Update new spending record",
        content: encodeBase64,
        sha: await getFileSha(url),
    }
}

// Lấy SHA của file hiện tại
async function getFileSha(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
  
      return response.data.sha;  // Lấy SHA của file
    } catch (error) {
      console.log('File not found on GitHub. Creating new file...');
      return null;  // Nếu file chưa tồn tại, trả về null
    }
}

async function getAllDataFile(urlFolder){
    try{
        const urlFolder = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/data/Bill`;

        const response = await axios.get(urlFolder, {
            headers: {
                Authorization: `Bearer ${githubToken}`, // hoặc gán token trực tiếp nếu test tạm
                Accept: 'application/vnd.github.v3+json'
            }
        });

        let result = [];

        console.log(response.data);

        response.data.forEach(item => {
            result.push(item.name);
        });

        return result;
    }
    catch(error){
        throw new AppError("Lỗi lấy danh sách dữ liệu", statusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    getAll,
    pushData,
    standardDataBeforePush,
    getAllDataFile,
};