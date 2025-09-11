// Script to login to GitHub, read commit messages, and parse out time, space, and folder name from messages like:
// Time: 2 ms (85.98%), Space: 62.3 MB (15.76%) - LeetHub
//
// Requirements:
// - Install octokit: npm install @octokit/rest
// - Set GITHUB_TOKEN environment variable with a personal access token

const { Octokit } = require("@octokit/rest");
const process = require("process");
const fs = require('fs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
    throw new Error("Set GITHUB_TOKEN environment variable.");
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const REPO_OWNER = "dstrimble"; // <-- Change this to your repo owner
const REPO_NAME = "leetcoderesearch";  // <-- Change this to your repo name

const pattern = /Time: ([\d.]+) ms \(([^)]+)%\), Space: ([\d.]+) MB \(([^)]+)%\) - (\w+)/;

async function getAllCommits(octokit, owner, repo) {
    let page = 1;
    let allCommits = [];
    let fetched;
    do {
        fetched = await octokit.repos.listCommits({
            owner,
            repo,
            per_page: 100,
            page
        });
        allCommits = allCommits.concat(fetched.data);
        page++;
    } while (fetched.data.length === 100);
    return allCommits;
}

async function getDifficultyFromReadmeRemote(folder) {
    try {
        // README.md is in the repo at <folder>/README.md
        const path = `${folder}/README.md`;
        const resp = await octokit.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path
        });
        // README may be base64 encoded
        let content = '';
        if (resp.data && resp.data.content) {
            content = Buffer.from(resp.data.content, resp.data.encoding).toString();
        } else if (typeof resp.data === 'string') {
            content = resp.data;
        }
        // Debug output
        console.log(`Fetched remote README for ${folder}, preview: ${content.slice(0, 100)}`);
        const match = content.match(/<h3>(Easy|Medium|Hard)<\/h3>/i);
        if (match) {
            console.log(`Extracted difficulty: ${match[1]} from remote README for ${folder}`);
            return match[1];
        } else {
            console.log(`Difficulty not found in remote README for ${folder}`);
        }
    } catch (e) {
        console.log(`Error fetching remote README for ${folder}:`, e.message);
    }
    return '';
}

async function main() {
    const commits = await getAllCommits(octokit, REPO_OWNER, REPO_NAME);
    const rows = [['sha','time_ms','time_pct','space_mb','space_pct','folder','difficulty']];
    for (const commit of commits) {
        const msg = commit.commit.message;
        const match = pattern.exec(msg);
        if (match) {
            let folder = '';
            const filesResp = await octokit.repos.getCommit({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                ref: commit.sha
            });
            if (filesResp.data.files && filesResp.data.files.length > 0) {
                const filePath = filesResp.data.files[0].filename;
                folder = filePath.split('/')[0];
            } else {
                folder = match[5];
            }
            const difficulty = await getDifficultyFromReadmeRemote(folder);
            const [_, time_val, time_pct, space_val, space_pct] = match;
            rows.push([commit.sha, time_val, time_pct, space_val, space_pct, folder, difficulty]);
        }
    }
    const csv = rows.map(row => row.join(',')).join('\n');
    fs.writeFileSync('github_commits.csv', csv);
    console.log('CSV written to github_commits.csv');
}

main().catch(err => console.error(err));
