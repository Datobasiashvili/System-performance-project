const { exec } = require("child_process");

exec('cat /proc/stat', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }

    console.log("RAW CPU INFO:");
    console.log(stdout); 
});