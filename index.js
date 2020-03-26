const check_domain = require('./check_domain');
const fs = require('fs')
const git = require('isomorphic-git');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try { 
    let co = await git.readCommit({ fs, dir: '.', oid: github.context.sha })
    const domains = JSON.parse(core.getInput('domains'));
    core.info('check ' + co.commit.author.email + ' matches ' + domains);
    if (!(check_domain(co.commit.author.email, domains))) {
      const err = new Error("invalid email domain");
      throw err;
    }
  }
  catch (err) {
    core.setFailed(err.message);
  }
}

run()
