export interface Bet {
  id: string;
  title: string;
  description: string;
  amount: number;
  odds: string;
  status: "open" | "accepted" | "completed" | "cancelled";
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  opponent?: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: Date;
  expiresAt: Date;
  result?: "won" | "lost" | "draw";
  category: "sports" | "events" | "finance" | "entertainment";
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  email: string;
  status: "active" | "pending" | "blocked";
  betHistory: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  balance: number;
  totalBets: number;
  winRate: number;
}
