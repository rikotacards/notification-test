const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { sendNotification, vapidKeys } = require('./webpush');
const subscriptions = [];
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Required for ES modules to get __dirname


// Serve static frontend files from client/dist
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/like', async (req, res) => {
  const payload = JSON.stringify({
    title: 'New Like!',
    body: 'Someone liked your post!',
  });

  for (let sub of subscriptions) {
    console.log('sub', payload)
    await sendNotification(sub, payload);
  }

  res.status(200).json({ success: true });
});

app.get('/vapid-public-key', (req, res) => {
  res.send(vapidKeys.publicKey);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
