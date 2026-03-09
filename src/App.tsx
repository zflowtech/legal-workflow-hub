import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Documents from "./pages/Documents.tsx";
import DocumentView from "./pages/DocumentView.tsx";
import Templates from "./pages/Templates.tsx";
import Team from "./pages/Team.tsx";
import Timeline from "./pages/Timeline.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/linha-do-tempo" element={<Timeline />} />
          <Route path="/documentos" element={<Documents />} />
          <Route path="/documentos/:id" element={<DocumentView />} />
          <Route path="/modelos" element={<Templates />} />
          <Route path="/equipe" element={<Team />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
