/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-error-container": "#93000a",
        "surface-dim": "#edd5cb",
        "on-secondary": "#ffffff",
        "on-tertiary-fixed": "#002109",
        "surface-bright": "#fff8f6",
        "secondary": "#5e5e5e",
        "secondary-container": "#e2e2e2",
        "on-secondary-fixed": "#1b1b1b",
        "surface-container-high": "#fce3d9",
        "surface-container-highest": "#f6ded3",
        "on-primary": "#ffffff",
        "on-error": "#ffffff",
        "inverse-primary": "#ffb690",
        "tertiary-fixed-dim": "#62df7d",
        "secondary-fixed": "#e2e2e2",
        "surface-tint": "#9d4300",
        "outline": "#8c7164",
        "surface-container-low": "#fff1eb",
        "on-surface": "#251913",
        "tertiary-fixed": "#7ffc97",
        "secondary-fixed-dim": "#c6c6c6",
        "surface": "#fff8f6",
        "on-tertiary-container": "#003b15",
        "inverse-surface": "#3c2d26",
        "surface-container-lowest": "#ffffff",
        "on-background": "#251913",
        "on-tertiary": "#ffffff",
        "on-primary-container": "#582200",
        "on-secondary-fixed-variant": "#474747",
        "primary-fixed-dim": "#ffb690",
        "primary": "#9d4300",
        "surface-container": "#ffeae0",
        "on-primary-fixed": "#341100",
        "surface-variant": "#f6ded3",
        "outline-variant": "#e0c0b1",
        "tertiary-container": "#2cb055",
        "primary-fixed": "#ffdbca",
        "on-surface-variant": "#584237",
        "tertiary": "#006e2d",
        "error": "#ba1a1a",
        "on-secondary-container": "#646464",
        "on-primary-fixed-variant": "#783200",
        "background": "#fff8f6",
        "on-tertiary-fixed-variant": "#005320",
        "inverse-on-surface": "#ffede6",
        "primary-container": "#f97316",
        "error-container": "#ffdad6"
      },
      fontFamily: {
        "headline": ["Plus Jakarta Sans"],
        "body": ["Plus Jakarta Sans"],
        "label": ["Plus Jakarta Sans"]
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
