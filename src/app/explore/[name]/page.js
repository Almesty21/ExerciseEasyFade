'use client';
import CustomerHeader from "@/app/_components/CustomerHeader";
import { useEffect, useState } from "react";

const restaurantData = {
    _id: "1",
    name: "Delicious Bites",
    contact: "9876543210",
    city: "New York",
    address: "123 Main St",
    email: "contact@deliciousbites.com"
};

const foodItemsData = [
    {
        _id: "101",
        name: "Cheese Burger",
        price: "$10",
        description: "A delicious cheeseburger with fresh ingredients.",
        img_path: "/images/burger.jpg"
    },
    {
        _id: "102",
        name: "Pepperoni Pizza",
        price: "$15",
        description: "Classic pepperoni pizza with extra cheese.",
        img_path: "/images/pizza.jpg"
    },
    {
        _id: "103",
        name: "Pasta Alfredo",
        price: "$12",
        description: "Creamy Alfredo pasta with garlic bread.",
        img_path: "/images/pasta.jpg"
    }
];

const Page = (props) => {
    const name = props.params.name;

    // State for restaurant and food items
    const [restaurantDetails, setRestaurantDetails] = useState();
    const [foodItems, setFoodItems] = useState([]);

    // Cart states
    const [cartData, setCartData] = useState();
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [cartIds, setCartIds] = useState(cartStorage.map((cartItem) => cartItem._id) || []);
    const [removeCartData, setRemoveCartData] = useState();

    useEffect(() => {
        // Load static restaurant and food items data
        setRestaurantDetails(restaurantData);
        setFoodItems(foodItemsData);
    }, []);

    const addToCart = (item) => {
        let updatedCartIds = [...cartIds, item._id];
        setCartIds(updatedCartIds);
        setCartData(item);
        setRemoveCartData();
        localStorage.setItem('cart', JSON.stringify([...cartStorage, item]));
    };

    const removeFromCart = (id) => {
        let updatedCartIds = cartIds.filter(itemId => itemId !== id);
        setCartIds(updatedCartIds);
        setCartData();
        setRemoveCartData(id);
        localStorage.setItem('cart', JSON.stringify(cartStorage.filter(item => item._id !== id)));
    };

    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <div className="restaurant-page-banner">
                <h1>{decodeURI(name)}</h1>
            </div>
            <div className="details-wrapper">
                <h4>Contact: {restaurantDetails?.contact}</h4>
                <h4>City: {restaurantDetails?.city}</h4>
                <h4>Address: {restaurantDetails?.address}</h4>
                <h4>Email: {restaurantDetails?.email}</h4>
            </div>
            <div className="food-list-wrapper">
                {foodItems.length > 0 ? (
                    foodItems.map((item) => (
                        <div className="list-item" key={item._id}>
                            <div>
                                <img style={{ width: 100 }} src={item.img_path} alt={item.name} />
                            </div>
                            <div>
                                <div>{item.name}</div>
                                <div>{item.price}</div>
                                <div className="description">{item.description}</div>
                                {cartIds.includes(item._id) ? (
                                    <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                                ) : (
                                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No Food Items for this Restaurant</h1>
                )}
            </div>
        </div>
    );
};

export default Page;
