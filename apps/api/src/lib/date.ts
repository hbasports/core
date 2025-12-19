import logger from "@/config/logger.js";

export function getAge(date: String) {
  const [year, month, day] = date.split("-").map(Number);
  const today = new Date();

  const hasHadBirthday = today.getMonth() + 1 > month || (today.getMonth() + 1 === month && today.getDate() >= day);

  return today.getFullYear() - year - (hasHadBirthday ? 0 : 1);
}
