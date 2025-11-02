import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, TrendingUp, Calendar, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { mockBets } from "../data/mockData";

export function BetDetail() {
  const navigate = useNavigate();
  const { betId } = useParams<{ betId: string }>();
  const bet = mockBets.find((b) => b.id === betId);
  const [acceptLoading, setAcceptLoading] = useState(false);

  if (!bet) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <Card className="text-center py-12">
          <p>Bet not found</p>
        </Card>
      </div>
    );
  }

  const handleAccept = () => {
    setAcceptLoading(true);
    setTimeout(() => {
      alert("You accepted this bet!");
      navigate("/");
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <div className="space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{bet.title}</h1>
                <Badge variant="secondary">{bet.category}</Badge>
              </div>
              <Badge
                variant={
                  bet.status === "open"
                    ? "secondary"
                    : bet.status === "accepted"
                    ? "outline"
                    : bet.status === "completed"
                    ? "default"
                    : "destructive"
                }
              >
                {bet.status}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">{bet.description}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bet Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bet Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span>Amount</span>
                </div>
                <p className="font-semibold text-lg">${bet.amount}</p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>Odds</span>
                </div>
                <p className="font-semibold text-lg">{bet.odds}</p>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Expires</span>
                </div>
                <p className="font-semibold">
                  {new Date(bet.expiresAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Potential Winnings
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${Math.round(bet.amount * (Number.parseFloat(bet.odds) - 1))}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Participants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="pb-4 border-b border-border">
                <p className="text-xs text-muted-foreground mb-2">Proposer</p>
                <div className="flex items-center gap-3">
                  <img
                    src={bet.creator.avatar || "/placeholder.svg"}
                    alt={bet.creator.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-semibold">{bet.creator.name}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  {bet.opponent ? "Opponent" : "Looking for Opponent"}
                </p>
                {bet.opponent ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={bet.opponent.avatar || "/placeholder.svg"}
                      alt={bet.opponent.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="font-semibold">{bet.opponent.name}</p>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Be the first to accept this bet!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        {bet.status === "open" && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => navigate("/")}
            >
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              disabled={acceptLoading}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {acceptLoading ? "Accepting..." : "Accept Bet"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
