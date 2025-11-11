import { transliterate } from "./utils";

export function translateInstruction(step) {
  const text = step.text;
  const sign = step.sign;
  const streetName = step.street_name;

  const streetNameEN = transliterate(streetName);
  const withStreet = streetNameEN ? `onto ${streetNameEN}` : "";

  switch (sign) {
    case -7:
      return streetName ? `Keep left ${withStreet}` : `Keep left`;

    case -3:
      return streetNameEN
        ? `Make a sharp left turn ${withStreet}.`
        : `Make a sharp left turn.`;

    case -2:
      return streetNameEN ? `Turn left ${withStreet}.` : `Turn left.`;

    case -1:
      return streetNameEN ? `Bear left ${withStreet}.` : `Bear left.`;

    case 0:
      return streetNameEN ? `Continue ${withStreet}.` : `Continue straight.`;

    case 1:
      return streetNameEN ? `Bear right ${withStreet}.` : `Bear right.`;

    case 2:
      return streetNameEN ? `Turn right ${withStreet}.` : `Turn right.`;

    case 3:
      return streetNameEN
        ? `Make a sharp right turn ${withStreet}.`
        : `Make a sharp right turn.`;

    case 4:
      return `You have arrived at your destination.`;

    case 5:
      return streetNameEN
        ? `At the roundabout, take the exit ${withStreet}.`
        : `At the roundabout, take the exit.`;

    case -6:
    case 6:
      const exitCount = step.exit_number || 1;
      return streetNameEN
        ? `At the roundabout, take the ${ordinal(
            exitCount
          )} exit onto ${streetNameEN}.`
        : `At the roundabout, take the ${ordinal(exitCount)} exit.`;

    case 7:
      return streetName ? `Keep right ${withStreet}` : `Keep right`;

    default:
      return streetNameEN ? `Continue ${withStreet}.` : text;
  }
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
