import { Header } from "@/components/home/header";
import { Dashboard } from "../dashboard";

function Home() {
  return (
    <div className="flex flex-col">
      <Header
        onNavigate={(page, betId) => {
          switch (page) {
            case "dashboard":
              handleNavigate("/");
              break;
            case "create-bet":
              handleNavigate("/create-bet");
              break;
            case "contact-list":
              handleNavigate("/contacts");
              break;
            case "bet-detail":
              handleNavigate(`/bets/${betId}`);
              break;
          }
        }}
      />
      <Dashboard />
    </div>
  );
}

export default Home;
