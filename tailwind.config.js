export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FF8C00",
        gold: "#FFB300",
        amber: "#FF6B00",
        cyan: "#00D4FF",
        purple: "#7C5CFC",
        dark: "#0A0A0F",
        dark2: "#111118",
        card: "rgba(255,255,255,0.04)",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
        float: "float 4s ease-in-out infinite",
        pulse2: "pulse2 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        marquee2: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulse2: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(255,179,0,0.4)" },
          "50%": { boxShadow: "0 0 0 10px rgba(255,179,0,0)" },
        },
      },
    },
  },
  plugins: [],
};
