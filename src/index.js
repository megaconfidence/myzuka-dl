import { argv } from 'yargs';
import resolvers from './resolvers';

const { url } = argv;

const sample = {
    name: 'Dan Croll - From Nowhere (2013)',
    songs: [
      {
        src: '/Song/Play/3382176?t=637259416253685454&s=2375122c89656fea231520bc9fad5077',
        name: 'From Nowhere'
      },
      {
        src: '/Song/Play/3382177?t=637259416253685454&s=e8c6b871bcad5801c798c1cabd146c05',
        name: 'Compliment Your Soul'
      },
      {
        src: '/Song/Play/3382178?t=637259416253841712&s=87c3ad37121df503dc12d07883c580ae',
        name: 'Wanna Know'
      },
      {
        src: '/Song/Play/3382179?t=637259416253841712&s=5fd2633faa8e3c5aaf0c88b285ae2ee8',
        name: 'Only Ghost'
      },
      {
        src: '/Song/Play/3382180?t=637259416253841712&s=946c76fe5895331214651662b0016053',
        name: 'From Nowhere (Baardsen Remix)'
      }
    ]
  };

(async () => {
  if (url.includes('myzuka.club')) {
    const result = await resolvers.myzuka(url);
    console.log(result);
  }
})();
