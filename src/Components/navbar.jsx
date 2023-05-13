import React from "react";
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
	Card,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function navbar() {
	const [openNav, setOpenNav] = React.useState(false);
	const [cookies, setCookies] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const logout = () => {
		setCookies("access_token", "");
		window.localStorage.removeItem("userID");
		navigate("/");
	};

	React.useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navList = (
		<ul className="mb-4 mt-3 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row items-center text-white lg:gap-6">
			<Typography
				as="li"
				variant="small"
				className="p-1 font-normal"
			>
				<Link to="/home">Home</Link>
			</Typography>
			<Typography
				as="li"
				variant="small"
				className="p-1 font-normal"
			>
				<Link to="/create-recipe" className="flex items-center">
					Create Recipe
				</Link>
			</Typography>
			{!cookies.access_token ? (
				<Typography
					as="li"
					variant="small"
					className="p-1 font-normal"
				>
					<Link to="/" className="flex items-center">
						Login/Register
					</Link>
				</Typography>
			) : (
				<>
					<Typography
						as="li"
						variant="small"

						className="p-1 font-normal"
					>
						<Link to="/saved-recipe" className="flex items-center">
							Saved Recipe
						</Link>
					</Typography>
					<Typography
						as="li"
						variant="small"
						className="p-1 font-normal"
					>
						<Button size="sm" onClick={logout}>
							Log out
						</Button>
					</Typography>
				</>
			)}
		</ul>
	);

	return (
		<>
			<Navbar className="sticky inset-0 z-10 h-max max-w-full bg-[#E45E9D] rounded-none py-2 px-4 lg:px-8 lg:py-4">
				<div className="flex items-center justify-between text-white">
					<div >

						<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 300.00000 500.00000"
							preserveAspectRatio="xMidYMid meet"
							className="absolute top-2 lg:top-3 text-white left-0 w-[70px] h-[70px] lg:h-[80px] ">
							<metadata>
								Created by potrace 1.16, written by Peter Selinger 2001-2019
							</metadata>
							<g transform="translate(0.000000,350.00000) scale(0.100000,-0.100000)"
								fill="currentColor" stroke="none">
								<path d="M3344 3498 c32 -18 79 -53 105 -78 l46 -45 -964 -3 c-880 -2 -966 -4
										-983 -19 -31 -28 -20 -6 29 54 25 32 34 47 19 33 -39 -35 -87 -112 -81 -128 2
										-7 1 -11 -4 -8 -11 7 -29 -34 -46 -108 -22 -91 -21 -1299 0 -1401 38 -180 154
										-302 336 -352 58 -16 124 -18 724 -18 l660 0 81 27 c131 45 210 111 268 225
										55 109 56 125 56 798 0 379 -4 645 -10 684 -14 83 -44 167 -59 163 -7 -1 -9 2
										-6 8 17 28 -93 139 -182 184 -58 29 -49 16 11 -16z m-559 -292 c273 -89 472
										-311 529 -588 9 -42 16 -98 16 -124 0 -30 7 -54 20 -71 38 -49 61 -132 61
										-223 0 -132 -47 -239 -125 -285 -74 -43 -134 -28 -206 51 -24 27 -37 38 -29
										24 10 -16 14 -39 11 -63 -10 -89 -220 -202 -422 -228 -148 -18 -344 24 -477
										102 -131 78 -269 240 -327 383 -25 63 -56 210 -56 266 0 16 -10 36 -26 51 -50
										46 -54 65 -54 251 0 95 3 197 6 226 6 47 9 52 32 52 14 0 34 -7 44 -17 16 -14
										18 -33 18 -164 0 -81 4 -150 9 -153 20 -13 41 81 41 187 0 124 8 147 50 147
										30 0 50 -22 50 -57 0 -13 22 2 74 52 110 104 228 168 370 201 99 22 292 13
										391 -20z"/>
								<path d="M2416 3014 c-86 -21 -192 -81 -260 -147 l-59 -58 7 -92 c8 -123 -3
										-160 -66 -220 l-50 -47 7 -56 c26 -210 179 -395 383 -466 95 -32 259 -33 352
										0 88 30 156 70 223 132 l57 52 0 78 c0 101 28 192 76 249 35 40 36 45 31 98
										-23 220 -199 420 -423 478 -71 18 -199 18 -278 -1z m455 -323 c23 -23 29 -38
										29 -72 0 -41 -4 -46 -172 -216 -95 -96 -185 -181 -200 -189 -56 -29 -76 -20
										-175 79 -87 87 -93 96 -93 134 0 30 7 47 26 67 45 44 94 39 151 -17 l43 -41
										143 142 c133 132 146 142 181 142 28 0 45 -7 67 -29z"/>
							</g>
						</svg>
					</div >

					< div className="flex items-center gap-4" >
						<div className="mr-4 hidden lg:block">{navList}</div>
						<IconButton
							variant="text"
							className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
							ripple={false}
							onClick={() => setOpenNav(!openNav)}
						>
							{openNav ? (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									className="h-6 w-6"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							)}
						</IconButton>
					</ div>
				</div >
				<MobileNav open={openNav}>{navList}</MobileNav>
			</Navbar >
		</>
	);
}
