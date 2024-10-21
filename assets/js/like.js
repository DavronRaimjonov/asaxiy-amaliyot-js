import { addData, isLikeFetch } from "./function.js";

let likeCount = document.getElementById("like_counter");
let products = document.querySelector(".products");
// console.log(likeCount);
// likeCount.textContent = 2;

const getData = async () => {
  const request = await fetch("http://localhost:3000/products");
  const response = await request.json();
  return response;
};

getData()
  .then((data) => addDataFunc(data))
  .catch((error) => {
    console.log(error.message);
  });

function addDataFunc(data) {
  let counter = 0;
  data.forEach((value) => {
    if (value.isLiked) {
      counter += 1;
      likeCount.textContent = counter;
      addData(products, value);
    }
  });
  const buttonsLike = document.querySelectorAll(".like");
  buttonsLike.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      let id = e.target.id;
      data.forEach((value) => {
        if (value.isLiked) {
          if (value.id === id) {
            isLikeFetch(value, id);
          }
        }
      });
    });
  });
}
