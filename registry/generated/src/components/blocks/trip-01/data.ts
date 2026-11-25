export type ActivityKind =
  | "food"
  | "sight"
  | "stay"
  | "transport"
  | "nature"
  | "shop";

export interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  duration: string;
  kind: ActivityKind;
  note?: string;
  booking?: string;
}

export interface TripDay {
  id: string;
  label: string;
  date: string;
  weekday: string;
  city: string;
  summary: string;
  high: number;
  low: number;
  weather: "sun" | "cloud-sun" | "cloud" | "rain";
  activities: Activity[];
}

export const trip = {
  name: "Lisbon & Sintra",
  region: "Portugal",
  dates: "Oct 12 – 16, 2026",
  nights: 4,
  summary:
    "Five slow days between tiled lanes, palace gardens, and the Atlantic coast.",
  route: ["Lisbon", "Sintra", "Cascais"],
  budget: 2_400,
  spent: 1_680,
  pace: "Balanced",
  travelers: ["Ana Souza", "Maya Chen"],
};

export const days: TripDay[] = [
  {
    id: "day-1",
    label: "Day 1",
    date: "Oct 12",
    weekday: "Monday",
    city: "Lisbon",
    summary: "Arrival, a slow walk through Alfama, and dinner near the river.",
    high: 24,
    low: 16,
    weather: "sun",
    activities: [
      {
        id: "d1-1",
        time: "14:20",
        title: "Land at Humberto Delgado",
        location: "Lisbon Airport · Terminal 1",
        duration: "45 min",
        kind: "transport",
        note: "Metro red line to Alameda, then a short taxi to the apartment.",
      },
      {
        id: "d1-2",
        time: "15:30",
        title: "Check in at Casa do Vale",
        location: "Rua dos Remédios 84, Alfama",
        duration: "30 min",
        kind: "stay",
        booking: "Reservation · 2 guests · 4 nights",
        note: "Ask for the courtyard room. The keypad code arrives by message.",
      },
      {
        id: "d1-3",
        time: "17:00",
        title: "Golden hour in Alfama",
        location: "Miradouro de Santa Luzia",
        duration: "90 min",
        kind: "sight",
        note: "Walk down to the river through the narrow lanes. Wear flat shoes.",
      },
      {
        id: "d1-4",
        time: "19:30",
        title: "Dinner at Taberna da Rua das Flores",
        location: "Rua das Flores 103",
        duration: "90 min",
        kind: "food",
        booking: "Table for 2 · 19:30",
        note: "Order the clams and the pork with clams. Cash is easier here.",
      },
    ],
  },
  {
    id: "day-2",
    label: "Day 2",
    date: "Oct 13",
    weekday: "Tuesday",
    city: "Lisbon",
    summary: "Belém in the morning, then the river and LX Factory at sunset.",
    high: 23,
    low: 15,
    weather: "cloud-sun",
    activities: [
      {
        id: "d2-1",
        time: "09:00",
        title: "Pastéis de Belém",
        location: "Rua de Belém 84",
        duration: "45 min",
        kind: "food",
        note: "Go before 9:30. The sit-down room in the back is calmer.",
      },
      {
        id: "d2-2",
        time: "10:15",
        title: "Jerónimos Monastery",
        location: "Praça do Império",
        duration: "75 min",
        kind: "sight",
        booking: "Timed entry · 10:15",
        note: "The cloister is the best part. Audio guide is worth it.",
      },
      {
        id: "d2-3",
        time: "13:00",
        title: "Lunch at Prado",
        location: "Travessa das Pedras Negras 2",
        duration: "75 min",
        kind: "food",
        booking: "Table for 2 · 13:00",
      },
      {
        id: "d2-4",
        time: "15:30",
        title: "MAAT and the riverside",
        location: "Belém waterfront",
        duration: "90 min",
        kind: "nature",
        note: "The roof walk has the best view of the 25 de Abril bridge.",
      },
      {
        id: "d2-5",
        time: "18:30",
        title: "Sunset at LX Factory",
        location: "Rua Rodrigues de Faria 103",
        duration: "120 min",
        kind: "shop",
        note: "Browse Ler Devagar, then find a table at Rio Maravilha.",
      },
    ],
  },
  {
    id: "day-3",
    label: "Day 3",
    date: "Oct 14",
    weekday: "Wednesday",
    city: "Sintra",
    summary: "Two palaces, one hill, and the quietest garden in Portugal.",
    high: 20,
    low: 13,
    weather: "cloud",
    activities: [
      {
        id: "d3-1",
        time: "08:10",
        title: "Train to Sintra",
        location: "Rossio Station · Platform 3",
        duration: "50 min",
        kind: "transport",
        note: "Buy the rechargeable Viva Viagem card. Trains leave every 20 min.",
      },
      {
        id: "d3-2",
        time: "09:30",
        title: "Quinta da Regaleira",
        location: "Rua Barbosa du Bocage 5",
        duration: "120 min",
        kind: "sight",
        booking: "Entry · 09:30",
        note: "Go down the initiation well first, before the tour groups arrive.",
      },
      {
        id: "d3-3",
        time: "12:30",
        title: "Lunch at Incomum",
        location: "Rua Dr. Alfredo Costa 22",
        duration: "60 min",
        kind: "food",
        booking: "Table for 2 · 12:30",
      },
      {
        id: "d3-4",
        time: "14:30",
        title: "Pena Palace",
        location: "Estrada da Pena",
        duration: "120 min",
        kind: "sight",
        booking: "Entry · 14:30",
        note: "Take the 434 bus up. The walk is steeper than it looks.",
      },
      {
        id: "d3-5",
        time: "18:00",
        title: "Return to Lisbon",
        location: "Sintra Station",
        duration: "60 min",
        kind: "transport",
      },
    ],
  },
  {
    id: "day-4",
    label: "Day 4",
    date: "Oct 15",
    weekday: "Thursday",
    city: "Cascais",
    summary: "A coastal train, a small beach, and seafood by the water.",
    high: 22,
    low: 14,
    weather: "sun",
    activities: [
      {
        id: "d4-1",
        time: "09:40",
        title: "Train to Cascais",
        location: "Cais do Sodré Station",
        duration: "40 min",
        kind: "transport",
        note: "Sit on the left for the river views. The line ends at Cascais.",
      },
      {
        id: "d4-2",
        time: "10:30",
        title: "Praia da Rainha",
        location: "Cascais old town",
        duration: "120 min",
        kind: "nature",
        note: "Small, sheltered, and close to the town. Bring a towel.",
      },
      {
        id: "d4-3",
        time: "13:00",
        title: "Lunch at Mar do Inferno",
        location: "Av. Rei Humberto II de Itália",
        duration: "90 min",
        kind: "food",
        booking: "Table for 2 · 13:00",
        note: "The seafood rice is for two. Order it when you sit down.",
      },
      {
        id: "d4-4",
        time: "15:30",
        title: "Boca do Inferno",
        location: "Cascais coast",
        duration: "60 min",
        kind: "nature",
        note: "The cliff path is windy. Stay behind the rope line.",
      },
      {
        id: "d4-5",
        time: "18:00",
        title: "Marina sunset walk",
        location: "Cascais Marina",
        duration: "90 min",
        kind: "sight",
      },
    ],
  },
  {
    id: "day-5",
    label: "Day 5",
    date: "Oct 16",
    weekday: "Friday",
    city: "Lisbon",
    summary:
      "Market breakfast, azulejos, and a farewell dinner in Príncipe Real.",
    high: 21,
    low: 14,
    weather: "cloud-sun",
    activities: [
      {
        id: "d5-1",
        time: "09:30",
        title: "Breakfast at Time Out Market",
        location: "Av. 24 de Julho 49",
        duration: "90 min",
        kind: "food",
        note: "Start with the pastel de nata from Manteigaria.",
      },
      {
        id: "d5-2",
        time: "11:30",
        title: "National Tile Museum",
        location: "Rua da Madre de Deus 4",
        duration: "90 min",
        kind: "sight",
        booking: "Entry · 11:30",
        note: "The 36-meter tile panorama is on the top floor.",
      },
      {
        id: "d5-3",
        time: "14:00",
        title: "Lunch at O Velho Eurico",
        location: "Largo de São Cristóvão 5",
        duration: "60 min",
        kind: "food",
        note: "Small menu, big flavors. Arrive early or expect a wait.",
      },
      {
        id: "d5-4",
        time: "16:00",
        title: "Shops in Príncipe Real",
        location: "Rua da Escola Politécnica",
        duration: "90 min",
        kind: "shop",
        note: "Look for hand-painted tiles and the weekend craft market.",
      },
      {
        id: "d5-5",
        time: "20:00",
        title: "Farewell dinner at Prado",
        location: "Travessa das Pedras Negras 2",
        duration: "120 min",
        kind: "food",
        booking: "Table for 2 · 20:00",
        note: "Ask for the tasting menu and the orange wine.",
      },
    ],
  },
];

export const packing = [
  { id: "shoes", label: "Walking shoes", done: true },
  { id: "layer", label: "Light rain layer", done: true },
  { id: "adapter", label: "EU power adapter", done: false },
  { id: "swim", label: "Swimwear", done: false },
  { id: "book", label: "Paper guidebook", done: false },
  { id: "bottle", label: "Reusable bottle", done: true },
];

export const reservations = [
  {
    id: "r1",
    title: "Casa do Vale",
    detail: "Alfama · 4 nights",
    date: "Oct 12",
    time: "15:30",
    code: "CV-8842",
  },
  {
    id: "r2",
    title: "Quinta da Regaleira",
    detail: "Sintra · 2 adults",
    date: "Oct 14",
    time: "09:30",
    code: "QR-1930",
  },
  {
    id: "r3",
    title: "Prado",
    detail: "Farewell dinner · 2 guests",
    date: "Oct 16",
    time: "20:00",
    code: "PR-2048",
  },
];

export const tips = [
  "Tram 28 is busiest from 10:00 to 16:00. Ride it early or walk instead.",
  "Most museums close on Mondays. Keep the tile museum for a weekday.",
  "Carry a little cash for the small markets and the old trams.",
];

export const initialNotes = [
  {
    id: "n1",
    dayId: "day-1",
    text: "Buy the Viva Viagem card at the airport. We can top it up for the trains.",
    author: "Ana",
    time: "2 days ago",
  },
  {
    id: "n2",
    dayId: "day-3",
    text: "Book the Pena Palace bus in advance. The 434 line fills up by 10.",
    author: "Maya",
    time: "Yesterday",
  },
];

export const kindTone: Record<ActivityKind, string> = {
  food: "var(--chart-3)",
  sight: "var(--chart-2)",
  stay: "var(--chart-4)",
  transport: "var(--chart-5)",
  nature: "var(--chart-1)",
  shop: "var(--chart-6)",
};

export function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
