export const getFromLocalStorage = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  }
  return defaultValue;
};

export const formatTitle = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getSeverityColor = (severity) => {
  if (severity === 5) return "#ff0000";
  if (severity === 4) return "#ff8c00";
  if (severity === 3) return "#ffa500";
  if (severity === 2) return "#ffd700";
  return "#ffff00";
};

export const formatPlaceName = (hit) => {
  return [hit.name, hit.housenumber, hit.city, hit.state, hit.country]
    .filter(Boolean)
    .join(", ");
};

export function getTurnIcon(sign) {
  switch (sign) {
    case -7:
      return "↖️"; // Keep Left
    case -6:
      return "🔄"; // Left Roundabout
    case -3:
      return "↩️"; // Sharp Left
    case -2:
      return "⬅️"; // Turn Left
    case 0:
      return "⬆️"; // Continue
    case 2:
      return "➡️"; // Turn Right
    case 3:
      return "↪️"; // Sharp Right
    case 4:
      return "📍"; // Arrive
    case 6:
      return "🔄"; // Roundabout
    case 7:
      return "↗️"; // Keep Right
    default:
      return "⬆️";
  }
}

export const formatDistance = (meters) => {
  if (meters < 100) {
    return `${Math.round(meters / 10) * 10} m`;
  }
  if (meters < 1000) {
    return `${Math.round(meters / 50) * 50} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
};

export function transliterate(str) {
  if (typeof str !== "string") {
    return "";
  }

  const map = {
    А: "A",
    а: "a",
    Б: "B",
    б: "b",
    В: "V",
    в: "v",
    Г: "H",
    г: "h",
    Ґ: "G",
    ґ: "g",
    Д: "D",
    д: "d",
    Е: "E",
    е: "e",
    Є: "Ye",
    є: "ye",
    Ж: "Zh",
    ж: "zh",
    З: "Z",
    з: "z",
    И: "Y",
    и: "y",
    І: "I",
    і: "i",
    Ї: "Yi",
    ї: "yi",
    Й: "Y",
    й: "y",
    К: "K",
    к: "k",
    Л: "L",
    л: "l",
    М: "M",
    м: "m",
    Н: "N",
    н: "n",
    О: "O",
    о: "o",
    П: "P",
    п: "p",
    Р: "R",
    р: "r",
    С: "S",
    с: "s",
    Т: "T",
    т: "t",
    У: "U",
    у: "u",
    Ф: "F",
    ф: "f",
    Х: "Kh",
    х: "kh",
    Ц: "Ts",
    ц: "ts",
    Ч: "Ch",
    ч: "ch",
    Ш: "Sh",
    ш: "sh",
    Щ: "Shch",
    щ: "shch",
    Ю: "Yu",
    ю: "yu",
    Я: "Ya",
    я: "ya",
    Ь: "",
    ь: "",
    "'": "",
    "’": "",
    ʼ: "",
  };

  return str
    .split("")
    .map((c) => (map.hasOwnProperty(c) ? map[c] : c))
    .join("");
}
