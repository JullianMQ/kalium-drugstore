import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const serviceAccount = JSON.parse(
  await readFile(
    new URL('./serviceAccountKey.json', import.meta.url)
  )
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(join(__dirname, 'public')));

// Serve static files from the 'images' directory
app.use('/images', express.static(join(__dirname, 'images')));

app.post('/addProduct', async (req, res) => {
  const newProduct = req.body;

  try {
    const docRef = await db.collection('products').add(newProduct);
    res.status(200).send({ message: 'Product added successfully', id: docRef.id });
  } catch (error) {
    res.status(500).send({ message: 'Failed to add product', error: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
