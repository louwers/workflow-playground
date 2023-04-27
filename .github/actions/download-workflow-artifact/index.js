const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

try {
  const allArtifacts = await github.rest.actions.listWorkflowRunArtifacts({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: context.payload.workflow_run.id,
  });
  const matchArtifact = allArtifacts.data.artifacts.filter((artifact) => {
    return artifact.name === core.getInput('artifact-name')
  })[0];
  if (!matchArtifact) throw new Error(`No artifact with name '${core.getInput('artifact-name')}' found`);

  const download = await github.rest.actions.downloadArtifact({
    owner: context.repo.owner,
    repo: context.repo.repo,
    artifact_id: matchArtifact.id,
    archive_format: 'zip',
  });
 
 fs.writeFileSync(`${process.env.GITHUB_WORKSPACE}/${core.getInput('save-as')}`, Buffer.from(download.data));

} catch (error) {
  core.setFailed(error.message);
}