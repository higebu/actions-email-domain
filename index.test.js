const action = require('.')
const core = require('@actions/core')
const process = require('process');
const cp = require('child_process');
const path = require('path');
const fs = require('fs')
const git = require('isomorphic-git');

let input
let err

describe('release-please-action', () => {
  beforeEach(() => {
    input = {}
    err = ''
    core.getInput = name => {
      if (input[name] === undefined || input[name] == null) {
        return defaultInput[name]
      } else {
        return input[name]
      }
    }
    core.setFailed = msg => {
      err = msg
    }
  })

  test('test actual commit', async () => {
    input = {domains: 'gmail.com'}
    git.readCommit = () => {
      return { commit: { author: {email: 'foo@bar.com'} } }
    }
    process.env.GITHUB_SHA = 'f73f44e6a181cc0643fd3cb0717efdf9513e7f0f'
    await action.main()
    expect(err).toBe('invalid email domain')
  });

  test('test invalid email domain', async () => {
    input = {domains: 'example.com'}
    git.readCommit = () => {
      return { commit: { author: {email: 'foo@bar.com'} } }
    }
    await action.main()
    expect(err).toBe('invalid email domain')
  });

  test('test ok', async () => {
    input = {domains: 'bar.com'}
    git.readCommit = () => {
      return { commit: { author: {email: 'foo@bar.com'} } }
    }
    await action.main()
    expect(err).toBe('')
  });
})
