import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGetUserId } from "../hooks/useGetUserId.jsx";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const home = () => {
	const [recipes, setRecipes] = useState([]);
	const userID = useGetUserId();
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [cookies, _] = useCookies(["access_token"]);
	const BaseUrl = "https://recipe-app-t7qp.onrender.com";
	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await axios.get(`${BaseUrl}/recipes`);
				setRecipes(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(
					`${BaseUrl}/recipes/savedRecipes/ids/${userID}`
				);
				setSavedRecipes(response.data.savedRecipes);
			} catch (err) {
				console.error(err);
			}
		};
		fetchRecipe();
		if (cookies.access_token) {
			fetchSavedRecipe();
		}
	}, []);
	const saveRecipe = async (recipeID) => {
		try {
			const response = await axios.put(
				`${BaseUrl}/recipes`,
				{
					recipeID,
					userID,
				},
				{ headers: { authorization: cookies.access_token } }
			);
			setSavedRecipes(response.data.savedRecipes);
			toast("Recipe saved!", {
				position: "top-center",
				autoClose: 5000,
				transition: Zoom,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		} catch (err) {
			console.error(err);
		}
	};

	const isRecipeSaved = (Id) => savedRecipes?.includes(Id);
	return (
		<div className="relative grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 s:grid-cols-1 gap-x-10 gap-y-10 justify-center p-10 ">
			{recipes.map((recipe) => {
				return (
					<Card
						className="bg-[#f7ecec] 2xl:w-96 xl:w-96 lg:w-5/6 s:w-48 md:w-80 flex justify-between"
						key={recipe._id}
					>
						<ToastContainer
							position="top-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme="light"
						/>
						<CardHeader floated={false} className="group relative transform transition duration-500 hover:scale-110 hover:cursor-pointer h-[20rem] object-fill">
							<img src={recipe.imgUrl} alt={recipe.name} className="group-hover:opacity-50" />
							<div className="absolute -bottom-70 group-hover:bottom-2 right-2 left-2 transition-all duration-600 bg-white dark:bg-slate-900 p-4 rounded shadow dark:shadow-gray-700">
								<Typography
									color="blue"
									className="font-medium opacity-100"
									textGradient
								>
									{recipe.instructions}
								</Typography>
							</div>

						</CardHeader>
						<CardBody className="text-center">
							<Typography
								variant="h4"
								color="blue-gray"
							>
								{recipe.name}

							</Typography>
							<div className="flex justify-between">

								<Typography
									color="blue"
									className="font-medium text-black"
									textGradient
								>
									Cooking Time {recipe.cookingTime} (mins)
								</Typography>
								<button
									className="text-xs bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded ml-10"
									disabled={isRecipeSaved(recipe._id)}
									onClick={() => {
										saveRecipe(recipe._id);
									}}
								>
									{isRecipeSaved(recipe._id) ? "Added" : "Add to favourites"}
								</button>
							</div>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};

export default home;
