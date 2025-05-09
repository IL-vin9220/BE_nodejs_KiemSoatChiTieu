let indexUser = 2;
const repoOwner = process.env.GITHUB_USERNAME;
const repoName = process.env.REPO_NAME;

// folder link
let billFolder = "data/Bill";
let spendFolder = "data/Database";
let accFolder = "data/Account";
let feedbackFolder = "data/Feedback";
let notifiFolder = "data/Notification";
let planFolder = "data/Spendingplan";
let logFolder = "data/Log";
let settingFolder = "data/Setting";
let dailyNoteFolder = "data/DailyNote";
let avatarFolder = "assest/UserImg/User";
let categoryFolder = "data/Category";
let urlRoot = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/`;

let directoryBill = urlRoot + billFolder+"/User"+indexUser+"/bill2024.json";
let directorySpending = urlRoot + spendFolder+"/User"+indexUser+"/data1.json";
let directoryLog = urlRoot + logFolder+"/User"+indexUser+"/log2024.json";
let directoryDailyNote = urlRoot + dailyNoteFolder+"/User"+indexUser;

let directoryAcc = urlRoot + accFolder+"/account.json";
let directoryFb = urlRoot + feedbackFolder+"/User"+indexUser+"/feedback.json";
let directoryNoti = urlRoot + notifiFolder+"/notification.json";
let directoryPlan = urlRoot + planFolder+"/User"+indexUser+"/plan.json";
let directorySetting = urlRoot + settingFolder+"/User"+indexUser+"/setting.json";
let directFileAvatar = urlRoot + avatarFolder+indexUser+"/Avatar";
let directoryCategory = urlRoot + categoryFolder+"/User"+indexUser+"/categories.json";

module.exports = {
    indexUser,
    directoryBill,
    directorySpending,
    directoryLog,
    directoryDailyNote,
    directoryAcc,
    directoryFb,
    directoryNoti,
    directoryPlan,
    directorySetting,
    directFileAvatar,
    directoryCategory,
};