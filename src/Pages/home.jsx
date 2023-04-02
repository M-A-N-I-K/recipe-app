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

const home = () => {
	const [recipes, setRecipes] = useState([]);
	const userID = useGetUserId();
	const [savedRecipes, setSavedRecipes] = useState([]);
	const [cookies, _] = useCookies(["access_token"]);
	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await axios.get(
					"https://recipe-app-21hr.onrender.com/recipes"
				);
				setRecipes(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(
					`https://recipe-app-21hr.onrender.com/recipes/savedRecipes/ids/${userID}`
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
				"https://recipe-app-21hr.onrender.com/recipes",
				{
					recipeID,
					userID,
				},
				{ headers: { authorization: cookies.access_token } }
			);
			setSavedRecipes(response.data.savedRecipes);
		} catch (err) {
			console.error(err);
		}
	};

	const isRecipeSaved = (Id) => savedRecipes.includes(Id);
	return (
		<div className="relative grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 s:grid-cols-1 gap-x-10 gap-y-10 justify-center p-10">
			{recipes.map((recipe) => {
				return (
					<Card
						className="2xl:w-96 xl:w-96 lg:w-5/6 s:w-48 md:w-80 flex justify-between"
						key={recipe._id}
					>
						<CardHeader floated={false} className="h-[20rem] object-fill">
							<img src={recipe.imgUrl} alt={recipe.name} />
						</CardHeader>
						<CardBody className="text-center">
							<Typography
								variant="h4"
								color="blue-gray"
								className="mb-2"
							>
								{recipe.name}
								<button
									className="text-xs bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded ml-10"
									disabled={isRecipeSaved(recipe._id)}
									onClick={() => {
										saveRecipe(recipe._id);
									}}
								>
									{isRecipeSaved(recipe._id) ? "Saved" : "Save"}
								</button>
							</Typography>
							<Typography
								color="blue"
								className="font-medium"
								textGradient
							>
								{recipe.instructions}
							</Typography>
						</CardBody>
						<CardFooter>
							<Typography
								color="blue"
								className="font-medium text-black"
								textGradient
							>
								Cooking Time {recipe.cookingTime} (mins)
							</Typography>
						</CardFooter>
					</Card>
				);
			})}
		</div>
	);
};

export default home;
