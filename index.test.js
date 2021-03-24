const check_domain = require('./check_domain');
const process = require('process');
const cp = require('child_process');
const path = require('path');
const fs = require('fs')
const git = require('isomorphic-git');

test('test invalid email domain', () => {
  return expect(
    check_domain('foo@bar.com', ['example.com'])
  ).toBe(false);
});

test('test ok', () => {
  return expect(
    check_domain('foo@bar.com', ['bar.com'])
  ).toBe(true);
});

test('test runs', async() => {
  let sha = await git.resolveRef({ fs, dir: '.', ref: 'HEAD' })
  process.env.GITHUB_SHA = sha;
  process.env.INPUT_DOMAINS = 'example.com,gmail.com,github.com';
  const ip = path.join(__dirname, 'index.js');
  console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
});
