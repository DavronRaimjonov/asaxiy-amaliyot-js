import { addData, addDataTocart, isLikeFetch } from "./function.js";
const loader = document.querySelector(".loader");
const products = document.querySelector(".products");
let categories = document.querySelector(".categories");
let counter = document.querySelector(".counter");
let category = localStorage.getItem("category") || "discount";
let cartlength = JSON.parse(localStorage.getItem("cart"))?.length || 0;
let counterLike = document.getElementById("like_counter");
counter.textContent = cartlength;

const getData = async () => {
  try {
    loader.style.display = "block";
    const request = await fetch("http://localhost:3000/products");
    let response = await request.json();
    loader.style.display = "none";
    return response;
  } catch (error) {
    return error.message;
  }
};
getData()
  .then((data) => getDataFunc(data))
  .catch((error) => console.log(error));

function getDataFunc(data) {
  products.innerHTML = "";
  let filterData = data;
  if (category !== "discount") {
    filterData = data.filter((value) => value.category === category);
  } else {
    filterData = data;
  }

  filterData.forEach((value) => {
    addData(products, value);
  });
  const buttons = document.querySelectorAll(".btn_shop");
  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      counter.textContent = cartlength;
      addDataTocart(filterData[index]);
    });
  });
  const buttonsLike = document.querySelectorAll(".like");
  buttonsLike.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      let id = e.target.id;
      let value = filterData[index];
      isLikeFetch(value, id);
    });
  });
  let filterDataLike = data.filter((value) => value.isLiked);
  counterLike.textContent = filterDataLike.length;
}

categories.addEventListener("click", (e) => {
  let id = e.target.id;
  if (id !== "") {
    category = id;
    localStorage.setItem("category", id);
    getData().then((data) => getDataFunc(data));
  }
});
