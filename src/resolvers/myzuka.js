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
      const albumName = $(pageContent)
        .find('h1')
        .text();
      const songs = $('.player-inline')
        .map((i, elem) => {
          const src =
            'https://myzuka.club' +
            $(elem)
              .find('span.ico')
              .data('url');

          const filename = $(elem)
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
            filename
          };

          if (isLost) {
            return {};
          } else {
            return song;
          }
        })
        .toArray();

      return { albumName, songs };
    } else {
      throw new CustomError('FORBIDDEN');
    }
  } catch (err) {
    if (err.code) return console.error('ERROR: ' + err.code);
    console.log(err);
  }
};

export default myzuka;
