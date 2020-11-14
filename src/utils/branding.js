import chalk from 'chalk';
import figlet from 'figlet';

const Branding = () => {
  console.log(
    chalk.green.bold(
      figlet.textSync('myzuka-dl', {
        font: 'Larry 3D',
      })
    )
  );
};

export default Branding;
