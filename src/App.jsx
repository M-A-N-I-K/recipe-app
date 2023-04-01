import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import NavBar from "./Components/navbar";
import { lazy, Suspense } from "react";

const SavedRecipe = lazy(() => import("./Pages/savedRecipe.jsx"));
const CreateRecipe = lazy(() => import("./Pages/createRecipe.jsx"));
const Auth = lazy(() => import("./Pages/auth.jsx"));
const Login = lazy(() => import("./Components/Login.jsx"));
const Register = lazy(() => import("./Components/Register.jsx"));

export default function App() {
	return (
		<div>
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/create-recipe"
						element={
							<Suspense fallback={<h2>Loading...</h2>}>
								<CreateRecipe />
							</Suspense>
						}
					/>

					<Route
						path="/saved-recipe"
						element={
							<Suspense fallback={<h2>Loading...</h2>}>
								<SavedRecipe />
							</Suspense>
						}
					/>
					<Route
						path="/auth"
						element={
							<Suspense fallback={<h2>Loading...</h2>}>
								<Auth />
							</Suspense>
						}
					/>
					<Route
						path="/login"
						element={
							<Suspense fallback={<h2>Loading...</h2>}>
								<Login />
							</Suspense>
						}
					/>
					<Route
						path="/signup"
						element={
							<Suspense fallback={<h2>Loading...</h2>}>
								<Register />
							</Suspense>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}
