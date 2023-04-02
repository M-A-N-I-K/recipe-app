import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"https://recipe-app-21hr.onrender.com/login",
				{
					username,
					password,
				}
			);
			setCookies("access_token", response.data.token);
			window.localStorage.setItem("userID", response.data.userID);
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="auth-container flex justify-center p-10">
			<Card color="transparent" shadow={false}>
				<Typography variant="h4" color="blue-gray">
					Sign In
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					Enter your details to Sign In.
				</Typography>
				<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
					<div className="mb-4 flex flex-col gap-6">
						<Input
							size="lg"
							label="Username"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						/>
						<Input
							type="password"
							size="lg"
							label="Password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					<Button className="mt-6" fullWidth onClick={onSubmit}>
						Sign In
					</Button>
					<Typography
						color="gray"
						className="mt-4 text-center font-normal"
					>
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="font-medium text-blue-500 transition-colors hover:text-blue-700"
						>
							Sign Up
						</Link>
					</Typography>
				</form>
			</Card>
		</div>
	);
}
