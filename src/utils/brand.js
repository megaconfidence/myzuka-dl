import chalk from 'chalk';
import figlet from 'figlet';

const brand = () => {
  console.log(
    chalk.green.bold(
      figlet.textSync('myzuka-dl', {
        font: 'Larry 3D',
      })
    )
  );
};

export default brand;
