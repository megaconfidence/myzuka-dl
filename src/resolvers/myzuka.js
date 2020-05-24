import cheerio from 'cheerio';
import fetch from 'node-fetch';
import CustomError from '../utils/customerror';

const myzuka = async url => {
  try {
    const page = await fetch(url)
      .then(res => res.text())
      .then(body => body);
    const $ = cheerio.load(page);
    const pageContent = $('body').find('#bodyContent');

    if (pageContent.length) {
      const name = $(pageContent)
        .find('h1')
        .text();
      const songs = $('.player-inline')
        .map((i, elem) => {
          const src = $(elem)
            .find('span.ico')
            .data('url');

          const name = $(elem)
            .find('span.ico')
            .attr('data-title')
            .split(' - ')[1];

          const isLost = $(elem)
            .find('.details .label-danger')
            .text()
            ? true
            : false;

          const song = {
            src,
            name
          };

          if (isLost) {
            return {};
          } else {
            return song;
          }
        })
        .toArray();

      return { name, songs };
    } else {
      throw new CustomError('FORBIDDEN')
    }
  } catch ({code}) {
    console.error('ERROR: '+code);
  }
};

export default myzuka;
