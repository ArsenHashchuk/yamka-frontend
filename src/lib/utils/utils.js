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

export const getSeverityLabel = (severity) => {
  if (severity >= 5) return "Critical Damage";
  if (severity === 4) return "Severe Pothole";
  if (severity === 3) return "Major Bump";
  if (severity === 2) return "Moderate Bump";
  return "Minor unevenness";
};

export const formatDate = (dateString) => {
  if (!dateString) return "Unknown date";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getSeverityColor = (severity) => {
  if (severity === 5) return "#ff0000";
  if (severity === 4) return "#ff8c00ff";
  if (severity === 3) return "#c88a04ff";
  if (severity === 2) return "#ffa500";
  return "#ffd700";
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

export function formatTripDuration(milliseconds) {
  if (!milliseconds) return "0 min";

  const totalMinutes = Math.round(milliseconds / 60000);

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");

  return `${hours}:${paddedMinutes} h`;
}

export function formatTripDistance(distanceInMeters, units) {
  if (!distanceInMeters) return units === "metric" ? "0 km" : "0 miles";

  if (units === "metric") {
    const km = (distanceInMeters / 1000).toFixed(1);
    return `${km} km`;
  } else {
    const miles = (distanceInMeters / 1609.34).toFixed(1);
    return `${miles} miles`;
  }
}

export function calculateETA(minutesRemaining) {
  const now = new Date();
  const arrivalTime = new Date(now.getTime() + minutesRemaining * 60000);

  const hours = arrivalTime.getHours();
  const minutes = arrivalTime.getMinutes();

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
