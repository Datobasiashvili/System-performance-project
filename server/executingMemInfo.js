const { exec } = require("child_process");

exec('cat /proc/meminfo', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }

    console.log("RAW MEMINFO:");
    console.log(stdout); 
});