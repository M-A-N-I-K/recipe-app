import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function register() {
	const BaseUrl = "https://recipe-app-t7qp.onrender.com";
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post(`${BaseUrl}/auth/register`, {
				username,
				password,
			});
			toast.success("User registered Successfully!", {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
			setTimeout(() => {
				navigate("/");
			}, [1500])
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="h-[94vh] lg:h-[91vh] flex flex-col items-center justify-center bg-gray-300">

			<div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-xl w-full max-w-md">

				<div className="flex justify-center p-10">
					<ToastContainer
						position="bottom-center"
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
					<Card color="transparent" shadow={false}>
						<Typography variant="h4" className="text-center" color="blue-gray">
							Sign Up
						</Typography>
						<Typography color="gray" className="mt-1 text-center font-normal">
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
							<Button className="mt-6 bg-[#E45E9D] hover:shadow-pink-200" fullWidth onClick={onSubmit}>
								Register
							</Button>
							<Typography
								color="gray"
								className="mt-4 text-center font-normal"
							>
								Already have an account?{" "}
								<Link
									to="/"
									className="font-medium text-[#E45E9D] transition-colors hover:text-pink-800"
								>
									Sign In
								</Link>
							</Typography>
						</form>
					</Card>
				</div>

			</div>
		</div>
	);
}