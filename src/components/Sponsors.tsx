import { ReactNode } from "react";
interface SponsorProps {
	icon: ReactNode;
	name: string;
}

const sponsors: SponsorProps[] = [
	{
		icon: <img src="./world-logo.svg" alt="" width={34} height={34} />,
		name: "",
	},
];

export const Sponsors = () => {
	return (
		<section id="sponsors" className="container pt-24 sm:py-32">
			<h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
				Powered by
			</h2>

			<div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
				{sponsors.map(({ icon, name }: SponsorProps) => (
					<div
						key={name}
						className="flex items-center gap-1 text-muted-foreground/60"
					>
						<span>{icon}</span>
						<h3 className="text-xl  font-bold">{name}</h3>
					</div>
				))}
			</div>
		</section>
	);
};

export default Sponsors;
