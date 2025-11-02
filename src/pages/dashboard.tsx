"use client";
import { TrendingUp, Trophy, DollarSign, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { mockBets, currentUser } from "../data/mockData";

export function Dashboard() {
  const navigate = useNavigate();

  const activeBets = mockBets.filter(
    (b) => b.status === "open" || b.status === "accepted"
  );
  const completedBets = mockBets.filter((b) => b.status === "completed");

  const stats = [
    {
      label: "Total Balance",
      value: `$${currentUser.balance.toLocaleString()}`,
      icon: DollarSign,
      color: "from-primary to-accent",
    },
    {
      label: "Active Bets",
      value: activeBets.length,
      icon: Activity,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Win Rate",
      value: `${(currentUser.winRate * 100).toFixed(0)}%`,
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Total Bets",
      value: currentUser.totalBets,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div
                    className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Bets */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Active Bets</h2>
            <Button
              onClick={() => navigate("/create-bet")}
              className="bg-primary hover:bg-primary/90"
            >
              + Create Bet
            </Button>
          </div>

          <div className="space-y-4">
            {activeBets.length > 0 ? (
              activeBets.map((bet) => (
                <Card
                  key={bet.id}
                  className="hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => navigate(`/bets/${bet.id}`)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{bet.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {bet.description}
                        </p>
                      </div>
                      <Badge
                        variant={
                          bet.status === "open" ? "destructive" : "default"
                        }
                      >
                        {bet.status === "open"
                          ? "Looking for Opponent"
                          : "Accepted"}
                      </Badge>
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-border">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Bet Amount
                          </p>
                          <p className="text-lg font-semibold">${bet.amount}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Odds</p>
                          <p className="text-lg font-semibold">{bet.odds}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Expires
                          </p>
                          <p className="text-sm">
                            {new Date(bet.expiresAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {bet.opponent && (
                        <div className="flex items-center gap-2">
                          <img
                            src={bet.opponent.avatar || "/placeholder.svg"}
                            alt={bet.opponent.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium">
                            vs {bet.opponent.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="text-center py-12">
                <p className="text-muted-foreground">
                  No active bets. Create one to get started!
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedBets.length > 0 ? (
                completedBets.map((bet) => (
                  <div
                    key={bet.id}
                    className="flex items-center justify-between pb-3 border-b border-border last:border-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">
                        {bet.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${bet.amount}
                      </p>
                    </div>
                    <Badge
                      variant={bet.result === "won" ? "default" : "destructive"}
                    >
                      {bet.result === "won" ? "+" : "-"}$
                      {Math.round(
                        bet.amount * (Number.parseFloat(bet.odds) - 1)
                      )}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No completed bets yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => navigate("/create-bet")}
              >
                Create New Bet
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => navigate("/contacts")}
              >
                Manage Contacts
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
