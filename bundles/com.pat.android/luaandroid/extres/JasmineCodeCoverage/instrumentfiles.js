const cp = require('child_process');
const nodeUtil = require('util');

function startExecution() {
    try {
        let projectLocation = process.argv[4];

        console.log(`Project location is :: ${projectLocation}`);
        
        let execName = (process.platform === 'win32') ? 'nyc.cmd' : 'nyc',
            options = {stdio : 'inherit'},
            cmdToExecute = `${projectLocation}/node_modules/.bin/${execName} instrument ${process.argv[2]} --output ${process.argv[3]}`;

        console.log(`Instrument command is ::  ${cmdToExecute}`);

        cp.execSync(cmdToExecute, options);

        console.log(`Instanbul executing on :: ${process.argv[4]}`);

    } catch(err) {
        console.log(`Error while executing Instanbul :: ${nodeUtil.inspect(err)}`);

        console.log(`could not complete process.`);
    }
}

startExecution();