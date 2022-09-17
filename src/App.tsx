import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PageOne from "./components/PageOne";
import PageTwo from "./components/PageTwo";

function App() {
  const queryClient = new QueryClient();

  const [showNav, setShowNav] = useState(false);

  const [clicked, setClicked] = useState(false);

  return (
    <div className="App">
      <Header showNav={showNav} setShowNav={setShowNav} />
      <PageOne showNav={showNav} setClicked={setClicked} />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <PageTwo clicked={clicked} setClicked={setClicked} />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}

export default App;
