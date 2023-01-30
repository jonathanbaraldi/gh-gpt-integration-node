// index.ts
import { Configuration, OpenAIApi } from "openai";
import { ArgumentParser } from "argparse";
import { Octokit } from "@octokit/rest";
import * as dotenv from "dotenv";
dotenv.config();
async function main() {
  const prompt = (code) => `explain and give suggestions about this code: ${code}`;
  const { add_argument, parse_args } = new ArgumentParser();
  add_argument("--openai_api_key");
  add_argument("--github_token");
  add_argument("--github_pr_id");
  const params = parse_args();
  const octokit = new Octokit();
  const pull_number = params.gh_pr_id;
  const [owner, repo] = process.env?.GITHUB_REPOSITORY?.split("/");
  async function getPullRequestCommits() {
    const { data: commits2 } = await octokit.pulls.listCommits({
      owner,
      repo,
      pull_number
    });
    return commits2;
  }
  const commits = await getPullRequestCommits();
  commits.map((commit) => {
    commit?.files?.map(async (file) => {
      const { filename } = file;
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path: filename,
        ref: commit.sha
      });
      const content = Buffer.from(response.data.toString(), "base64");
      const openAIConfig = new Configuration({
        apiKey: params.openai_api_key
      });
      const { createCompletion } = new OpenAIApi(openAIConfig);
      const completionConfig = {
        model: "text-davinci-003",
        prompt: prompt(content.toString()),
        temperature: 0.6,
        max_tokens: 4e3
      };
      const completion = await createCompletion(completionConfig);
      await octokit.issues.createComment({
        owner,
        repo,
        issue_number: pull_number,
        body: `${filename}: ${completion.data.choices[0].text}`
      });
    });
  });
}
main();
