import { interpolate, oklch, wcagContrast } from "culori";
import { Branding } from "./types";

export const defaultTheme = "dim";

const colorUtils = {
  cutNumber: function (number) {
    try {
      if (number) {
        return +number.toFixed(6);
      } else {
        return 0;
      }
    } catch (e) {
      console.error(number);
      return false;
    }
  },
  isDark: (color) => {
    try {
      if (wcagContrast(color, "black") < wcagContrast(color, "white")) {
        return true;
      }
      return false;
    } catch (e) {
      console.error(color);
      return false;
    }
  },

  colorObjToString: function (input) {
    const { l, c, h } = input;
    return `${this.cutNumber(l)} ${this.cutNumber(c)} ${this.cutNumber(h)}`;
  },

  generateForegroundColorFrom: function (
    input: string,
    percentage: number = 0.8
  ) {
    const result = interpolate(
      [input, this.isDark(input) ? "white" : "black"],
      "oklch"
    )(percentage);
    return this.colorObjToString(result);
  },

  generateDarkenColorFrom: function (input, percentage = 0.07) {
    const result = interpolate([input, "black"], "oklch")(percentage);
    return this.colorObjToString(result);
  },
};

export const getTheme = (
  theme,
  colorOverrides: Branding["colors"] = undefined
) => {
  const input = { ...themes[theme], ...colorOverrides };

  let resultObj = {};

  Object.entries(input).forEach(([rule, value]: any) => {
    if (Object.hasOwn(colorNames, rule)) {
      try {
        const colorObj = oklch(value);
        resultObj[colorNames[rule]] = colorUtils.colorObjToString(colorObj);
        resultObj[`--${rule}`] = value;
      } catch (e) {
        console.error(e);
      }
    } else {
      resultObj[rule] = value;
    }

    // auto generate base colors
    if (!Object.hasOwn(input, "base-100")) {
      resultObj["--b1"] = "100 0 0";
    }
    if (!Object.hasOwn(input, "base-200")) {
      resultObj["--b2"] = colorUtils.generateDarkenColorFrom(
        input["base-100"],
        0.04
      );
    }
    if (!Object.hasOwn(input, "base-300")) {
      if (Object.hasOwn(input, "base-200")) {
        resultObj["--b3"] = colorUtils.generateDarkenColorFrom(
          input["base-200"],
          0.4
        );
      } else {
        resultObj["--b3"] = colorUtils.generateDarkenColorFrom(
          input["base-100"],
          0.08
        );
      }
    }

    // auto generate state colors
    if (!Object.hasOwn(input, "info")) {
      resultObj["--in"] = "0.7206 0.191 231.6";
    }
    if (!Object.hasOwn(input, "success")) {
      resultObj["--su"] = "64.8% 0.150 160";
    }
    if (!Object.hasOwn(input, "warning")) {
      resultObj["--wa"] = "0.8471 0.199 83.87";
    }
    if (!Object.hasOwn(input, "error")) {
      resultObj["--er"] = "0.7176 0.221 22.18";
    }

    // auto generate content colors
    if (!Object.hasOwn(input, "base-content")) {
      resultObj["--bc"] = colorUtils.generateForegroundColorFrom(
        input["base-100"],
        0.8
      );
    }
    if (!Object.hasOwn(input, "primary-content")) {
      resultObj["--pc"] = colorUtils.generateForegroundColorFrom(
        input["primary"],
        0.8
      );
    }
    if (!Object.hasOwn(input, "secondary-content")) {
      resultObj["--sc"] = colorUtils.generateForegroundColorFrom(
        input["secondary"],
        0.8
      );
    }
    if (!Object.hasOwn(input, "accent-content")) {
      resultObj["--ac"] = colorUtils.generateForegroundColorFrom(
        input["accent"],
        0.8
      );
    }
    if (!Object.hasOwn(input, "neutral-content")) {
      resultObj["--nc"] = colorUtils.generateForegroundColorFrom(
        input["neutral"],
        0.8
      );
    }
    if (!Object.hasOwn(input, "info-content")) {
      if (Object.hasOwn(input, "info")) {
        resultObj["--inc"] = colorUtils.generateForegroundColorFrom(
          input["info"],
          0.8
        );
      } else {
        resultObj["--inc"] = "0 0 0";
      }
    }
    if (!Object.hasOwn(input, "success-content")) {
      if (Object.hasOwn(input, "success")) {
        resultObj["--suc"] = colorUtils.generateForegroundColorFrom(
          input["success"],
          0.8
        );
      } else {
        resultObj["--suc"] = "0 0 0";
      }
    }
    if (!Object.hasOwn(input, "warning-content")) {
      if (Object.hasOwn(input, "warning")) {
        resultObj["--wac"] = colorUtils.generateForegroundColorFrom(
          input["warning"],
          0.8
        );
      } else {
        resultObj["--wac"] = "0 0 0";
      }
    }
    if (!Object.hasOwn(input, "error-content")) {
      if (Object.hasOwn(input, "error")) {
        resultObj["--erc"] = colorUtils.generateForegroundColorFrom(
          input["error"],
          0.8
        );
      } else {
        resultObj["--erc"] = "0 0 0";
      }
    }

    // add css variables if not exist
    Object.entries(themeDefaults).forEach((item) => {
      const [variable, value] = item;
      if (!Object.hasOwn(input, variable)) {
        resultObj[variable] = value;
      }
    });

    // add other custom styles
    if (!Object.hasOwn(colorNames, rule)) {
      resultObj[rule] = value;
    }
  });

  return resultObj;
};

export const colorNames = {
  "primary": "--p",
  "primary-content": "--pc",
  "secondary": "--s",
  "secondary-content": "--sc",
  "accent": "--a",
  "accent-content": "--ac",
  "neutral": "--n",
  "neutral-content": "--nc",
  "base-100": "--b1",
  "base-200": "--b2",
  "base-300": "--b3",
  "base-content": "--bc",
  "info": "--in",
  "info-content": "--inc",
  "success": "--su",
  "success-content": "--suc",
  "warning": "--wa",
  "warning-content": "--wac",
  "error": "--er",
  "error-content": "--erc",
};

export const themeDefaults = {
  "--rounded-box": "1rem",
  "--rounded-btn": "0.5rem",
  "--rounded-badge": "1.9rem",
  "--animation-btn": "0.25s",
  "--animation-input": ".2s",
  "--btn-focus-scale": "0.95",
  "--border-btn": "1px",
  "--tab-border": "1px",
  "--tab-radius": "0.5rem",
};

export const themes = {
  aqua: {
    "colorScheme": "dark",
    "primary": "#09ecf3",
    "primary-content": "#005355",
    "secondary": "#ffe999",
    "accent": "#3b8ac4",
    "neutral": "#966fb3",
    "base-100": "#113577",
    "info": "#2563eb",
    "success": "#16a34a",
    "warning": "#d97706",
    "error": "oklch(73.95% 0.19 27.33)",
  },
  autumn: {
    "colorScheme": "light",
    "primary": "#8C0327",
    "secondary": "#D85251",
    "accent": "#D59B6A",
    "neutral": "#826A5C",
    "base-100": "#ffffff",
    "info": "#42ADBB",
    "success": "#499380",
    "warning": "#E97F14",
    "error": "oklch(53.07% 0.241 24.16)",
  },
  acid: {
    "colorScheme": "light",
    "primary": "oklch(71.9% 0.357 330.7595734057481)",
    "secondary": "oklch(73.37% 0.224 48.25087840015526)",
    "accent": "oklch(92.78% 0.264 122.96295065960891)",
    "neutral": "oklch(21.31% 0.128 278.68)",
    "base-100": "#fafafa",
    "info": "oklch(60.72% 0.227 252.05)",
    "success": "oklch(85.72% 0.266 158.53)",
    "warning": "oklch(91.01% 0.212 100.5)",
    "error": "oklch(64.84% 0.293 29.34918758658804)",
    "primary-content": "#ffffff",
    "--rounded-box": "1.25rem",
    "--rounded-btn": "1rem",
    "--rounded-badge": "1rem",
    "--tab-radius": "0.7rem",
  },
  black: {
    "colorScheme": "dark",
    "primary": "#373737",
    "secondary": "#373737",
    "accent": "#373737",
    "base-100": "#000000",
    "base-200": "#141414",
    "base-300": "#262626",
    "base-content": "#d6d6d6",
    "neutral": "#373737",
    "info": "#0000ff",
    "success": "#008000",
    "warning": "#ffff00",
    "error": "#ff0000",
    "--rounded-box": "0",
    "--rounded-btn": "0",
    "--rounded-badge": "0",
    "--animation-btn": "0",
    "--animation-input": "0",
    "--btn-focus-scale": "1",
    "--tab-radius": "0",
  },
  bumblebee: {
    "colorScheme": "light",
    "primary": "oklch(89.51% 0.2132 96.61)",
    "primary-content": "oklch(38.92% 0.046 96.61)",
    "secondary": "oklch(80.39% 0.194 70.76)",
    "secondary-content": "oklch(39.38% 0.068 70.76)",
    "accent": "oklch(81.27% 0.157 56.52)",
    "neutral": "oklch(12.75% 0.075 281.99)",
    "base-100": "oklch(100% 0 0)",
  },
  business: {
    "colorScheme": "dark",
    "primary": "#1C4E80",
    "secondary": "#EA6947",
    "accent": "#7C909A",
    "neutral": "#23282E",
    "base-100": "#202020",
    "info": "#0091D5",
    "success": "#6BB187",
    "warning": "#DBAE59",
    "error": "#AC3E31",
    "--rounded-box": "0.25rem",
    "--rounded-btn": ".125rem",
    "--rounded-badge": ".125rem",
  },
  cmyk: {
    "colorScheme": "light",
    "primary": "#45AEEE",
    "secondary": "#E8488A",
    "accent": "#FFF232",
    "neutral": "#1a1a1a",
    "base-100": "oklch(100% 0 0)",
    "info": "#4AA8C0",
    "success": "#823290",
    "warning": "#EE8133",
    "error": "#E93F33",
  },
  coffee: {
    "colorScheme": "dark",
    "primary": "#DB924B",
    "secondary": "#429bb6",
    "accent": "#263E3F",
    "neutral": "#120C12",
    "base-100": "#302727",
    "base-content": "#c59f60",
    "info": "#8DCAC1",
    "success": "#9DB787",
    "warning": "#FFD25F",
    "error": "#FC9581",
  },
  corporate: {
    "colorScheme": "light",
    "primary": "oklch(60.39% 0.228 269.1)",
    "secondary": "#7b92b2",
    "accent": "#67cba0",
    "neutral": "#181a2a",
    "neutral-content": "#edf2f7",
    "primary-content": "#ffffff",
    "base-100": "oklch(100% 0 0)",
    "base-content": "#181a2a",
    "--rounded-box": "0.25rem",
    "--rounded-btn": ".125rem",
    "--rounded-badge": ".125rem",
    "--tab-radius": "0.25rem",
    "--animation-btn": "0",
    "--animation-input": "0",
    "--btn-focus-scale": "1",
  },
  cupcake: {
    "colorScheme": "light",
    "primary": "#65c3c8",
    "secondary": "#ef9fbc",
    "accent": "#eeaf3a",
    "neutral": "#291334",
    "base-100": "#faf7f5",
    "base-200": "#efeae6",
    "base-300": "#e7e2df",
    "base-content": "#291334",
    "--rounded-btn": "1.9rem",
    "--tab-border": "2px",
    "--tab-radius": "0.7rem",
  },
  cyberpunk: {
    "colorScheme": "light",
    "fontFamily":
      "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace",
    "primary": "oklch(74.22% 0.209 6.35)",
    "secondary": "oklch(83.33% 0.184 204.72)",
    "accent": "oklch(71.86% 0.2176 310.43)",
    "neutral": "oklch(23.04% 0.065 269.31)",
    "neutral-content": "oklch(94.51% 0.179 104.32)",
    "base-100": "oklch(94.51% 0.179 104.32)",
    "--rounded-box": "0",
    "--rounded-btn": "0",
    "--rounded-badge": "0",
    "--tab-radius": "0",
  },
  dark: {
    "colorScheme": "dark",
    "primary": "oklch(65.69% 0.196 275.75)",
    "secondary": "oklch(74.8% 0.26 342.55)",
    "accent": "oklch(74.51% 0.167 183.61)",
    "neutral": "#2a323c",
    "neutral-content": "#A6ADBB",
    "base-100": "#1d232a",
    "base-200": "#191e24",
    "base-300": "#15191e",
    "base-content": "#A6ADBB",
  },
  dim: {
    "colorScheme": "dark",
    "primary": "#9FE88D",
    "secondary": "#FF7D5C",
    "accent": "#C792E9",
    "neutral": "#1c212b",
    "neutral-content": "#B2CCD6",
    "base-100": "#2A303C",
    "base-200": "#242933",
    "base-300": "#20252E",
    "base-content": "#B2CCD6",
    "info": "#28ebff",
    "success": "#62efbd",
    "warning": "#efd057",
    "error": "#ffae9b",
  },
  dracula: {
    "colorScheme": "dark",
    "primary": "#ff79c6",
    "secondary": "#bd93f9",
    "accent": "#ffb86c",
    "neutral": "#414558",
    "base-100": "#282a36",
    "base-content": "#f8f8f2",
    "info": "#8be9fd",
    "success": "#50fa7b",
    "warning": "#f1fa8c",
    "error": "#ff5555",
  },
  emerald: {
    "colorScheme": "light",
    "primary": "#66cc8a",
    "primary-content": "#223D30",
    "secondary": "#377cfb",
    "secondary-content": "#fff",
    "accent": "#f68067",
    "accent-content": "#000",
    "neutral": "#333c4d",
    "neutral-content": "#f9fafb",
    "base-100": "oklch(100% 0 0)",
    "base-content": "#333c4d",
    "--animation-btn": "0",
    "--animation-input": "0",
    "--btn-focus-scale": "1",
  },
  fantasy: {
    "colorScheme": "light",
    "primary": "oklch(37.45% 0.189 325.02)",
    "secondary": "oklch(53.92% 0.162 241.36)",
    "accent": "oklch(75.98% 0.204 56.72)",
    "neutral": "#1f2937",
    "base-100": "oklch(100% 0 0)",
    "base-content": "#1f2937",
  },
  forest: {
    "colorScheme": "dark",
    "primary": "#1eb854",
    "primary-content": "#000000",
    "secondary": "#1DB88E",
    "accent": "#1DB8AB",
    "neutral": "#19362D",
    "base-100": "#221b1b",
    "--rounded-btn": "1.9rem",
  },
  garden: {
    "colorScheme": "light",
    "primary": "oklch(62.45% 0.278 3.8363600743192197)",
    "primary-content": "#fff",
    "secondary": "#8E4162",
    "accent": "#5c7f67",
    "neutral": "#291E00",
    "neutral-content": "#e9e7e7",
    "base-100": "#e9e7e7",
    "base-content": "#100f0f",
  },
  halloween: {
    "colorScheme": "dark",
    "primary": "oklch(45.98% 0.248 305.03)",
    "secondary": "oklch(77.48% 0.204 60.62)",
    "accent": "oklch(64.8% 0.223 136.07347934356451)",
    "accent-content": "#000000",
    "neutral": "#2F1B05",
    "base-100": "#212121",
    "info": "#2563eb",
    "success": "#16a34a",
    "warning": "#d97706",
    "error": "oklch(65.72% 0.199 27.33)",
  },
  lemonade: {
    "colorScheme": "light",
    "primary": "oklch(58.92% 0.199 134.6)",
    "secondary": "oklch(77.75% 0.196 111.09)",
    "accent": "oklch(85.39% 0.201 100.73)",
    "neutral": "oklch(30.98% 0.075 108.6)",
    "base-100": "oklch(98.71% 0.02 123.72)",
    "info": "oklch(86.19% 0.047 224.14)",
    "success": "oklch(86.19% 0.047 157.85)",
    "warning": "oklch(86.19% 0.047 102.15)",
    "error": "oklch(86.19% 0.047 25.85)",
    "primary-content": "#ffffff",
  },
  light: {
    "colorScheme": "light",
    "primary": "oklch(49.12% 0.3096 275.75)",
    "secondary": "oklch(69.71% 0.329 342.55)",
    "secondary-content": "oklch(98.71% 0.0106 342.55)",
    "accent": "oklch(76.76% 0.184 183.61)",
    "neutral": "#2B3440",
    "neutral-content": "#D7DDE4",
    "base-100": "oklch(100% 0 0)",
    "base-200": "#F2F2F2",
    "base-300": "#E5E6E6",
    "base-content": "#1f2937",
  },
  lofi: {
    "colorScheme": "light",
    "primary": "#0D0D0D",
    "primary-content": "oklch(100% 0 0)",
    "secondary": "#1A1919",
    "secondary-content": "oklch(100% 0 0)",
    "accent": "#262626",
    "accent-content": "oklch(100% 0 0)",
    "neutral": "#000000",
    "neutral-content": "oklch(100% 0 0)",
    "base-100": "oklch(100% 0 0)",
    "base-200": "#F2F2F2",
    "base-300": "#E6E5E5",
    "base-content": "#000000",
    "info": "oklch(79.54% 0.103 205.9)",
    "success": "oklch(90.13% 0.153 164.14)",
    "warning": "oklch(88.37% 0.135 79.94)",
    "error": "oklch(78.66% 0.15 28.47)",
    "--rounded-box": "0.25rem",
    "--rounded-btn": "0.125rem",
    "--rounded-badge": "0.125rem",
    "--tab-radius": "0.125rem",
    "--animation-btn": "0",
    "--animation-input": "0",
    "--btn-focus-scale": "1",
  },

  luxury: {
    "colorScheme": "dark",
    "primary": "oklch(100% 0 0)",
    "secondary": "#513448",
    "accent": "#152747",
    "neutral": "#331800",
    "neutral-content": "#FFE7A3",
    "base-100": "#09090b",
    "base-200": "#171618",
    "base-300": "#2e2d2f",
    "base-content": "#dca54c",
    "info": "#66c6ff",
    "success": "#87d039",
    "warning": "#e2d562",
    "error": "#ff6f6f",
  },
  night: {
    "colorScheme": "dark",
    "primary": "#38bdf8",
    "secondary": "#818CF8",
    "accent": "#F471B5",
    "neutral": "#1E293B",
    "base-100": "#0F172A",
    "info": "#0CA5E9",
    "info-content": "#000000",
    "success": "#2DD4BF",
    "warning": "#F4BF50",
    "error": "#FB7085",
  },
  nord: {
    "colorScheme": "light",
    "primary": "#5E81AC",
    "secondary": "#81A1C1",
    "accent": "#88C0D0",
    "neutral": "#4C566A",
    "neutral-content": "#D8DEE9",
    "primary-content": "#ffffff",
    "base-100": "#ECEFF4",
    "base-200": "#E5E9F0",
    "base-300": "#D8DEE9",
    "base-content": "#2E3440",
    "info": "#B48EAD",
    "success": "#A3BE8C",
    "warning": "#EBCB8B",
    "error": "#BF616A",
    "--rounded-box": "0.4rem",
    "--rounded-btn": "0.2rem",
    "--rounded-badge": "0.4rem",
    "--tab-radius": "0.2rem",
  },
  pastel: {
    "colorScheme": "light",
    "primary": "#b4e9d6",
    "secondary": "#987ba2",
    "accent": "#f6cbd1",
    "neutral": "#70acc7",
    "base-100": "#fff",
    "base-200": "#eef6f2",
    "base-300": "#eef6f2",
    "--rounded-btn": "1.9rem",
    "--tab-radius": "0.7rem",
  },
  retro: {
    "colorScheme": "light",
    "primary": "#ef9995",
    "primary-content": "#282425",
    "secondary": "#79ac8e",
    "secondary-content": "#282425",
    "accent": "#DC8850",
    "accent-content": "#282425",
    "neutral": "#2E282A",
    "neutral-content": "#EDE6D4",
    "base-100": "#ece3ca",
    "base-200": "#e4d8b4",
    "base-300": "#DBCA9A",
    "base-content": "#282425",
    "info": "#2563eb",
    "success": "#16a34a",
    "warning": "#d97706",
    "error": "oklch(65.72% 0.199 27.33)",
    "--rounded-box": "0.4rem",
    "--rounded-btn": "0.4rem",
    "--rounded-badge": "0.4rem",
    "--tab-radius": "0.4rem",
  },
  sunset: {
    "colorScheme": "dark",
    "primary": "#FF865B",
    "secondary": "#FD6F9C",
    "accent": "#B387FA",
    "neutral": "oklch(26% 0.019 237.69)",
    "neutral-content": "oklch(70% 0.019 237.69)",
    "base-100": "oklch(22% 0.019 237.69)",
    "base-200": "oklch(20% 0.019 237.69)",
    "base-300": "oklch(18% 0.019 237.69)",
    "base-content": "#9fb9d0",
    "info": "#89e0eb",
    "success": "#addfad",
    "warning": "#f1c891",
    "error": "#ffbbbd",
    "--rounded-box": "1.2rem",
    "--rounded-btn": "0.8rem",
    "--rounded-badge": "0.4rem",
    "--tab-radius": "0.7rem",
  },
  synthwave: {
    "colorScheme": "dark",
    "primary": "#e779c1",
    "secondary": "#58c7f3",
    "accent": "oklch(88.04% 0.206 93.72)",
    "neutral": "#221551",
    "neutral-content": "#f9f7fd",
    "base-100": "#1a103d",
    "base-content": "#f9f7fd",
    "info": "#53c0f3",
    "info-content": "#201047",
    "success": "#71ead2",
    "success-content": "#201047",
    "warning": "#eace6c",
    "warning-content": "#201047",
    "error": "#ec8c78",
    "error-content": "#201047",
  },
  valentine: {
    "colorScheme": "light",
    "primary": "#e96d7b",
    "secondary": "#a991f7",
    "accent": "#66b1b3",
    "neutral": "#af4670",
    "neutral-content": "#f0d6e8",
    "primary-content": "#ffffff",
    "base-100": "#fae7f4",
    "base-content": "#632c3b",
    "info": "#2563eb",
    "success": "#16a34a",
    "warning": "#d97706",
    "error": "oklch(73.07% 0.207 27.33)",
    "--rounded-btn": "1.9rem",
    "--tab-radius": "0.7rem",
  },
  winter: {
    "colorScheme": "light",
    "primary": "oklch(56.86% 0.255 257.57)",
    "secondary": "#463AA2",
    "accent": "#C148AC",
    "neutral": "#021431",
    "base-100": "oklch(100% 0 0)",
    "base-200": "#F2F7FF",
    "base-300": "#E3E9F4",
    "base-content": "#394E6A",
    "info": "#93E7FB",
    "success": "#81CFD1",
    "warning": "#EFD7BB",
    "error": "#E58B8B",
  },
  wireframe: {
    "colorScheme": "light",
    "fontFamily": "Chalkboard,comic sans ms,'sans-serif'",
    "primary": "#b8b8b8",
    "secondary": "#b8b8b8",
    "accent": "#b8b8b8",
    "neutral": "#ebebeb",
    "base-100": "oklch(100% 0 0)",
    "base-200": "#eeeeee",
    "base-300": "#dddddd",
    "info": "#0000ff",
    "success": "#008000",
    "warning": "#a6a659",
    "error": "#ff0000",
    "--rounded-box": "0.2rem",
    "--rounded-btn": "0.2rem",
    "--rounded-badge": "0.2rem",
    "--tab-radius": "0.2rem",
  },
};
