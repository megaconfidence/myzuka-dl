import chalk from 'chalk';
import { terminal as term } from 'terminal-kit';

const progressbar = (items = []) => {
  /**
   * The items array is being maped over to create a new
   * instance of it in memory to avoid leaks
   */
  const list = items.map((i) => i);
  let countDown = list.length;

  const progressBar = term.progressBar({
    eta: true,
    width: 80,
    percent: true,
    items: list.length,
    title: chalk.green('[myzuka-dl] '),
  });

  const start = () => {
    if (!list.length) return;
    progressBar.startItem(list.shift());
  };

  const done = (task) => {
    progressBar.itemDone(task);
    countDown--;
    if (!countDown) {
      setTimeout(() => {
        term('\n');
        process.exit();
      }, 200);
    }
    start();
  };

  start();
  return done;
};

export default progressbar;
