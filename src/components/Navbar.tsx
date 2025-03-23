import { useState } from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

import { Button, buttonVariants } from "./ui/button";
import { Menu } from "lucide-react";
import { LogIn } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import { GiPayMoney } from "react-icons/gi";
import { LuWallet } from "react-icons/lu";
interface RouteProps {
	href: string;
	label: string;
}

const routeList: RouteProps[] = [
	// {
	//   href: "#wallet",
	//   label: "Wallet",
	// },
	// {
	//   href: "#testimonials",
	//   label: "Ganancias",
	// },
];

export const Navbar = () => {
	const {
		// user,
		isAuthenticated,
		logout,
	} = useAuthStore();

	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
			<NavigationMenu className="mx-auto">
				<NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
					<NavigationMenuItem className="font-bold flex flex-1">
						<Link className="" to="/">
							<GiPayMoney />
							TrustPays
						</Link>
					</NavigationMenuItem>

					{/* mobile */}
					<span className="flex md:hidden">
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger className="px-2">
								<Menu
									className="flex md:hidden h-5 w-5"
									onClick={() => setIsOpen(true)}
								>
									<span className="sr-only">Menu Icon</span>
								</Menu>
							</SheetTrigger>

							<SheetContent side={"left"}>
								<SheetHeader>
									<SheetTitle className="font-bold text-xl">
										TrustPays
									</SheetTitle>
								</SheetHeader>
								<nav className="flex flex-col justify-center items-center gap-2 mt-4">
									<Link className="" to="/">
										Inicio
									</Link>

									{isAuthenticated === true ? (
										<>
											<Button onClick={logout}>Cerrar Sesion</Button>
											<Button onClick={() => navigate("/wallet")}>
												Wallet
											</Button>
										</>
									) : (
										<>
											<Link className="" to="/">
												Registro
											</Link>
											<Link className="" to="/login">
												Iniciar Sesion
											</Link>
										</>
									)}
								</nav>
							</SheetContent>
						</Sheet>
					</span>

					<nav className="hidden md:flex gap-2 flex-2">
						{routeList.map((route: RouteProps, i) => (
							<a
								rel="noreferrer noopener"
								href={route.href}
								key={i}
								className={`text-[17px] ${buttonVariants({
									variant: "ghost",
								})}`}
							>
								{route.label}
							</a>
						))}
					</nav>
					<div className="hidden md:flex items-center gap-4">
						<Link
							to="/wallet"
							className={`border flex items-center gap-2 ${buttonVariants({
								variant: "secondary",
							})}`}
						>
							Wallet
							<LuWallet className="mr-2 w-5 h-5 flex items-center gap-4" />
						</Link>
						<Link
							to="/register"
							className={`border flex items-center gap-2 ${buttonVariants({
								variant: "secondary",
							})}`}
						>
							Register
							<CircleUserRound className="mr-2 w-5 h-5 flex items-center gap-4" />
						</Link>
						<Link
							to="/login"
							className={`border flex items-center gap-2  ${buttonVariants({
								variant: "secondary",
							})}`}
						>
							Login
							<LogIn className="mr-2 w-5 h-5" />
						</Link>
					</div>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
};
