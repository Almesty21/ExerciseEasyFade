'use client'
import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Static JSON Data
const STATIC_LOCATIONS = ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Houston'];
const STATIC_RESTAURANTS = [
  { _id: '1', name: 'Pizza Place', contact: '123-456-7890', city: 'New York', address: '123 Pizza St', email: 'contact@pizzaplace.com' },
  { _id: '2', name: 'Burger King', contact: '987-654-3210', city: 'Los Angeles', address: '456 Burger Blvd', email: 'contact@burgerking.com' },
  { _id: '3', name: 'Sushi World', contact: '555-555-5555', city: 'Chicago', address: '789 Sushi Rd', email: 'contact@sushiworld.com' },
];

export default function Home() {
  const [locations, setLocations] = useState(STATIC_LOCATIONS);
  const [restaurants, setRestaurants] = useState(STATIC_RESTAURANTS);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    // Filter restaurants based on selected location
    const filteredRestaurants = STATIC_RESTAURANTS.filter(restaurant => restaurant.city === item);
    setRestaurants(filteredRestaurants);
  };

  console.log(restaurants);

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input 
            type="text" 
            value={selectedLocation}
            onClick={() => setShowLocation(true)}
            className="select-input" 
            placeholder="Select Place" 
          />
          <ul className="location-list">
            {
              showLocation && locations.map((item, index) => (
                <li key={index} onClick={() => handleListItem(item)}>{item}</li>
              ))
            }
          </ul>

          <input 
            type="text" 
            className="search-input"
            onChange={(event) => {
              // Filter restaurants based on search input
              const filteredRestaurants = STATIC_RESTAURANTS.filter(restaurant =>
                restaurant.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
                restaurant.city.toLowerCase().includes(event.target.value.toLowerCase())
              );
              setRestaurants(filteredRestaurants);
            }}
            placeholder="Enter food or restaurant name" 
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurants.map((item) => (
            <div key={item._id} onClick={() => router.push('explore/' + item.name + "?id=" + item._id)} className="restaurant-wrapper">
              <div className="heading-wrapper">
                <h3>{item.name}</h3>
                <h5>Contact: {item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city},</div>
                <div className="address">{item.address}, Email: {item.email}</div>
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </main>
  );
}
