const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://hamza:asdfasdf@cluster0.e8pup.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    // const db = client.db('myFirstDatabase')
    const db = client.db();
    const result = db
      .collection("products")
      .insertOne(newProduct)
      .then(() => {
        client.close();
      });
  } catch (error) {
    return res.json({ message: "an error occured" });
  }
  res.json(newProduct);
};
const getProduct = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db
      .collection("products")
      .find()
      .toArray()
      .then(() => {
        // client.close();
      });
  } catch (error) {
    return res.json({ message: "an error occured" });
  }
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProduct = getProduct;
