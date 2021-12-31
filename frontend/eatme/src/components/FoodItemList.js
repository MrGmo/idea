import { Link } from "react-router-dom";

function FoodItemList (props) {

  const { foodItems } = props

  const createLists = () => {

    if (!foodItems) return null;

    return foodItems.map((foodItem,index) => {
      return (
        <div key={index+1}>
          <li style={{ listStyleType: "none" }} fooditem={foodItem} >{index+1}. {foodItem.menu_item_name}: {foodItem.menu_item_description}</li>
        </div>
      )
    })
  }

  return (
    <div>
      { createLists() }
    </div>
  );
}

export default FoodItemList;
