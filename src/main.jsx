import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  // Global styles for your application
import { RouterProvider } from "react-router-dom";  // Import RouterProvider for routing
import { router } from "./routes";  // Import the router configuration
import { StoreProvider } from "./hooks/useGlobalReducer";  // Import StoreProvider for global state management
import { StarWarsProvider } from "./context/StarWarsContext";  // Import Star Wars context
import "bootstrap/dist/css/bootstrap.min.css";  // Import Bootstrap for styling

const Main = () => {
    return (
        <React.StrictMode>  
            {/* Provide global state to all components */}
            <StoreProvider>
                {/* Provide Star Wars context to the entire app */}
                <StarWarsProvider>  
                    {/* Set up routing for the application */}
                    <RouterProvider router={router} />
                </StarWarsProvider>
            </StoreProvider>
        </React.StrictMode>
    );
}

// Render the Main component into the root DOM element
ReactDOM.createRoot(document.getElementById("root")).render(<Main />);