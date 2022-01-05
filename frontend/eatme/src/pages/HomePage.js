import { useState, useEffect } from 'react'
import FoodItemList from "../components/FoodItemList.js";

function HomePage() {
    const [userInput, setUserInput] = useState('')
    const [lat, setLat] = useState(null)
    const [lng, setLng] = useState(null)
    const [miles, setMiles] = useState(0)
    const [zipcode, setZipcode] = useState(null)
    const [foodItems, setFoodItems] = useState(null)


    useEffect(() => {
      const convertZip = async () => {
        try {
          const fetchZipLatAndLong = await fetch(`${process.env.REACT_APP_GOOGLE_GEOCODE_API_URL}${zipcode}`,
            {
              method: "GET",
            }
          );
          const latAndLongData = await fetchZipLatAndLong.json();
          if (latAndLongData.results[0]) {
            setLat(latAndLongData.results[0].geometry.location.lat)
            setLng(latAndLongData.results[0].geometry.location.lng)
          }
        } catch (e) {
          console.log(e);
        }
      };
        convertZip()
  }, [zipcode])


    const getFood = async () => {
      try {
        const fetchApiData = await fetch(`${process.env.REACT_APP_FOOD_ITEMS_API_URL}lat=${lat}&lon=${lng}&distance=${miles}&search=${userInput}`,
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
        document.querySelector("#zipcode").value = null;
        document.querySelector("#food-item").value = null;
        document.querySelector("#miles").value = null;
      } catch (e) {
        console.log(e);
      }
    };



  return (
    <div>
      <h1>{foodItems ? userInput.toUpperCase() : "Home"} Page</h1>
      <input style={{ width: "70px"}} type="number" id="zipcode" placeholder="zipcode" min="5" max="5" onChange={e => setZipcode(e.target.value)}/>
      <input type="text" id="food-item" placeholder="food item" onChange={e => setUserInput(e.target.value)} />
      <input style ={{ width: "40px" }} type="number" id="miles" placeholder="miles" min="1" max="50" onChange={e => setMiles(e.target.value)}/>
      <button onClick={getFood}>Submit</button>
      <ul>
        <FoodItemList foodItems={foodItems} />
      </ul>
    </div>
  );
}

export default HomePage;
