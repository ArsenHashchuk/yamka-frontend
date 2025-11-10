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

export const generateRandomKeySlug = () => {
  return Math.random() * 100;
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
