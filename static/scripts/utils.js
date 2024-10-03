export function renderProduct(product){
  const tr = document.createElement("tr");
    tr.addEventListener('click', function() {
        // console.log('row clicked');
      const link = `/product/${product.id}`
        window.open(link, '_self');




    })
  const id = document.createElement("td")
  id.innerText = product.id;
  const tdName = document.createElement("td");
  tdName.innerText = product.name;
  const tdType = document.createElement("td");
  tdType.innerText = product.type;
  const tdGroup = document.createElement("td");
  tdGroup.innerText = product.group;
  tr.append(id, tdName, tdType, tdGroup);
  let tbody = document.querySelector("tbody");
  tbody.append(tr);
}



export function createProduct(newProduct) {
  fetch("/api/products", {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newProduct)
  })
    .then((res) => res.json())
    .then(async (res) => {
      //user alraeady have 3 products
      if(lastId + 1 !== res.id){//how we know we have gap
        console.log('we have gap')

         for (let i = lastId + 1; i < res.id; i++) {
           await fetch(`/api/products/${i}`)
          .then((res) => res.json())
          .then((res) => {
            renderProduct(res);
          })
        }
      }
      //but when new product recieved after post user get id:6
      //so it is clear that id:4 and id:5 is missing in UI
      lastId = res.id;
      renderProduct(res);
    });
}
