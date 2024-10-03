import express from "express";
import path from "path";
import fetch from "node-fetch";

import ejs from "ejs";
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("static"));
app.set("view engine", "ejs");
const __dirname = path.resolve();
app.set("views", path.join(__dirname, "views"));

let messages = [];

let products = [
  {
    id: 1,
    name: "banana",
    group: "fruit",
    type: "banana",
  },
  {
    id: 2,
    name: "orange",
    group: "fruit",
    type: "citrus",
  },
  {
    id: 3,
    name: "potato",
    group: "vegetable",
    type: "underground",
  },
];

let extendetProducts = {};

//GET, POST, PUT, DELETE
// req.params = value,(id = 2) /products/:id, req.params.id = 2;

// req.query; let {group,type} = req.query;
//products?group=fruit
//products?type=citrus&price=20

// app.get('/', (req, res) => {
//   res.json(messages);
// });
//using static file
// app.get('/products', (req, res) => {
//   const __dirname = path.resolve();
//   res.sendFile(path.join(__dirname+'/static/index.html'));
// })

//using ejs

const groups = new Set(); //{1,2,3}
const types = new Set();
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

products.forEach((product) => {
  groups.add(product.group);
  types.add(product.type);
});

app.get("/", (req, res) => {
  res.render("home", {
    products,
    groups: Array.from(groups),
    types: Array.from(types),
  });
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const product = products.find((product) => product.id == id);
  const link = `https://www.fruityvice.com/api/${product.group}/${product.name}`;

  let data = null;
  if (link in extendetProducts) {
    data = extendetProducts[link];
    console.log(" from cache");
  } else {
    const response = await fetch(link);
    console.log("request made");
    if (response.ok && response.status === 200) {
      data = await response.json();
      extendetProducts[link] = data;
    }
  }

  if (data) {
    res.render("singleProduct", { product: data });
  } else {
    res.render("ownProduct", { product });
  }

  //https://www.fruityvice.com/api/vegetablepotato
});

// app.get('/:text', (req, res) => {
//   let text = req.params.text;
//   if(text){
//     messages.push(text)
//   }
//   res.json(messages);
// });

app.get("/api/products/:id", (req, res) => {
  //products/1, products/2
  // app.get('/productsName/:name',(req,res)=>{//products/1, products/2
  let id = req.params.id;
  let product = products.find((product) => product.id == id);
  res.json(product);
});

app.get("/api/products", (req, res) => {
  //products?group=fruit
  //products?type=citrus&price=20
  //IGNORE
  let { group, type } = req.query;

  let result = products;

  // IGNORE
  if (group) {
    result = result.filter((product) => product.group == group);
  }
  if (type) {
    result = result.filter((product) => product.type == type);
  }

  res.json(result);
});

app.post("/api/products", (req, res) => {
  console.log(req.body);
  const product = req.body;
  if (product.name && product.group && product.type) {
    //calculating id
    product.id = products.length + 1;

    // adding product to api
    products.push(product);
    groups.add(product.group);
    types.add(product.type);
    res.status(201).json(product);
  } else {
    res.status(422).json({
      message:
        "Server expects next format: {name: string, group: string, type: string}}",
    });
  }
});

app.listen(3000, () => {
  console.log("Express server initialized");
});

