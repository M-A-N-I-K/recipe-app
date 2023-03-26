import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post("http://localhost:3000/auth/register", {
				username,
				password,
			});
			alert("Registration Completed! Now Login.");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex justify-center p-10">
			<Card color="transparent" shadow={false}>
				<Typography variant="h4" color="blue-gray">
					Sign Up
				</Typography>
				<Typography color="gray" className="mt-1 font-normal">
					Enter your details to register.
				</Typography>
				<form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
					<div className="mb-4 flex flex-col gap-6">
						<Input size="lg" label="Name" />
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
						Register
					</Button>
					<Typography
						color="gray"
						className="mt-4 text-center font-normal"
					>
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-medium text-blue-500 transition-colors hover:text-blue-700"
						>
							Sign In
						</Link>
					</Typography>
				</form>
			</Card>
		</div>
	);
}
