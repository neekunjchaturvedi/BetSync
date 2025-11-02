import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select } from "../components/ui/select";
import { mockContacts } from "../data/mockData";

export function CreateBet() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    odds: "",
    category: "sports",
    expiresIn: "7",
    inviteeId: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New bet created:", formData);
    alert("Bet proposal created successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <Card>
        <CardHeader>
          <CardTitle>Create a New Bet Proposal</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Bet Title *
              </label>
              <Input
                placeholder="e.g., Will Bitcoin reach $100k?"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description *
              </label>
              <Textarea
                placeholder="Provide clear details about your bet proposal..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={4}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <Select
                value={formData.category}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <option value="sports">Sports</option>
                <option value="events">Events</option>
                <option value="finance">Finance</option>
                <option value="entertainment">Entertainment</option>
              </Select>
            </div>

            {/* Amount & Odds */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Bet Amount ($) *
                </label>
                <Input
                  type="number"
                  placeholder="500"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Odds *</label>
                <Input
                  type="number"
                  placeholder="1.85"
                  value={formData.odds}
                  onChange={(e) =>
                    setFormData({ ...formData, odds: e.target.value })
                  }
                  required
                  min="1"
                  step="0.05"
                />
              </div>
            </div>

            {/* Expiration */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Expires In (Days) *
              </label>
              <Select
                value={formData.expiresIn}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, expiresIn: value })
                }
              >
                <option value="1">1 day</option>
                <option value="3">3 days</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
              </Select>
            </div>

            {/* Invite Contact */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Invite Someone (Optional)
              </label>
              <Select
                value={formData.inviteeId}
                onValueChange={(value: string) =>
                  setFormData({ ...formData, inviteeId: value })
                }
              >
                <option value="">Select a contact...</option>
                {mockContacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name} ({contact.betHistory} bets)
                  </option>
                ))}
              </Select>
              <p className="text-xs text-muted-foreground mt-2">
                Leave empty to make it open for any opponent
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Create Bet Proposal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
