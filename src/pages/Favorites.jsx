import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import placeholderImage from '../assets/img/placeholder.jpg';

const getImageUrl = (type, uid) => {
    let categoryPath = '';
    switch (type) {
        case 'people': categoryPath = 'characters'; break;
        case 'vehicles': categoryPath = 'vehicles'; break;
        case 'planets': categoryPath = 'planets'; break;
        default: return '';
    }
    return `https://github.com/tbone849/star-wars-guide/blob/master/build/assets/img/${categoryPath}/${uid}.jpg?raw=true`;
};

export const Favorites = () => {
    const { store } = useGlobalReducer();

    if (store.favoritos.length === 0) {
        return <div className="container mt-5 text-center text-secondary">No tienes favoritos aún.</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-purple">Tus Favoritos</h2>
            <div className="row">
                {store.favoritos.map(fav => (
                    <div className="col-md-4 mb-4" key={fav.uid + fav.type}>
                        <div className="card">
                            <img
                                src={getImageUrl(fav.type, fav.uid)}
                                className="card-img-top"
                                alt={fav.name}
                                onError={e => { e.target.onerror = null; e.target.src = placeholderImage; }}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{fav.name}</h5>
                                <Link to={`/${fav.type}/${fav.uid}`} className="btn btn-purple">
                                    Ver detalle
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};