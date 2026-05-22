import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(240 5.9% 90%)",
        input: "hsl(240 5.9% 90%)",
        ring: "hsl(240 5% 64.9%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(240 10% 3.9%)",
        muted: "hsl(240 4.8% 95.9%)",
        "muted-foreground": "hsl(240 3.8% 46.1%)",
        primary: "hsl(240 5.9% 10%)",
        "primary-foreground": "hsl(0 0% 98%)",
        destructive: "hsl(0 84.2% 60.2%)",
        "destructive-foreground": "hsl(0 0% 98%)",
        card: "hsl(0 0% 100%)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
