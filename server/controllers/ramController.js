const { execFile } = require("child_process");
const path = require("path");

const binaryPath = path.join(__dirname, '..', 'bin', 'ram_stats');

let lastKnownRamStats = { total: 0, avalaible: 0, percent: 0, active: 0, dirty: 0 };

exports.getRamStats = (req, res) => {
    res.json(lastKnownRamStats);
};

exports.emitRamStats = (io) => {
    execFile(binaryPath, (error, stdout, stderr) => {
        if (error) {
            console.error(`C++ Engine Error: ${error.message}`);
            return;
        }
        try {
            const stats = JSON.parse(stdout);
            lastKnownRamStats = stats;

            io.emit('ramUpdate', lastKnownRamStats);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
        }
    });
};