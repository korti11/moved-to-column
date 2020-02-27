const core = require('@actions/core');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  if(!process.env.GITHUB_TOKEN) {
    core.setFailed('GITHUB_TOKEN missing, must be set with ${{secrets.GITHUB_TOKEN}}')
  }

  try { 
    const {eventName, payload} = github.context;
    const action = payload.action;
    const columnId = payload.project_card.column_id

    validateEvent(eventName, action);

    const octokit = new github.GitHub(process.env.GITHUB_TOKEN)
    const { data: projectColumn } = await octokit.projects.getCard({
      column_id: columnId
    });

    core.setOutput("column_name", projectColumn.name)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

function validateEvent(eventName, action) {
  if(eventName != 'project_card' || action != 'moved') {
    throw new Error(`Only the push event is allowed, used event: ${eventName}`)
  }
}

run()
