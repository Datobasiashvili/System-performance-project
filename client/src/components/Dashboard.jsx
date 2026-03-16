import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Dashboard = () => {
  const [ramData, setRamData] = useState({
    total: 0,
    available: 0,
    percent: 0,
    active: 0
  });
  const [cpuUsage, setCpuUsage] = useState(0);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('ramUpdate', (data) => {
      if (data) setRamData(data);
    });

    socket.on('cpuUpdate', (data) => {
        if (data) setCpuUsage(data.usage || data.percent || 0);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('ramUpdate');
      socket.off('cpuUpdate');
    };
  }, []);

  const formatGB = (value) => {
    if (!value || isNaN(value)) return "0.00";
    return (value / 1024 / 1024).toFixed(2);
  };

  return (
    <div>
      <h1>System Monitor {isConnected ? '🟢' : '🔴'}</h1>

      <div className="stats-container">
        <h2>CPU usage: {cpuUsage.toFixed(2)}%</h2>
        <h2>RAM Usage: {ramData.percent ? ramData.percent.toFixed(2) : "0.00"}%</h2>
        <p>Available: {formatGB(ramData.available)} GB</p>

        <div style={{ width: '100%', background: '#eee', height: '10px' }}>
          <div style={{
            width: `${ramData.percent}%`,
            background: ramData.percent > 80 ? 'red' : 'green',
            height: '100%',
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;