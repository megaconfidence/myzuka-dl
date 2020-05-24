import makeDir from 'make-dir';
import log from '../utils/log';
import download from 'download';
import downloadsFolder from 'downloads-folder';
import forEach from '../utils/foreach';

const downloader = async ({ albumName, albumArt, songs }) => {
  try {
    log('starting download');
    const length = songs.length;
    const downloadPath = await makeDir(`${downloadsFolder()}/${albumName}`);

    if (albumArt) {
      await download(albumArt, downloadPath);
    }

    await forEach(songs, async ({ src, filename }, i) => {
      filename = `${i + 1}. ${filename.replace('/', '-')}`;
      const percent = ((i + 1) * 100) / length + '%';
      await download(src, downloadPath, { filename });
      log(`downloaded [${filename}](${percent}) `);
      return;
    });

    log('completed download');
  } catch (err) {
    if (err.code) return console.error('ERROR: ' + err.code);
    console.log(err);
  }
};

export default downloader;
