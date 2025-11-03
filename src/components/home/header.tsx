import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, Plus, Users, Wallet } from "lucide-react";
import { useTheme } from "../../contexts/theme-context";
import { Button } from "../ui/button";

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 bg-gray-700 from-primary to-accent rounded-lg flex items-center justify-center">
            <span
              className="text-white
             font-bold text-lg"
            >
              Σ
            </span>
          </div>
          <h1 className="text-xl font-bold sm:inline">BetSync</h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link to="/contacts">
            <Button variant="ghost" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Contacts
            </Button>
          </Link>
          <Link to="/create-bet">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              New Bet
            </Button>
          </Link>
          <Link to="/create-bet">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
        </nav>

        {/* Mobile Menu Buttons */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass border-b">
          <nav className="max-w-7xl mx-auto px-4 py-2 flex flex-col gap-1 bg-white">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="justify-start w-full">
                Dashboard
              </Button>
            </Link>
            <Link to="/contacts" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="justify-start w-full">
                <Users className="w-4 h-4 mr-2" />
                Contacts
              </Button>
            </Link>
            <Link to="/create-bet" onClick={() => setIsMenuOpen(false)}>
              <Button className="justify-start bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Bet
              </Button>
            </Link>
            <Link to="/create-bet">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
