import "./homepage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [inputData, addInput] = useState({
    maxValue: null,
    numAmount: 0,
    numDraws: null,
    playPrice: null,
  });

  const [inputNumber, increaseNumber] = useState(0);
  const [ winningNumber, setWinning] = useState([])
  const [winningSets, setSets] = useState([])

  useEffect(() => {}, []);

  const handleChange = ($event) => {
    const { value, name } = $event.target;
    addInput({ ...inputData, [name]: value });

    const WinCat = document.getElementById("win-category");

    if ($event.target.name === "numAmount") {
      increaseNumber(Number($event.target.value));
    }
  };

  const handleDraw = ($event) => {
    $event.preventDefault();
    console.log("butttoncclick");
    const URL = "http://192.168.100.106:5000/playlottery";

    axios
      .post(URL, inputData)
      .then((res) => {
        console.log(res);
        setWinning(res.data['winningNumbers'])
        setTimeout(() => {
          setSets(res.data['drawedSets'])
          console.log(res.data['drawedSets'])
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAtrribute = (elem, attributes) => {
    for (let key in attributes) {
      elem.setAttribute(key, attributes[key]);
    }
  };
  const numberArray = [...Array(inputNumber).keys()];

  return (
    <div className="container container-wrapper">
      <div className="row mt-5">
        <div className="col-md-12 mt-5">
          <h1 className="text-center">RANDOM NUMBER LOTTERY</h1>
          <br></br>
          <p className="text-center ">
            We’ll do anything we can to grow your revenue. Our motivation is to
            drive your business further than you can imagine your revenue. Our
            motivation is to drive your business further than you can imagine
          </p>
        </div>
      </div>
      <div className="row play-now-header"></div>
      <div className="row playnow mt-5 mb-5">
        <div className="col-md-12 mb-5 mt-5">
          <h1 className="text-center">PLAY NOW</h1>
        </div>
        <div className="col-md-12 mb-5 mt-5">
          <div className="row">
            <div className="col-3">
              <div className="form-wrapper">
                <label>Max Value</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="maxValue"
                  className="form-control"
                  id="lottoryform"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-wrapper">
                <label>Amount of Numbers</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="numAmount"
                  className="form-control"
                  id="lottoryform"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-wrapper">
                <label>Number of sets</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="numDraws"
                  className="form-control"
                  id="lottoryform"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
            <div className="col-3">
              <div className="form-wrapper">
                <label>Price per play</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="playPrice"
                  className="form-control"
                  id="lottoryform"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div>
            <h1 className="text-center">Win Category</h1>
            <br></br>
            <h3 className="text-center">Win Match Percentage</h3>
          </div>
        </div>
      </div>
      <div className="row row-cols-3 mb-5 mt-5 win-category" id="win-category">
        {numberArray.map((data, i) => {
          return (
            <div className="col " key={i + 1}>
              <div className="form-wrapper">
                <label>Number of sets</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  name={`Match${i + 1}`}
                  onChange={handleChange}
                  placeholder={`Match ${data + 1}`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="row mb-4 mt-4 text-center">
        <div className="col-md-12 mb-5">
          <button
            type="button"
            onClick={handleDraw}
            className="btn btn-primary"
          >
            Play Now
          </button>
        </div>
      </div>

      <div className="row mb-4 mt-4">
        <div className="col-md-12 mb-5">
          <table className="winning">
            <tr>
              <th colSpan="2">Winning numbers</th>
            </tr>
            <tr>
              {
                winningNumber.map((res,i)=>{
                  return(
                    <td key={i}> {res}</td>
              
                  )
                })
              }
              
            </tr>
            
          </table>
        </div>
      </div>

      <div className="row mb-4 mt-5">
          
      </div>

    
    </div>
  );
};

export default Homepage;
