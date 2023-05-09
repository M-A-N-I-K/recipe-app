import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId.jsx";

const savedRecipes = () => {
	const [savedRecipes, setSavedRecipes] = useState([]);
	const userID = useGetUserId();
	const BaseUrl = "https://recipe-app-t7qp.onrender.com";
	useEffect(() => {
		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(
					`${BaseUrl}/recipes/savedRecipes/${userID}`
				);
				setSavedRecipes(response.data.savedRecipes);
			} catch (err) {
				console.error(err);
			}
		};
		fetchSavedRecipe();
	}, []);

	return (
		<div className="relative grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-10 gap-y-10 justify-center p-10">
			{savedRecipes?.map((recipe) => {
				return (
					<Card
						className="w-96 bg-[#f7ecec] flex justify-between"
						key={recipe._id}
					>
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
							<Typography
								color="blue"
								className="font-medium text-black"
								textGradient
							>
								Cooking Time {recipe.cookingTime} (mins)
							</Typography>
						</CardBody>
					</Card>
				);
			})}
		</div>
	);
};

export default savedRecipes;
