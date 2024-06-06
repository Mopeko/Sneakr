import React, { useState, useEffect, useContext } from 'react';
import sneakersData from '../database/sneakr.json';
import homecss from '../styles/home.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Wishlist from './wishlist.jsx';
import axios from 'axios';


function HomePage() {
    const [sneakers, setSneakers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const sneakersPerPage = 40;
    const totalPages = Math.ceil(sneakersData.length / sneakersPerPage);

    const getSneakersForPage = (page, data) => {
        const start = (page - 1) * sneakersPerPage;
        const end = start + sneakersPerPage;
        return data.slice(start, end);
    };

    useEffect(() => {
        const filteredData = searchTerm
            ? sneakersData.filter(item => item.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : sneakersData;
        setSneakers(getSneakersForPage(currentPage, filteredData));
    }, [currentPage, searchTerm]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const addSneaker = (sneaker) => {
        axios.post('http://localhost:5000/addsneaker', sneaker)
            .then(response => console.log(response.data))
            .catch(err => console.error('Error adding sneaker to wishlist:', err));
    };
    return (

        <div>
            <nav className="navbar">
                <Link to="/login "className="button">Login</Link>
                <input type="search" className="search-bar" placeholder="Search..." onChange={handleSearch}/>
                <Link to="/wishlist" className="button" onClick={Wishlist}>Wishlist</Link>
            </nav>
        <div className="sneakers-grid">
            {sneakers.map((sneaker, index) => (
                <div key={index} className="sneaker-item">
                    <img src={sneaker.attributes.image.small}/>
                    <h2>{sneaker.attributes.name}</h2>
                    <p>Retail price: {sneaker.attributes.retailPrice} </p>
                    <p>Estimated market value: {sneaker.attributes.estimatedMarketValue}</p>
                    <p>Release date: {sneaker.attributes.releaseDate}</p>
                    <button onClick={() => addSneaker(sneaker)}>Add to Wishlist</button>
                </div>
            ))}
        <div className="pagination-total"> 
            <button className="pagination" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span className='pagination-count'>Page {currentPage} of {totalPages}</span>
            <button className="pagination" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
        </div>
    </div>
    );
}
export default HomePage;