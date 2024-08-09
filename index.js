import express from 'express';
import path from 'path'
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("static"));

let messages = [];

let products= [
  {
    id:1,
    name: 'banana',
    group: 'fruit',
    type: 'banana'
  },
  {
    id:2,
    name: 'orange',
    group: 'fruit',
    type: 'citrus'
  },
  {
    id:3,
    name: 'potato',
    group: 'vegetable',
    type: 'underground'
  }
]
//GET, POST, PUT, DELETE
// req.params = value,(id = 2) /products/:id, req.params.id = 2; 

// req.query; let {group,type} = req.query; 
//products?group=fruit
//products?type=citrus&price=20

app.get('/', (req, res) => {
  res.json(messages);
});
app.get('/products', (req, res) => {
  const __dirname = path.resolve();
  res.sendFile(path.join(__dirname+'/static/index.html'));
})

// app.get('/:text', (req, res) => {
//   let text = req.params.text;
//   if(text){
//     messages.push(text)
//   }
//   res.json(messages);
// });

app.get('/products/:id',(req,res)=>{//products/1, products/2
// app.get('/productsName/:name',(req,res)=>{//products/1, products/2
  let id = req.params.id;
  let product = products.find(product => product.id == id);
  res.json(product);
})

app.get('/api/products', (req,res)=>{
  //products?group=fruit
  //products?type=citrus&price=20
  //IGNORE
  let {group,type} = req.query


  
  let result = products;

  // IGNORE
  if(group){
    result = result.filter(product=>product.group == group)
  }
  if(type){
    result = result.filter(product=>product.type == type)
  }

  
  res.json(result)
})



app.post('/products', (req, res) => {
  console.log(req.body)
  const product = req.body;
  if (product.name && product.group && product.type) {
    //calculating id
    product.id = products.length + 1;

    // adding product to api
    products.push(product);
    res.status(201).json(product);
  }else{
    res.status(422).json({
      message: "Server expects next format: {name: string, group: string, type: string}}"
    })
  }
})

app.listen(3000, () => {
  console.log('Express server initialized');
});


