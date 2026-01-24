export function getDayKey(date = new Date()) {
  // YYYY-MM-DD
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatTicketCode(type: "NORMAL" | "PRIORITY" | "PICKUP", counter: number) {
  const prefix = type === "NORMAL" ? "N" : type === "PRIORITY" ? "P" : "R";
  return `${prefix}${String(counter).padStart(3, "0")}`;
}
