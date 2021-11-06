const core = require('@actions/core');
const github = require('@actions/github');

const { getUser, addNewEntry } = require('./utils');



async function start() {
  try {
    // `who-to-greet` input defined in action metadata file
    const username = core.getInput('username');
    var userData = await getUser(username);
    const token = core.getInput("github-token");
    const octokit = github.getOctokit(token);

    try {
      const fileResult = await octokit.rest.repos.getContent({
        ...github.context.repo,
        path: 'data.json',
      })
      // console.log(fileResult);

      console.log(JSON.parse(Buffer.from(fileResult.data.content, 'base64')).toString());
      const newBuff = addNewEntry(Buffer.from(fileResult.data.content, 'base64'), new Date().toISOString().slice(0,10), userData["matchedUser"]["submitStats"]["acSubmissionNum"][0]["count"]);

      await octokit.rest.repos.createOrUpdateFileContents({
        ...github.context.repo,
        sha: fileResult.data.sha,
        path: 'data.json',
        message: 'create testfile',
        content: newBuff,
      });

    } catch (error) {
      console.error(error);

      if(error.status==404) {
        const newBuff = addNewEntry(Buffer.from("[]"), new Date().toISOString().slice(0,10), userData["matchedUser"]["submitStats"]["acSubmissionNum"][0]["count"]);

        await octokit.rest.repos.createOrUpdateFileContents({
          ...github.context.repo,
          sha: github.context.sha,
          path: 'data.json',
          message: 'create testfile',
          content: newBuff,
        });
      }
    }
    
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
}
start();

