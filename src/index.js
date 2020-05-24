import { argv } from 'yargs';
import resolvers from './resolvers';
import CustomError from './utils/customerror';
import downloader from './downloader';

const { url } = argv;

// const sample = {
//   albumName: 'Dan Croll - From Nowhere (2013)',
//   songs: [
//     {
//       src:
//         'https://myzuka.club/Song/Play/1432280?t=637259439515667318&s=302b50eb64710407d6aae4c4261f7cae',
//       filename: 'Jailer'
//     }
//   ]
// };

(async () => {
  try {
    console.time('myzuka-dl');
    if (!url) throw new CustomError('NOURL');
    if (url.includes('myzuka.club')) {
      const album = await resolvers.myzuka(url);
      await downloader(album);
      console.timeEnd('myzuka-dl');
      process.exit();
    }
    // downloader(sample);
  } catch (err) {
    if (err.code) return console.error('ERROR: ' + err.code);
    console.log(err);
  }
})();
