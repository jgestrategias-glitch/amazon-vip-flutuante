export interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  booking_date: string;
  shift: "day_use" | "pernoite";
  package_size: 4 | 8 | 12 | 25;
  suite_included: boolean;
  total_price: number;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

const BOOKINGS_KEY = "amazon_vip_bookings";

export const bookingsDB = {
  getAll: (): Booking[] => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(BOOKINGS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao recuperar reservas:", error);
      return [];
    }
  },

  getById: (id: string): Booking | null => {
    const bookings = bookingsDB.getAll();
    return bookings.find((b) => b.id === id) || null;
  },

  create: (booking: Omit<Booking, "id" | "created_at">): Booking => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    };
    const bookings = bookingsDB.getAll();
    bookings.push(newBooking);
    if (typeof window !== "undefined") {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    }
    return newBooking;
  },

  update: (id: string, updates: Partial<Booking>): Booking | null => {
    const bookings = bookingsDB.getAll();
    const index = bookings.findIndex((b) => b.id === id);
    if (index === -1) return null;

    bookings[index] = { ...bookings[index], ...updates };
    if (typeof window !== "undefined") {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    }
    return bookings[index];
  },

  delete: (id: string): boolean => {
    const bookings = bookingsDB.getAll();
    const filtered = bookings.filter((b) => b.id !== id);
    if (filtered.length === bookings.length) return false;

    if (typeof window !== "undefined") {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
    }
    return true;
  },

  getByDate: (date: string): Booking[] => {
    const bookings = bookingsDB.getAll();
    return bookings.filter((b) => b.booking_date === date);
  },

  getUnavailableDates: (): string[] => {
    const bookings = bookingsDB.getAll();
    return Array.from(new Set(bookings.map((b) => b.booking_date)));
  },
};
