/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         backgroundImage: {
            bckImg: "url('./src/assets/images/premium_photo-1661288470388-c5006797bdff.avif')"
         }
      }
   },
   plugins: []
};
