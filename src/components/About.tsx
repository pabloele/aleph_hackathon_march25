export const About = () => {
	return (
		<section id="about" className="container py-24 sm:py-32">
			<div className="bg-trasparen border rounded-lg py-12">
				<div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
					<img
						src="../src/assets/image.png"
						alt=""
						className="w-[300px] object-contain rounded-lg"
					/>
					<div className="bg-dark-50 flex flex-col justify-between">
						<div className="pb-50">
							<h2 className="text-3xl md:text-4xl font-bold">
								<span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
									TrustPays{" "}
								</span>
							</h2>
							<p className="text-xl text-muted-foreground my-[2rem]">
								Bienvenido a TrustPays, la aplicación de pagos que te ofrece
								seguridad y confianza en cada transacción. Utilizando la
								tecnología de World ID de Worldcoin, garantizamos que tus pagos
								sean realizados por usuarios verificados y con reputación. Con
								TrustPays, puedes disfrutar de un sistema de pagos transparente
								y sin fricciones, donde la confianza es lo más importante.
								Conecta tu cuenta, realiza pagos con facilidad y construye tu
								historial de reputación, todo en un solo lugar.
							</p>
						</div>

						{/* <Statistics /> */}
					</div>
				</div>
			</div>
		</section>
	);
};
