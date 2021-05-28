import * as core from "@actions/core";
import * as github from "@actions/github";

async function run() {
  try {
    const token = core.getInput("repo-token", { required: true });
    const tag = core.getInput("tag", { required: true });
    const sha = github.context.sha;

    const client = new github.GitHub(token);

    core.debug(`tagging #${sha} with tag ${tag}`);

    core.debug(`update`);

    await client.git.updateRef({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      ref: `refs/tags/${tag}`,
      sha: sha,
      force: true
    });
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

run();
