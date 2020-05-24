#!/usr/bin/env node
import { argv } from 'yargs';
import log from './utils/log';
import { isURL } from 'validator';
import resolvers from './resolvers';
import downloader from './downloader';
import CustomError from './utils/customerror';

const start = async () => {
  try {
    const url = argv._[0];
    if (!url || !isURL(url)) throw new CustomError('INVALIDURL');
    if (url.includes('myzuka.club')) {
      const album = await resolvers.myzuka(url);
      await downloader(album);
    }
    log('exiting');
    process.exit();
  } catch (err) {
    if (err.code) return console.error('ERROR: ' + err.code);
    console.log(err);
  }
};

start();
