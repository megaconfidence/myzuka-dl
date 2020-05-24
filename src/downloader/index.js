import makeDir from 'make-dir';
import log from '../utils/log';
import download from 'download';
import downloadsFolder from 'downloads-folder';

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const downloader = async ({ albumName, songs }) => {
  try {
    log('starting download');
    const length = songs.length;
    const downloadPath = await makeDir(`${downloadsFolder()}/${albumName}`);
    await Promise.all(
      songs.map(async ({ src, filename }, i) => {
        filename = `${i} - ${filename}`;
        const percent = ((i + 1) * 100) / length + '%';
        await download(src, downloadPath, { filename });
        log(`[${percent}] ${filename}`);
        return;
      })
    );
  } catch (err) {
    if (err.code) return console.error('ERROR: ' + err.code);
    console.log(err);
  }
};

export default downloader;
