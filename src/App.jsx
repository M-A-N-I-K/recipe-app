import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import Auth from "./Pages/auth";
import CreateRecipe from "./Pages/createRecipe";
import SavedRecipe from "./Pages/savedRecipe";
import NavBar from "./Components/navbar";

export default function App() {
	return (
		<div>
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create-recipe" element={<CreateRecipe />} />
					<Route path="/saved-recipe" element={<SavedRecipe />} />
					<Route path="/auth" element={<Auth />} />
				</Routes>
			</Router>
		</div>
	);
}
