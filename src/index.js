#!/usr/bin/env node
import { argv } from 'yargs';
import { isURL } from 'validator';
import resolvers from './resolvers';
import readline from 'readline-sync';
import downloader from './downloader';
import { Branding, Log, CustomError, CustomLog } from './utils';

const start = async () => {
  try {
    Branding();

    const link = argv._[0] || readline.question(CustomLog('enter link: '));
    if (!isURL(link)) throw new CustomError('INVALIDURL');

    if (link.includes('myzuka.club')) {
      const album = await resolvers.myzuka(link);
      await downloader(album);
    }

    Log('exiting');
    process.exit();
  } catch (err) {
    if (err.code) return console.error('ERROR: ' + err.code);
    console.log(err);
  }
};

start();
