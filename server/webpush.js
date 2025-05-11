const webpush = require('web-push');
const vapidKeys = webpush.generateVAPIDKeys();

webpush.setVapidDetails(
  'mailto:your@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

function sendNotification(subscription, payload) {
  return webpush.sendNotification(subscription, payload);
}

module.exports = { sendNotification, vapidKeys };
