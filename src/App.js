import "swiper/swiper.min.css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import AppRoutes from "./config/Routes";
import IsLoggedIn from "./config/IsLoggedIn";

function App() {
    return (
        <IsLoggedIn>
            <AppRoutes />
        </IsLoggedIn>
    );
}

export default App;
