import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    const handleRemoveFavorite = (uid, type) => {
        dispatch({ type: "REMOVE_FAVORITE", payload: { uid, type } });
    };

    return (
        <nav className="navbar navbar-dark bg-dark mb-3">
            <div className="container-fluid">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">STAR WARS</span>
                </Link>
                <div className="ml-auto">
                    <Link to="/favoritos" className="btn btn-purple position-relative">
                        Favoritos
                        <span className="badge bg-secondary ms-2">{store.favoritos.length}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};