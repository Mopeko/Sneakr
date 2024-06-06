import React, { useState, useEffect } from 'react';
import axios from 'axios';
import admin from '../admin.json';
import wishlistcss from '../styles/wishlist.css';

const Wishlist = () => {
    const [sneakers, setSneakers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/wishlist')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setSneakers(response.data);
                } else {
                    console.error('Expected an array but got:', response.data);
                }
            })
            .catch(err => console.error('Error getting wishlist:', err));
    }, []);
    const deleteSneaker = (index) => {
        const sneakerToDelete = sneakers[index];
    
        axios.delete(`http://localhost:5000/wishlist/${sneakerToDelete.id}`)
            .then(() => {
                const newSneakers = [...sneakers];
                newSneakers.splice(index, 1);
                setSneakers(newSneakers);
            })
            .catch(err => console.error('Error deleting sneaker:', err));
    };
    return (
    <div>
        <h1> My wishlist:</h1>
        <div className='sneaker-grid'>

            {Array.isArray(sneakers) ? (
                sneakers.map((sneaker, index) => (
                    <div key={index} className="sneaker-item">
                        <img src={sneaker.attributes.image.small}/>
                        <h2>{sneaker.attributes.name}</h2>
                        <p>Retail price: {sneaker.attributes.retailPrice} </p>
                        <p>Estimated market value: {sneaker.attributes.estimatedMarketValue}</p>
                        <p>Release date: {sneaker.attributes.releaseDate}</p>
                        <button onClick={() => deleteSneaker(index)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No sneakers found.</p>
            )}
        </div>
        </div>
    );
};

export default Wishlist;
