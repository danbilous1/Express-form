import { createProduct } from "./utils.js";
// let lastId = null;
// fetch("/api/products")
// 	.then((res) => res.json())
// 	.then((res) => {
// 		for(let i = 0; i < res.length; i++){
// 			renderProduct(res[i])//<tr><td></td></tr>
// 		}
// 		lastId = res.at(-1).id;
// 		//res[1] == res.at(1)
// 		//res[res.length-1] == res.at(-1)
// 	});

// let form = document.querySelector("#form button[type='submit']");
let form = document.querySelector("#form");
let cancelBtn = document.querySelector('#cancel');
cancelBtn.addEventListener('click', function(e) {
    e.preventDefault();
})
const onlyLetters = new RegExp('[A-Za-z]+')

// form.addEventListener("click", (e) => {
//     const name = onlyLetters.test(document.querySelector(".name").value);
//     const type = onlyLetters.test(document.querySelector(".type").value);
//     const group = onlyLetters.test(document.querySelector(".group").value);

//     if (name && type && group) {
//         e.preventDefault();

//         const newProduct = {
//             name: document.querySelector(".name").value,
//             type: document.querySelector(".type").value,
//             group: document.querySelector(".group").value,
//         };
//         createProduct(newProduct);

        
//     } else {
//         e.preventDefault();
//     }
// });

//https://getbootstrap.com/docs/5.3/forms/validation/
form.addEventListener('submit', event => {
    event.preventDefault()
  if (!form.checkValidity()) {
    event.stopPropagation()
  }

  form.classList.add('was-validated')
}, false)
