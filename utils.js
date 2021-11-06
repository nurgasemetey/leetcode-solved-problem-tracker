const axios = require("axios");
const fs = require('fs');
const query = (user) =>
    `{
    "operationName": "getUserProfile",
    "variables": { "username" : "${user}" },
    "query": "query getUserProfile($username: String!) { allQuestionsCount { difficulty count } matchedUser(username: $username) { profile { realName userAvatar starRating ranking } submitStats { acSubmissionNum { difficulty count } } } }"
}`;


const getUser = async (user) => {
    const {
        data: { data },
    } = await axios.post(
        "https://leetcode.com/graphql",
        query(user),
        {
            headers: {
                "content-type": "application/json",
            },
        }
    );
    return data;
}

const addNewEntry = (buff, date, val) => {
    let data = JSON.parse(buff.toString('utf8'));
    var map = new Map(data.map(i => [i.date, i.count]));
    map.set(date, val);
    const arr = Array.from(map, ([date, count]) => ({ date, count }));
    // console.log(arr);
    return Buffer.from(JSON.stringify(arr)).toString("base64");
}

async function start() {
    const buff = fs.readFileSync('tmp/test.json');
    var userData = await getUser("someuser");
    // console.log(JSON.stringify(userData));
    const newBuff = addNewEntry(buff, new Date().toISOString().slice(0,10), userData["matchedUser"]["submitStats"]["acSubmissionNum"][0]["count"]);
    // console.log(newBuff);
    // var image = await createImage(["2021-11-01", "2021-11-02","2021-11-03","2021-11-04", "2021-11-05"], [1,2,5,5,5]);
}


// start()


module.exports = {
    getUser,addNewEntry
}