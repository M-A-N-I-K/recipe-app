import { Card, Typography, Input, Button } from "@material-tailwind/react";
import react, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function login() {
	const BaseUrl = "https://recipe-app-t7qp.onrender.com";
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(`${BaseUrl}/auth/login`, {
				username,
				password,
			});
			setCookies("access_token", response.data.token);
			if (typeof window !== "undefined") {
				window.localStorage.setItem("userID", response.data.userID);
			}
			navigate("/home");
		} catch (err) {
			alert(err);
		}
	};
	return (
		<div className="h-[94vh] lg:h-[91vh] flex flex-col items-center justify-center bg-gray-300">
			<div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl w-full max-w-md">
				<div className="auth-container flex justify-center p-10">
					<Card color="transparent" shadow={false}>
						<Typography variant="h4" className="text-center" color="blue-gray">
							Sign In
						</Typography>
						<Typography color="gray" className="mt-1 text-center font-normal">
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
							<Button className="mt-6 bg-[#E45E9D] hover:shadow-pink-200" fullWidth onClick={onSubmit}>
								Sign In
							</Button>
							<Typography
								color="gray"
								className="mt-4 text-center font-normal"
							>
								Don't have an account?{" "}
								<Link
									to="/signup"
									className="font-medium text-[#E45E9D] transition-colors hover:text-pink-800"
								>
									Sign Up
								</Link>
							</Typography>
						</form>
					</Card>
				</div>
			</div>
		</div>
	);
}
