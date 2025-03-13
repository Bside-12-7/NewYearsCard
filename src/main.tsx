import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import "galmuri/dist/galmuri.css";
import Home from "./routes/Home";
import LetterBox from "./routes/LetterBox";
import { Auth } from "./routes/Auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/:identity" component={LetterBox} />
        <Route exact path="/" component={Auth} />
      </Switch>
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);
