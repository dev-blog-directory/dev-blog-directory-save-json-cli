#!/usr/bin/env node

'use strict';

const { resolve } = require('path');
const { readJson } = require('fs-extra');
const { save, saveAll } = require('dev-blog-directory-save');

function main(filepath, options) {
  return readJson(filepath).then((docs) => {
    if (!docs) {
      return;
    }

    if (Array.isArray(docs)) {
      docs = docs.filter((doc) => doc && typeof doc === 'object');
      return saveAll(docs, options);
    }

    return save(docs, options);
  });
}

function exit(message) {
  if (message) {
    console.error('\n' + message);

    process.exit(1);
  }

  process.exit(0);
}

if (require.main === module) {
  // Called directly
  const argv = require('minimist')(process.argv.slice(2), {
    boolean: ['merge']
  });
  const filename = argv._[0];
  const option = { merge: Boolean(argv.merge) };
  if (!filename) {
    exit('Usage: save-blog-json [--merge] JSONFILE');
  }

  const filepath = resolve(process.cwd(), filename);

  console.log('json file name: ' + filename);
  console.log('json full path: ' + filepath);
  main(filepath, option)
    .then(() => {
      console.log('Done!');
    })
    .catch(exit);
} else {
  // Required as a module
  module.exports = main;
}
