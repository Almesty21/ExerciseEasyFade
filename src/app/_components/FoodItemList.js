import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([]);
    const router = useRouter();

    // Static JSON data to simulate fetched food items
    const staticFoodItems = [
        { _id: 1, name: "Pizza", price: "10.99", description: "Delicious cheese pizza", img_path: "path/to/image1.jpg" },
        { _id: 2, name: "Burger", price: "8.99", description: "Juicy beef burger", img_path: "path/to/image2.jpg" },
        { _id: 3, name: "Pasta", price: "12.99", description: "Creamy Alfredo pasta", img_path: "path/to/image3.jpg" },
    ];

    useEffect(() => {
        loadFoodItems();
    }, []);

    const loadFoodItems = () => {
        // Simulate loading food items from static data
        setFoodItems(staticFoodItems);
    };

    const deleteFoodItem = (id) => {
        // Filter out the deleted item
        const updatedFoodItems = foodItems.filter(item => item._id !== id);
        setFoodItems(updatedFoodItems);
    };

    return (
        <div>
            <h1>Food Items</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        foodItems.length > 0 ? (
                            foodItems.map((item, key) => (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td><img src={item.img_path} alt={item.name} width="50" /></td>
                                    <td>
                                        <button onClick={() => deleteFoodItem(item._id)}>Delete</button>
                                        <button onClick={() => router.push('dashboard/' + item._id)}>Edit</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No food items available</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default FoodItemList;
