import { argv } from 'yargs';
import log from './utils/log';
import { isURL } from 'validator';
import resolvers from './resolvers';
import downloader from './downloader';
import CustomError from './utils/customerror';

// const sample = {
//   albumName: 'Dan Croll - From Nowhere (2013)',
//   songs: [
//     {
//       src:
//         'https://myzuka.club/Song/Play/1432280?t=637259439515667318&s=302b50eb64710407d6aae4c4261f7cae',
//       filename: 'Jailer1'
//     },
//     {
//       src:
//         'https://myzuka.club/Song/Play/1432280?t=637259439515667318&s=302b50eb64710407d6aae4c4261f7cae',
//       filename: 'Jailer2'
//     }
//   ]
// };
// await downloader(sample);

(async () => {
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
})();
