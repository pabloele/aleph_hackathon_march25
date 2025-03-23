import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const MainSection = () => {
	const navigate = useNavigate();

	return (
		<section className="container grid place-items-center py-20 md:py-32 gap-10">
			<div className="max-w-[90%] w-full lg:w-3/4 text-center space-y-6">
				<h1 className="text-5xl sm:text-xl md:text-6xl font-bold">
					<p className="bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text mr-2">
						TrustPays
					</p>
					<p className="bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text mr-2">
						PAGOS
					</p>
					con confianza
				</h1>

				<p className="text-xl text-muted-foreground">
					Crece mientras aumenta tu reputación
				</p>

				<div className="flex flex-col md:flex-row md:space-x-4 justify-center space-y-4 md:space-y-0">
					<Button
						onClick={() => navigate("/register")}
						className="w-full md:w-1/3"
					>
						Comienza aquí
					</Button>
				</div>
			</div>
		</section>
	);
};
