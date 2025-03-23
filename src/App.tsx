import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import "./App.css";
import MiniKitProvider from "./components/MiniProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
// import Dashboard from "./components/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
import Wallet from "./components/Wallet";
function App() {
	return (
		<>
			<MiniKitProvider>
				<Router>
					<Navbar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/wallet" element={<Wallet />} />
						{/* Rutas protegidas */}
						{/* <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route> */}
					</Routes>

					<Footer />
				</Router>
			</MiniKitProvider>
		</>
	);
}

export default App;
