export type TicketType = "NORMAL" | "PRIORITY" | "PICKUP";
export type TicketStatus = "WAITING" | "CALLED" | "DONE" | "CANCELED";

export type Ticket = {
  id: string;
  dayKey: string; // "2026-01-24"
  type: TicketType;
  code: string;   // "N001", "P003", "R010"
  adults: number;
  kids: number;
  total: number;
  status: TicketStatus;
  createdAt: number; // Date.now()
};

export type DayCounters = {
  NORMAL: number;
  PRIORITY: number;
  PICKUP: number;
};
