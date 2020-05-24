import makeDir from 'make-dir';
import log from '../utils/log';
import download from 'download';
import downloadsFolder from 'downloads-folder';
import forEach from '../utils/foreach';

const downloader = async ({ albumName, albumCover, songs }) => {
  try {
    log('starting download');
    const length = songs.length;
    const downloadPath = await makeDir(
      `${downloadsFolder()}/${albumName.replace('/', '-')}`
    );

    if (albumCover) {
      const ext = albumCover
        .split('/')
        .reverse()[0]
        .split('.')
        .pop();
      if (/(?:png|jpg|jpeg|svg|gif)$/.test(ext)) {
        await download(albumCover, downloadPath, { filename: `cover.${ext}` });
      } else {
        await download(albumCover, downloadPath);
      }
    }

    await forEach(songs, async ({ src, filename }, i) => {
      filename = `${i + 1}. ${filename.replace('/', '-')}`;
      const percent = ((i + 1) * 100) / length + '%';
      await download(src, downloadPath, { filename });
      log(`downloaded [${filename}](${percent}) `);
      return;
    });

    log('completed download. Files saved in: ' + downloadPath);
  } catch (err) {
    if (err.code) return console.error('ERROR: ' + err.code);
    console.log(err);
  }
};

export default downloader;
/[.]/.exec('filename.js') ? /[^.]+$/.exec('filename.js') : undefined;
