const { execFile } = require("child_process");
const path = require("path");

const binaryPath = path.join(__dirname, '..', 'bin', 'ram_stats');

exports.getRamStats = (req, res) => {
    execFile(binaryPath, (error, stdout) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json(JSON.parse(stdout));
    });
};

exports.emitRamStats = (io) => {
    execFile(binaryPath, (error, stdout, stderr) => {
        if (error) {
            console.error(`C++ Engine Error: ${error.message}`);
            return;
        }
        
        try {
            const stats = JSON.parse(stdout);
            io.emit('ramUpdate', stats);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
        }
    });
};