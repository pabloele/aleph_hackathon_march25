import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import { useCallback } from "react";
import { MiniKit, VerificationLevel } from "@worldcoin/minikit-js";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const { login } = useAuthStore();
	const { toast } = useToast();
	const navigate = useNavigate();
	const handleLogin = useCallback(async () => {
		if (!MiniKit.isInstalled()) {
			toast({
				title: "Error",
				description: "World ID no está instalado",
				variant: "destructive",
			});
			return;
		}

		const verifyPayload = {
			action: "register-action",
			verification_level: VerificationLevel.Device,
		};
		const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

		if (finalPayload.status === "error") {
			toast({
				title: "Error",
				description: "Verificación fallida",
				variant: "destructive",
			});
			return;
		}

		const result = await login(finalPayload.nullifier_hash);

		if (result.success) {
			toast({ title: "Éxito", description: "Inicio de sesión exitoso" });
			navigate("/wallet");
		} else {
			toast({
				title: "Error",
				description: result.error,
				variant: "destructive",
			});
		}
	}, [login, toast]);

	return (
		<section className="container bg-slate-100 flex flex-col items-center py-20 md:py-32 gap-10 h-screen">
			<div className="text-center lg:text-start space-y-6">
				<main className="text-5xl md:text-6xl font-bold">
					<h1 className="inline">
						<span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] text-transparent bg-clip-text">
							Iniciar sesión
						</span>
					</h1>
				</main>
				<p className="text-xl text-muted-foreground text-center md:w-10/12 mx-auto">
					Accede con World ID
				</p>
			</div>
			<Button className="w-full" onClick={handleLogin}>
				<div className="flex items-center gap-2">
					<img src="/worldcoin.png" alt="Worldcoin" className="w-7" />
					Iniciar sesión con Worldcoin
				</div>
			</Button>
		</section>
	);
}
