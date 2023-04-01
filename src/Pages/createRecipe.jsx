import {
	Card,
	Input,
	Button,
	Typography,
	Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";

export default function createRecipe() {
	const navigate = useNavigate();
	const userID = useGetUserId();
	const [cookies, _] = useCookies(["access_token"]);
	const [recipe, setRecipe] = useState({
		name: "",
		ingredients: [],
		instructions: "",
		imgUrl: "",
		cookingTime: 0,
		userOwner: userID,
	});

	const handleOnChange = (event) => {
		const { name, value } = event.target;
		setRecipe({ ...recipe, [name]: value });
	};

	const handleIngredientChange = (event, idx) => {
		const { value } = event.target;
		const ingredients = recipe.ingredients;
		ingredients[idx] = value;
		setRecipe({ ...recipe, ingredients });
	};

	const addIngredient = () => {
		setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post("http://localhost:3000/recipes", recipe, {
				headers: { authorization: cookies.access_token },
			});
			alert("Recipe Created!");
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="flex justify-center p-10">
			<Card color="transparent" shadow={false}>
				<Typography variant="h4" color="blue-gray">
					Create Recipe
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					Enter recipe details to create a new recipe.
				</Typography>
				<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
					<div className="mb-4 flex flex-col gap-6">
						<Input
							size="lg"
							name="name"
							label="Recipe Name"
							onChange={handleOnChange}
						/>
						{recipe.ingredients.map((ingredient, idx) => (
							<Input
								key={idx}
								size="lg"
								name="ingredients"
								value={ingredient}
								label="Ingredient"
								onChange={(event) => {
									handleIngredientChange(event, idx);
								}}
							/>
						))}
						<Button variant="outlined" onClick={addIngredient}>
							Add Ingredient
						</Button>
						<Textarea
							name="instructions"
							label="Instructions"
							onChange={handleOnChange}
						/>
						<Input
							size="lg"
							name="imgUrl"
							label="ImgURL"
							onChange={handleOnChange}
						/>
						<Input
							type="Number"
							name="cookingTime"
							size="lg"
							label="Cooking Time (Mins)"
							onChange={handleOnChange}
						/>
					</div>
					<Button className="mt-6" fullWidth onClick={handleSubmit}>
						Save Recipe
					</Button>
				</form>
			</Card>
		</div>
	);
}
