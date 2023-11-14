const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors'); // Added cors middleware

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Use cors middleware to handle CORS headers

// Serve your static files (like images.json)
app.use(express.static(__dirname));

app.get('/images.json', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'images.json'), 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading images.json:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/update-images', async (req, res) => {
  const jsonString = JSON.stringify(req.body, null, 2);

  try {
    // Replace the content of the images.json file
    await fs.writeFile(path.join(__dirname, 'images.json'), jsonString);
    res.status(200).send('Images.json updated successfully!');
  } catch (error) {
    console.error('Error updating images.json:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
