import os from 'os';
import makeDir from 'make-dir';
import log from '../utils/log';
import download from 'download';
import forEach from '../utils/foreach';
import downloadsFolder from 'downloads-folder';

const dl = async (downloadPath, albumCover, songs) => {
  const length = songs.length;
  if (albumCover) {
    const ext = albumCover.split('/').reverse()[0].split('.').pop();
    if (/(?:png|jpg|jpeg|svg|gif)$/.test(ext)) {
      await download(albumCover, downloadPath, { filename: `cover.${ext}` });
    } else {
      await download(albumCover, downloadPath);
    }
  }

  await forEach(songs, async ({ src, filename }, i) => {
    filename = `${i + 1}. ${filename.replace('/', '-')}`;
    const percent = Math.round(((i + 1) * 100) / length) + '%';
    await download(src, downloadPath, { filename: `${filename}.mp3` });
    log(`downloaded [${filename}](${percent}) `);
    return;
  });
};

const downloader = async ({ albumName, albumCover, songs }) => {
  try {
    log('starting download');
    const platform = process.platform;
    if (platform === 'android') {
      try {
        const downloadPath = await makeDir(
          `${os.homedir()}/storage/downloads/${albumName.replace('/', '-')}`
        );

        await dl(downloadPath, albumCover, songs);
        log(
          'completed download. Files saved in: ' +
            `/downloads/${albumName.replace('/', '-')}`
        );
      } catch (err) {
        if (err.code) return console.error('ERROR: ' + err.code);
        console.log(err);
      }
    } else {
      const downloadPath = await makeDir(
        `${downloadsFolder()}/${albumName.replace('/', '-')}`
      );

      await dl(downloadPath, albumCover, songs);
      log('completed download. Files saved in: ' + downloadPath);
    }
  } catch (err) {
    if (err.code) return console.error('ERROR: ' + err.code);
    console.log(err);
  }
};

export default downloader;
