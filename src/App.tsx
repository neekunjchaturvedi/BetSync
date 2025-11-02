import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import { Dashboard } from "./pages/dashboard";
import { Header } from "./components/home/header";
import { CreateBet } from "./pages/createBet";
import { ContactList } from "./pages/contactList";
import { BetDetail } from "./pages/betDetail";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground transition-colors">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create-bet" element={<CreateBet />} />
              <Route path="/contacts" element={<ContactList />} />
              <Route path="/bets/:betId" element={<BetDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}
