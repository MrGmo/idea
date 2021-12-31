// import ObjectAPI from "../api/ObjectAPI.js";
import { useState, useEffect } from 'react'

function HomePage() {
    const [userInput, setUserInput] = useState('')
    const [lat, setLat] = useState('')
    const [long, setLong] = useState('')

    window.navigator.geolocation.getCurrentPosition(function(location) {
        console.log(location.coords.latitude);
        console.log(location.coords.longitude);
        console.log(location.coords.accuracy);
      });










    const getFood = () => {
        console.log('button being clicked')
    }


  return (
    <div>
      <h1>Home Page</h1>
      <input type="text" onChange={e => setUserInput(e.target.value)} />
      <button onClick={getFood}>Submit</button>
    </div>
  );
}

export default HomePage;
