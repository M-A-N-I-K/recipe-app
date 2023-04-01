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
	useEffect(() => {
		const fetchSavedRecipe = async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/recipes/savedRecipes/${userID}`
				);
				setSavedRecipes(response.data.savedRecipes);
			} catch (err) {
				console.error(err);
			}
		};
		fetchSavedRecipe();
	}, []);

	return (
		<div className="relative grid xl:grid-cols-3 l:grid-cols-3 md:grid-cols-2 s:grid-cols-1 gap-x-10 gap-y-10 justify-center p-10">
			{savedRecipes.map((recipe) => {
				return (
					<Card
						className="w-96 s:w-48 flex justify-between"
						key={recipe._id}
					>
						<CardHeader floated={false} className="h-80">
							<img
								src={recipe.imgUrl}
								alt={recipe.name}
								className="object-fill"
							/>
						</CardHeader>
						<CardBody className="text-center">
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

export default savedRecipes;
