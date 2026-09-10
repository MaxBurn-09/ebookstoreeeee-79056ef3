export type PaymentMethod = "card" | "upi" | "wallet";

export type ShippingAddress = {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  id: string;
  title: string;
  slug: string;
  cover: string;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  createdAt: string;
  status: "paid" | "pending" | "failed";
  paymentMethod: PaymentMethod;
  paymentLabel: string;
  gateway: "stripe" | "academy-pay";
  stripeSessionId?: string;
  emailSent: boolean;
  address: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  total: number;
  receiptHtml: string;
};

const ORDERS_KEY = "fga_orders_v1";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const next = [order, ...loadOrders().filter((o) => o.id !== order.id)];
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(next));
}

export function getOrder(id: string) {
  return loadOrders().find((o) => o.id === id);
}

export function paymentLabel(method: PaymentMethod) {
  if (method === "upi") return "UPI";
  if (method === "wallet") return "Digital wallet";
  return "Card";
}
