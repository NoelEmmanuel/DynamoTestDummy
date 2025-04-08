const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

const app = express();
app.use(cors());
app.use(express.json());

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

app.post('/signup', async (req, res) => {
    const {
      firstName, lastName, email, phone, username, password, occupation
    } = req.body;
  
    const item = {
      id: `${Date.now()}`,
      firstName,
      lastName,
      email,
      phone,
      username,
      password,
      occupation
    };
  
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Item: item
    };
  
    console.log("Saving item to DynamoDB:", item);
  
    try {
      await dynamoDb.put(params).promise();
      console.log("✅ Saved successfully!");
      res.status(200).json({ message: 'User signed up successfully!' });
    } catch (err) {
      console.error('DynamoDB Error:', err);
      res.status(500).json({ error: 'Could not sign up user' });
    }
  });
  

  app.get('/test-dynamodb', async (req, res) => {
    const baseDynamoDB = new AWS.DynamoDB(); // low-level client
  
    try {
      const result = await baseDynamoDB.listTables().promise();
      console.log("Connected! Tables:", result.TableNames);
      res.status(200).json({ success: true, tables: result.TableNames });
    } catch (err) {
      console.error("DynamoDB Connection Error:", err);
      res.status(500).json({ success: false, error: err });
    }
  });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
