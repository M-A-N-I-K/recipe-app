import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	IconButton,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const home = () => {
	const [recipes, setRecipes] = useState([]);
	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await axios.get("http://localhost:3000/recipes");
				setRecipes(response.data);
			} catch (err) {
				console.error(err);
			}
		};
		fetchRecipe();
	}, []);
	return (
		<div className="relative grid xl:grid-cols-3 l:grid-cols-3 md:grid-cols-2 s:grid-cols-1 gap-x-10 gap-y-10 justify-center p-10">
			{recipes.map((recipe) => {
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
								variant="h4"
								color="blue-gray"
								className="mb-2"
							>
								{recipe.name}
								<IconButton
									variant="outlined"
									size="sm"
									className="ml-20"
									ripple={true}
								>
									<i className="fa fa-bookmark" />
								</IconButton>
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
