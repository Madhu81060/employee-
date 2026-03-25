import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import ListPage from "./pages/ListPage";

// Optional Layout Wrapper
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Layout>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<FormPage />} />

          {/* Employee List */}
          <Route path="/employees" element={<ListPage />} />

          {/* Fallback (404 Page) */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-center">
                <div>
                  <h1 className="text-4xl font-bold text-red-500">404</h1>
                  <p className="text-gray-600 mt-2">Page Not Found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </Layout>

    </BrowserRouter>
  );
}

export default App;