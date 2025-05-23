import { useEffect } from 'react';
const test = 'http://localhost:3001'
const domain = 'https://notification-test-production.up.railway.app'

function App() {
  const subscribeToPush = async () => {
    const registration = await navigator.serviceWorker.ready;
    const publicKey = await fetch(`${domain}/vapid-public-key`).then(res => res.text());

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    });

    await fetch(`${domain}/subscribe`, {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  const unsubscribeFromPush = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;

    // Get the current subscription
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      // Unsubscribe if a subscription exists
      await subscription.unsubscribe();
      console.log('Successfully unsubscribed from push notifications.');

     
    } else {
      console.log('No active subscription to unsubscribe from.');
    }
  } catch (err) {
    console.error('Error during push unsubscription:', err);
  }
};

  const handleLike = async () => {
    await fetch(`${domain}/like`, { method: 'POST' });
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
      <button onClick={unsubscribeFromPush}>unsub</button>
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
