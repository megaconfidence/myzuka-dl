import chalk from 'chalk';

const Log = (text) => console.log(chalk.green.bold('[myzuka-dl] ') + text);
const CustomLog = (text) => chalk.green.bold('[myzuka-dl] ') + text;
export { Log, CustomLog };
