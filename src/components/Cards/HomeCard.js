import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function HomeCard(props) {
  return (
    <>
      {props.products.map((product, index) => {
        return (
          <div className="card" style={styles.prductCard}>
            <img className="product-image" src={product.image} />
            <tag style={styles.prodData}>
              {product.name}

              {product.tags.map((tag) => {
                return (
                  <tag backgroundColor={tag.color} className="tag-name">
                    {tag.name}
                  </tag>
                );
              })}

              <tag className="float-right text-center tag-price">
                €{product.price}
                <br />
                {product.options && product.options.length > 0 ? (
                  <span>
                    <button
                      className="btn btnAdd"
                      onClick={() => {
                        props.handleShowOption(index);
                      }}
                    >
                      + voeg toe
                    </button>
                    <Modal
                      show={props.show[index]}
                      onHide={() => props.handleCloseOption(index)}
                    >
                      <Modal.Header closeButton className="modalSection">
                        <Modal.Title>
                          {product.option_category.name}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="modalSection">
                        {product.options.map((option, i) => {
                          return (
                            <div className="alert alert-warning">
                              <span style={{ float: "" }}>{option.name}</span>
                              <button
                                className="btn btn-warning"
                                onClick={() => {
                                  props.addSauce(option);
                                }}
                              >
                                +
                              </button>
                              <span className="option-price">
                                ‎€ {option.price.toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                      </Modal.Body>
                      <Modal.Footer className="modalSection">
                        <Button
                          variant="secondary"
                          className="addToCart-button"
                          onClick={() => props.handleCloseOption(index)}
                        >
                          sluiten
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            props.addToCart(product);
                            if (product.pickedOptions) {
                              product.pickedOptions.map((sauce) => {
                                console.log("da");
                                console.log(sauce);
                                props.addSauce(sauce);
                                console.log("end");
                              });
                            }

                            product.pickedOptions = [];
                            props.handleCloseOption(index);
                          }}
                        >
                          voeg toe
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </span>
                ) : (
                  <button
                    className="btn btnAdd"
                    onClick={() => props.addToCart(product)}
                  >
                    + voeg toe
                  </button>
                )}
              </tag>
              <br />
              <tag style={styles.prodDesc}>{product.description}</tag>
            </tag>
          </div>
        );
      })}
    </>
  );
}

let prductCard = {
  marginTop: "25px",
  padding: "-10px",
  backgroundColor: "#323232",
  display: "inline-block",
  width: "100%",
  height: "87px",
  borderWidth: 1,
  borderColor: "#838383",
  marginBottom: "23px",
};

let prodDesc = {
  fontSize: "16px",
};

let prodData = {
  position: "absolute",
  marginTop: "10px",
  marginLeft: "10px",
  fontSize: "24px",
  fontWeight: "500",
  color: "white",
  width: "100%",
  paddingRight: "100px",
};

const { innerWidth: width, innerHeight: height } = window;
// console.log(width)
if (width < 900) {
  prductCard = {
    marginTop: "25px",
    padding: "-10px",
    backgroundColor: "#696969",
    display: "inline-block",
    width: "100%",
    height: "80px",
    border: 1,
    marginBottom: "23px",
  };
  prodDesc = {
    display: "none",
  };
  prodData.fontSize = "20px";
}

const styles = {
  btnAdd: {
    width: "120px",
    backgroundColor: "blue",
    padding: "3px 10px",
    borderRadius: "3px",
    backgroundColor: "#F2A83B",
    color: "white",
    textDecoration: "none",
    marginBottom: "-20px",
    marginRight: "-10px",
    fontSize: "16px",
  },
  prductCard: prductCard,
  prodDesc: prodDesc,
  prodData: prodData,
};
