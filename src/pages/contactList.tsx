import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, UserPlus, Check } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { mockContacts } from "../data/mockData";

export function ContactList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [contacts, setContacts] = useState(mockContacts);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContact = (contactId: string) => {
    console.log("Invite contact:", contactId);
    alert("Invitation sent!");
  };

  const handleApproveRequest = (contactId: string) => {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contactId ? { ...c, status: "active" as const } : c
      )
    );
  };

  const activeContacts = filteredContacts.filter((c) => c.status === "active");
  const pendingRequests = filteredContacts.filter(
    (c) => c.status === "pending"
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Manage Contacts</h1>
        <Input
          type="search"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pending Requests</h2>
          <div className="space-y-3">
            {pendingRequests.map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleApproveRequest(contact.id)}
                    className="gap-2 bg-primary hover:bg-primary/90"
                    size="sm"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Active Contacts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Your Contacts ({activeContacts.length})
        </h2>
        <div className="grid gap-4">
          {activeContacts.length > 0 ? (
            activeContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={contact.avatar || "/placeholder.svg"}
                        alt={contact.name}
                        className="w-14 h-14 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {contact.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {contact.email}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {contact.betHistory} bets
                          </Badge>
                          <Badge variant="default" className="text-xs">
                            Active
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={() => handleAddContact(contact.id)}
                      >
                        <UserPlus className="w-4 h-4" />
                        Invite to Bet
                      </Button>
                      <Button variant="ghost" size="icon" title="Send message">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Send email">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No contacts found matching your search"
                  : "No active contacts yet"}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
