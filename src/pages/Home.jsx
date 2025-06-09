import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import placeholderImage from '../assets/img/placeholder.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';

const BASE_URL = "https://www.swapi.tech/api/";

const getImageUrl = (type, uid) => {
    let categoryPath = '';
    switch (type) {
        case 'people':
            categoryPath = 'characters';
            break;
        case 'vehicles':
            categoryPath = 'vehicles';
            break;
        case 'planets':
            categoryPath = 'planets';
            break;
        default:
            return '';
    }
    return `https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/${categoryPath}/${uid}.jpg?raw=true`;
};

const fetchCategory = async (category) => {
    try {
        const response = await fetch(`${BASE_URL}${category}/`);
        if (!response.ok) {
            throw new Error(`Error fetching ${category}: ${response.statusText}`);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error(`Failed to fetch ${category}:`, error);
        return [];
    }
};

const Card = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();
    const isFavorite = store.favoritos.some(fav => fav.uid === item.uid && fav.type === type);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            dispatch({ type: "REMOVE_FAVORITE", payload: { uid: item.uid, type: type } });
        } else {
            dispatch({ type: "ADD_FAVORITE", payload: { uid: item.uid, type: type, name: item.name } });
        }
    };

    return (
        <div className="card m-2" style={{ minWidth: "18rem" }}>
            <img
                src={getImageUrl(type, item.uid)}
                className="card-img-top"
                alt={item.name}
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/${type}/${item.uid}`} className="btn btn-primary">
                        Saber más
                    </Link>
                    <button
                        className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={handleToggleFavorite}
                    >
                        <i className={`${isFavorite ? "fas" : "far"} fa-heart`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export const Home = () => {
    const [people, setPeople] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            setPeople(await fetchCategory("people"));
            setVehicles(await fetchCategory("vehicles"));
            setPlanets(await fetchCategory("planets"));
        };
        loadData();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-warning">Personajes</h2>
            <div className="d-flex overflow-auto mb-5">
                {people.map(person => (
                    <Card key={person.uid} item={person} type="people" />
                ))}
            </div>

            <h2 className="mb-4 text-warning">Vehículos</h2>
            <div className="d-flex overflow-auto mb-5">
                {vehicles.map(vehicle => (
                    <Card key={vehicle.uid} item={vehicle} type="vehicles" />
                ))}
            </div>

            <h2 className="mb-4 text-warning">Planetas</h2>
            <div className="d-flex overflow-auto mb-5">
                {planets.map(planet => (
                    <Card key={planet.uid} item={planet} type="planets" />
                ))}
            </div>
        </div>
    );
};