import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import history from 'connect-history-api-fallback';

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.resolve(__dirname, '../dist'), { maxAge: '1y', etag: false}));
app.use(history());

// const products = [{
//     id: '123',
//     name: 'Running Shoes',
//     price: '60.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-1.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '234',
//     name: 'Basketball Shoes',
//     price: '120.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-2.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '345',
//     name: 'Bright Red Shoes',
//     price: '90.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-3.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '456',
//     name: 'Fancy Shoes',
//     price: '190.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-4.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '567',
//     name: 'Skateboard Shoes',
//     price: '75.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-5.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '678',
//     name: 'High Heels',
//     price: '200.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-6.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '789',
//     name: 'Dark Shoes',
//     price: '100.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-7.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '890',
//     name: 'Classic Shoes',
//     price: '40.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-8.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '901',
//     name: 'Plain Shoes',
//     price: '54.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-9.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '901',
//     name: 'Teal Dress Shoes',
//     price: '330.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-10.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '111',
//     name: 'Fancy Boots',
//     price: '230.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-11.jpg',
//     averageRating: '5.0',
//   }, {
//     id: '222',
//     name: 'Gold Shoes',
//     price: '180.00',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel enim quam. Mauris nisl tellus, fringilla sed cursus eu, convallis non diam. Mauris quis fringilla nunc. Aenean leo lacus, lobortis sit amet venenatis a, aliquet tristique erat. Etiam laoreet mauris ut dapibus tincidunt. Pellentesque non ex at nisl ornare aliquam sed non ante. Nam lobortis magna id massa cursus, sit amet condimentum metus facilisis. Donec eu tortor at est tempor cursus et sed velit. Morbi rutrum elementum est vitae fringilla. Phasellus dignissim purus turpis, ac varius enim auctor vulputate. In ullamcorper vestibulum mauris. Nulla malesuada pretium mauris, lobortis eleifend dolor iaculis vitae.',
//     imageUrl: 'images/shoes-12.jpg',
//     averageRating: '5.0',
//   }
// ];
  
// export let cartItems = [
//     products[0],
//     products[2],
//     products[3],
// ];
  

app.get('/hello', (req, res) => {
    res.send('Hello!');
});

// app.get('/hello/:name', (req, res) => {
//     res.send(`Hello! ${req.params.name}`);
// });

// app.post('/hello/', (req, res) => {
//     res.send(`Hello! ${req.body.name}`);
// });



app.get('/fsv/products', async (req, res) => {
  const client = await MongoClient.connect(
    process.env.MONGO_USER && process.env.MONGO_PASS 
    ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jfdsz.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017',
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
  const db = client.db(process.env.MONGO_DBNAME || 'vue-db');
  const products = await db.collection('products').find({}).toArray();
  res.status(200).json(products);
  client.close();
});

app.get('/fsv/users/:userId/cart', async (req, res) => {
  const { userId } = req.params;
  const client = await MongoClient.connect(
     process.env.MONGO_USER && process.env.MONGO_PASS 
    ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jfdsz.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017',
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
  const db = client.db(process.env.MONGO_DBNAME || 'vue-db');  
  const user = await db.collection('users').findOne({ id: userId });
  if (!user) return res.status(404).json('Could not find user!');
  const products = await db.collection('products').find({}).toArray();
  const cartItemIds = user.cartItems;
  const cartItems = cartItemIds.map(id =>
    products.find(product => product.id === id));
  res.status(200).json(cartItems);
  client.close();
});

app.get('/fsv/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const client = await MongoClient.connect(
      process.env.MONGO_USER && process.env.MONGO_PASS 
      ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jfdsz.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
      : 'mongodb://localhost:27017',
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    const db = client.db(process.env.MONGO_DBNAME || 'vue-db');
    const product = await db.collection('products').findOne({ id: productId });
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json('Could not find the product!');
    }
    client.close();
});

app.post('/fsv/users/:userId/cart', async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;
  const client = await MongoClient.connect(
    process.env.MONGO_USER && process.env.MONGO_PASS 
    ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jfdsz.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017',
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
  const db = client.db(process.env.MONGO_DBNAME || 'vue-db');
  await db.collection('users').updateOne({ id: userId }, {
    $addToSet: { cartItems: productId },
  });
  const user = await db.collection('users').findOne({ id: userId });
  const products = await db.collection('products').find({}).toArray();
  const cartItemIds = user.cartItems;
  const cartItems = cartItemIds.map(id =>
    products.find(product => product.id === id));
  res.status(200).json(cartItems);
  client.close();
});

app.delete('/fsv/users/:userId/cart/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  const client = await MongoClient.connect(
    process.env.MONGO_USER && process.env.MONGO_PASS 
    ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jfdsz.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017',
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
  const db = client.db(process.env.MONGO_DBNAME || 'vue-db');
  await db.collection('users').updateOne({ id: userId }, {
    $pull: { cartItems: productId },
  });
  const user = await db.collection('users').findOne({ id: userId });
  const products = await db.collection('products').find({}).toArray();
  const cartItemIds = user.cartItems;
  const cartItems = cartItemIds.map(id =>
    products.find(product => product.id === id));

  res.status(200).json(cartItems);
  client.close();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.listen(procee.env.PORT|| 8000, () => {
    console.log('Server is listening on port 8000');
});


// Commands
// initialize project with package,json - npm init -y
// install express js - npm install exress
// run server -  npx node-babel src/server.js
// install dev dependencies - npm install @babel/cli @babel/core @babel/node @babel/plugin-transform-runtime @babel/preset-env
// install restart server dev dependency - npm install --save-dev nodemon
// run server with nodemon - npx nodemon --exec npx node-babel src/server.js
// create shortcut script to run server.js in package.json
// run  - npm run dev
// create .babelrc 
// install mongodb - npm install mongodb
// install connect history api fallback - npm install connect-history-api-fallback
// install heroku - npm install -g heroku