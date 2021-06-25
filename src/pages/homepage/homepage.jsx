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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [inputNumber, increaseNumber] = useState(0);
  const [winningNumber, setWinning] = useState([]);
  const [winningSets, setSets] = useState([]);
  const [matchCount2, setMatchCount] = useState({});
  const [winMatch, setWinMatch] = useState({});

  useEffect(() => {
    
  }, []);

  const handleChange = ($event) => {
    const { value, name } = $event.target;
    addInput({ ...inputData, [name]: value });

    const WinCat = document.getElementById("win-category");

    if ($event.target.name === "numAmount") {
      increaseNumber(Number($event.target.value));
    }
  };



  const handleDraw = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("button click");
    const URL = "http://localhost:5000/playlottery";
    axios
      .post(URL, inputData)
      .then(({ data }) => {
       // console.log(data);

        const { drawedSets, winningNumbers } = data;
        // set winningNumbers set
        setWinning(winningNumbers);
        setSets(drawedSets);
        //console.log(data);
        checkMatches(data);
        let matchCount = countMatches(data);
        setMatchCount({ ...matchCount2, ...matchCount });

        /// loop through matchCount
        var loopData = "";
        let class1 = "class";
        for (var match in matchCount) {
          //console.log(match);
          loopData += `<li ${class1}="list-group-item">${match} : ${matchCount[match]}</li>`;
        }
        setMatchCount({ loopData });

       // console.log(matchCount);
        addInput({ ...inputData, matchCount });

        setTimeout(() => {
          //console.log(inputData);
          axios
            .post(`http://localhost:5000/winPrices`, inputData)
            .then(({ data }) => {
              console.log(data);
              const { winPerMatch } = data;

              setLoading(false);
              var loopData1 = "";
              console.log("winPerMatch", winPerMatch);
              for (var win in winPerMatch) {
                //console.log(win);
                loopData1 += `<li ${class1}="list-group-item">${win} : ${winPerMatch[win]}</li>`;
              }
              setWinMatch({ loopData1 });
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
            });
        }, 1000);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  const checkMatches = (drawData) => {
    const { winningNumbers, drawedSets } = drawData;

    for (var set of drawedSets) {
      set.match = 0;
      for (var num of set.numbers) {
        if (winningNumbers.includes(num)) {
          set.match++;
        }
      }
    }
  };

  const countMatches = (drawData) => {
    const { winningNumbers, drawedSets } = drawData;
    const numAmount = winningNumbers.length;
    const matchCount = {};
    for (var i = 0; i <= numAmount; i++) {
      matchCount[`Match${i}`] = 0;
    }
    for (var set of drawedSets) {
      matchCount[`Match${set.match}`]++;
    }

    return matchCount;
  };

  // handle pagination

  const handlePagination = (e) => {
    if (e.target.name === "button1") {
      setCurrentPage(currentPage - 1);
    }
    if (e.target.name === "button2") {
      setCurrentPage(currentPage + 1);
    }
  };

  const updateAtrribute = (elem, attributes) => {
    for (let key in attributes) {
      elem.setAttribute(key, attributes[key]);
    }
  };
  const numberArray = [...Array(inputNumber).keys()];
  // Get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = winningSets.slice(indexOfFirstPost, indexOfLastPost);
  console.log(currentPosts);
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
            {loading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              ""
            )}
          </button>
        </div>
      </div>

      <div className="row mb-4 mt-4">
        <div className="col-md-12 mb-5">
          <h3 className="text-center">Winning numbers</h3>
        </div>
        <div className="col-md-12">
          <div className="d-flex justify-content-center">
            {winningNumber.map((res, i) => {
              return (
                <div
                  key={i}
                  style={{
                    paddingLeft: "10px",
                  }}
                >
                  {res}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <table className="table mb-4">
            <thead className="thead-dark">
              <tr>
                
                <th scope="col">Serial</th>
                <th scope="col">Numbers</th>
                <th scope="col">Match</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((res, i) => {
                return (
                  <tr key={i}>
                    
                    <td>{res["serial"]}</td>
                    <td>
                      {res.numbers.map((num) => {
                        return <span>{num},</span>;
                      })}
                    </td>
                    <td>{res["match"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a
                  type="button"
                  onClick={handlePagination}
                  name="button1"
                  className="page-link"
                >
                  Previous
                </a>
              </li>

              <li className="page-item">
                <a
                  type="button"
                  name="button2"
                  onClick={handlePagination}
                  className="page-link"
                  disabled={currentPage === 1}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <div className=" d-flex justify-content-left">
              <div>
                {`${(winningSets.length > 0 ? indexOfFirstPost + postPerPage : 0 )} of ${winningSets.length}`}
              </div>
          </div>
        </div>
        <div className="col-md-3 mb-5">
          <h1>Match Count</h1>
          <ul
            className="list-group"
            dangerouslySetInnerHTML={{ __html: matchCount2["loopData"] }}
          ></ul>
        </div>
        <div className="col-md-3 mb-5">
          <h1>Winnings</h1>
          <ul
            className="list-group"
            dangerouslySetInnerHTML={{ __html: winMatch["loopData1"] }}
          ></ul>
        </div>
      </div>

    </div>
  );
};

export default Homepage;
