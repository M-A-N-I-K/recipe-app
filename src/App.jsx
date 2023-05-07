import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home";
import NavBar from "./Components/navbar";
import { lazy, Suspense } from "react";
import Spinner from "./Components/spinner";

const SavedRecipe = lazy(() => import("./Pages/savedRecipe.jsx"));
const CreateRecipe = lazy(() => import("./Pages/createRecipe.jsx"));
const Auth = lazy(() => import("./Pages/auth.jsx"));
const Login = lazy(() => import("./Components/Login.jsx"));
const Register = lazy(() => import("./Components/Register.jsx"));

export default function App() {
	return (
		<div>
			<HashRouter>
				<NavBar />
				<Routes>
					<Route
						path="/"
						element={
							<Suspense fallback={<Spinner />}>
								<Home />
							</Suspense>
						}
					/>
					<Route
						path="/create-recipe"
						element={
							<Suspense fallback={<Spinner />}>
								<CreateRecipe />
							</Suspense>
						}
					/>

					<Route
						path="/saved-recipe"
						element={
							<Suspense fallback={<Spinner />}>
								<SavedRecipe />
							</Suspense>
						}
					/>
					<Route
						path="/auth"
						element={
							<Suspense fallback={<Spinner />}>
								<Auth />
							</Suspense>
						}
					/>
					<Route
						path="/login"
						element={
							<Suspense fallback={<Spinner />}>
								<Login />
							</Suspense>
						}
					/>
					<Route
						path="/signup"
						element={
							<Suspense fallback={<Spinner />}>
								<Register />
							</Suspense>
						}
					/>
				</Routes>
			</HashRouter>
		</div>
	);
}
