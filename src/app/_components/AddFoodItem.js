import { useState } from "react";

const AddFoodItems = (props) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(false);
    
    // Static JSON data to simulate a database
    const staticFoodItems = [
        // Example static items
        { id: 1, name: "Pizza", price: "10.99", img_path: "path/to/image1.jpg", description: "Delicious cheese pizza" },
        { id: 2, name: "Burger", price: "8.99", img_path: "path/to/image2.jpg", description: "Juicy beef burger" },
    ];

    const handleAddFoodItem = () => {
        console.log(name, price, path, description);
        if (!name || !path || !price || !description) {
            setError(true);
            return false;
        } else {
            setError(false);
        }

        // Create a new food item object
        const newFoodItem = {
            id: staticFoodItems.length + 1, // Simple ID generation
            name,
            price,
            img_path: path,
            description,
        };

        // Simulate adding the new item to the static array
        staticFoodItems.push(newFoodItem);
        alert("Food item added");
        props.setAddItem(false);
    };

    return (
        <div className="container">
            <h1>Add New Food Item</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter food name"
                    value={name} onChange={(e) => setName(e.target.value)}
                />
                {error && !name && <span className="input-error">Please enter valid name</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter price"
                    value={price} onChange={(e) => setPrice(e.target.value)}
                />
                {error && !price && <span className="input-error">Please enter valid price</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter image path"
                    value={path} onChange={(e) => setPath(e.target.value)}
                />
                {error && !path && <span className="input-error">Please enter valid path</span>}
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter description"
                    value={description} onChange={(e) => setDescription(e.target.value)}
                />
                {error && !description && <span className="input-error">Please enter valid description</span>}
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
            </div>
        </div>
    );
};

export default AddFoodItems;
