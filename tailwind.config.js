module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'twitter-bg': '#1da1f2',
        'facebook-bg': '#4267B2',
        'pinterest-bg': '#E60023',

      },
      outlineColor: {
        'twitter': '#1da1f2',
        'facebook': '#4267B2',
        'instagram': '#a02d76',
        'pinterest': '#E60023'
      },
      transitionProperty: {
        'outline': 'outline-offset, outline-color, background-color',
        'bg-size': 'background-size',
      },
      keyframes: {
        shake: {
          '10%': { transform: 'rotate(10deg)' },
          '20%': { transform: 'rotate(-10deg)' },
          '30%': { transform: 'rotate(10deg)' },
          '40%': { transform: 'rotate(-10deg)' },
        }
      },
      animation: {
        shake: 'shake 1s'
      },
      backgroundImage: {
        'ig-gradient':
          "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)",
        'text-gradient': 'linear-gradient(#46B5D3, #46B5D3)'
      },
      backgroundSize: {
        '0': '0% 2px',
        '3': '100% 2px'
      }
    },
  },
  plugins: [],
}