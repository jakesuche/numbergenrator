import React, { useEffect, useState } from "react";
import AOS from "aos";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";


import "aos/dist/aos.css";
import HomePage from './pages/homepage/homepage'


function App() {
  const [Spin, SetSpin] = useState(true);
  useEffect(() => {
  
    AOS.init({});
    setTimeout(() => {
      SetSpin(false);
    }, 3000);
  }, []);
  return (
 

      <div>
      <HomePage/>
     </div>
  );
}

export default App;
