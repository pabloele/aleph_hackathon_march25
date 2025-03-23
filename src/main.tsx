import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster.tsx";

import { ThirdwebProvider } from "thirdweb/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider>
			<ThirdwebProvider>
				<App />
			</ThirdwebProvider>

			<Toaster />
		</ThemeProvider>
	</React.StrictMode>
);
