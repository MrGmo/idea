import { useState, useEffect } from 'react'
import FoodItemList from "../components/FoodItemList.js";

function HomePage() {
    const [userInput, setUserInput] = useState('')
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [miles, setMiles] = useState(0)
    const [foodItems, setFoodItems] = useState(null)


    useEffect(() => {
        const getLocation = () => navigator.geolocation.getCurrentPosition(function(location) {
            setLat(location.coords.latitude);
            setLong(location.coords.longitude);
          })
          getLocation()
    }, [])

    const getFood = async () => {
      try {
        const fetchApiData = await fetch(`${process.env.REACT_APP_FOOD_ITEMS_API_URL}lat=${lat}&lon=${long}&distance=${miles}&search=${userInput}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": process.env.REACT_APP_DOCUMENU_KEY,
            },
          }
        );
        const apiResponse = await fetchApiData.json();
        setFoodItems(apiResponse.data)
        console.log(apiResponse.data)
        document.querySelector("#food-item").value = null;
        document.querySelector("#distance").value = null;
      } catch (e) {
        console.log(e);
      }
    };


  return (
    <div>
      <h1>{foodItems ? userInput.toUpperCase() : "Home"} Page</h1>
      <input type="text" id="food-item" placeholder="food item" onChange={e => setUserInput(e.target.value)} />
      <input type="number" id="distance" placeholder="distance" min="1" max="50" onChange={e => setMiles(e.target.value)}/>
      <button onClick={getFood}>Submit</button>
      <ul>
        <FoodItemList foodItems={foodItems} />
      </ul>
    </div>
  );
}

export default HomePage;
