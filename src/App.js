import React from "react";
import {
	Routes,
	Route,
	useLocation
} from "react-router-dom";

import Home from "./routes/Home/Home";
import ShipComposer from "./routes/ShipComposer/ShipComposer";
import Layout from "./routes/Layout";
import Header from "./components/Header/Header";
import ContextShippingStore from "./stores/ContextShippingStore";

import "./styles/sass/App.scss";

function App() {
	const location = useLocation();
	const isHomeUrlActive = () => {
		const homeFilterPage = /^(\/)$|^(\/home)$/g;
		if (homeFilterPage.test(location.pathname)) {
			console.log('Location changed: home page');
			return true;
		} else {
			return false;
		}
	}

	return (
		<div className={ isHomeUrlActive() ? "app is_home_active" : "app"}>
			<ContextShippingStore>
				<Header />
				<Routes>
					<Route path="/" elmenent={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/composer" element={<ShipComposer />} />
						<Route path="*" element={<Home />} />
					</Route>
				</Routes>
			</ContextShippingStore>
		</div>
	);
}

export default App;
