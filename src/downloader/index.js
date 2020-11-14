import os from 'os';
import makeDir from 'make-dir';
import download from 'download';
import { ForEach, Log } from '../utils';
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

  await ForEach(songs, async ({ src, filename }, i) => {
    await download(src, downloadPath, {
      filename: `${i + 1}. ${filename.replace('/', '-')}.mp3`,
    });
    Log(`[${i + 1}/${length}] ${filename}`);
    return;
  });
};

const downloader = async ({ albumName, albumCover, songs }) => {
  try {
    Log('starting download');
    const platform = process.platform;
    if (platform === 'android') {
      try {
        const downloadPath = await makeDir(
          `${os.homedir()}/storage/downloads/${albumName.replace('/', '-')}`
        );

        await dl(downloadPath, albumCover, songs);
        Log('Files saved in: ' + `/downloads/${albumName.replace('/', '-')}`);
      } catch (err) {
        if (err.code) return console.error('ERROR: ' + err.code);
        console.log(err);
      }
    } else {
      const downloadPath = await makeDir(
        `${downloadsFolder()}/${albumName.replace('/', '-')}`
      );

      await dl(downloadPath, albumCover, songs);
      Log('Files saved in: ' + downloadPath);
    }
  } catch (err) {
    if (err.code) return console.error('ERROR: ' + err.code);
    console.log(err);
  }
};

export default downloader;
