import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); 

const Dashboard = () => {
  const [ramData, setRamData] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('ramUpdate', (data) => {
      setRamData(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('ramUpdate');
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0a0a', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <h1>System Monitor {isConnected ? '🟢' : '🔴'}</h1>
      
      {ramData ? (
        <div className="stats-container">
          <h2>RAM Usage: {ramData.percent}%</h2>

          <p>Available: {(ramData.available / 1024 / 1024).toFixed(2)} GB</p>
        </div>
      ) : (
        <p>Waiting for kernel data...</p>
      )}
    </div>
  );
};

export default Dashboard;