import chalk from 'chalk';
const log = output => {
  console.log(chalk.green.bold('[myzuka-dl] ') + output);
};
export default log;
