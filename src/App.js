import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { PostsProvider } from "./app/src/contexts/PostsContext";
import { UiProvider } from "./app/src/contexts/UiContext";
import Layout from "./app/src/layout/Layout";
import PrimaryRouter from "./app/src/router/PrimaryRouer";

function App() {
  return (
    <PostsProvider>
      <UiProvider>
        <BrowserRouter>
          <Layout>
            <PrimaryRouter />
          </Layout>
        </BrowserRouter>
      </UiProvider>
    </PostsProvider>
  );
}

export default App;
