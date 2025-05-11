import { useEffect } from 'react';

function App() {
  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;
    const publicKey = await fetch('http://localhost:3001/vapid-public-key').then(res => res.text());

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    });

    await fetch('http://localhost:3001/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  const handleLike = async () => {
    await fetch('http://localhost:3001/like', { method: 'POST' });
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return (
    <div>
      <h1>PWA Push Demo</h1>
      <button onClick={subscribeToPush}>Enable Notifications</button>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return new Uint8Array([...raw].map(char => char.charCodeAt(0)));
}

export default App;
