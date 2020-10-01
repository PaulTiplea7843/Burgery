import React, { useState, useEffect } from "react";
import Axios from "axios";
import data from "../constants";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./screens.css";
import HomeCard from "../components/Cards/HomeCard";

const Home = (props) => {
  var [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [pickedCat, setPickedCat] = useState(0);
  const [show, setShow] = useState([]);

  const handleCloseOption = (index) => {
    let new_arr = show;

    new_arr[index] = false;

    setShow([...new_arr]);
  };

  const handleShowOption = (index) => {
    let new_arr = show;

    new_arr[index] = true;

    setShow([...new_arr]);
  };

  if (!localStorage.getItem("type")) {
    window.location.replace("/order_details");
  }

  if (categories.length == 0) {
    Axios.get(data.baseUrl + "/api/categories").then((res) => {
      setCategories(res.data.categories);
      localStorage.setItem("categories", JSON.stringify(res.data.categories));
      if (products.length == 0 && !pickedCat) {
        setPickedCat(res.data.categories[0].id);
        Axios.get(
          data.baseUrl +
            "/api/category/" +
            res.data.categories[0].id +
            "/products"
        ).then((res) => {
          setProducts(res.data.products);
        });
      }
    });
  }

  const pickCategory = (id) => {
    setPickedCat(id);
    Axios.get(data.baseUrl + "/api/category/" + id + "/products").then(
      (res) => {
        // console.log(res.data.products);
        setProducts(res.data.products);
        // console.log(products);
      }
    );
  };

  const removeSauce = (id) => {
    const output_array = [];
    let deleted = 0;
    const old_sauces = props.sauces.reverse();
    old_sauces.map((sauce, i) => {
      if (sauce.id == id && deleted == 1) {
        output_array.push(sauce);
      }
      if (sauce.id == id && deleted == 0) {
        deleted = 1;
      }

      if (sauce.id != id) {
        output_array.push(sauce);
      }
    });

    output_array.reverse();
    props.setSauces(output_array);
    localStorage.setItem("sauces", JSON.stringify(output_array));
  };

  const addToCart = (product) => {
    // console.log(product);
    props.setCart([...props.cart, product]);
    localStorage.setItem("cart", JSON.stringify([...props.cart, product]));
    console.log(props.cart);
  };

  const addSauce = (sauce) => {
    // console.log(product);
    props.setSauces([...props.sauces, sauce]);
    localStorage.setItem("sauces", JSON.stringify([...props.sauces, sauce]));
  };

  // const [bumm, setBumm] = useEffect(0);

  // const generateUnique = () => {
  //   setBumm(bumm + 1);
  //   return bumm;
  // };

  return (
    <div>
      <img src="./burger-bg.png" className="img" />
      <div className="container">
        <div className="">
          <div className="row content">
            <div className="col-md-12">
              {categories.map((category) => {
                if (category.id == pickedCat) {
                  return (
                    <button
                      className="btn first-button"
                      onClick={() => pickCategory(category.id)}
                    >
                      {category.name}
                    </button>
                  );
                }
                return (
                  <button
                    className="btn second-button"
                    onClick={() => pickCategory(category.id)}
                  >
                    {category.name}
                  </button>
                );
              })}
              <HomeCard
                products={products}
                handleShowOption={handleShowOption}
                show={show}
                setShow={setShow}
                handleCloseOption={handleCloseOption}
                addSauce={addSauce}
                addToCart={addToCart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
