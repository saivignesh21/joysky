import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import VideoChat from "./pages/VideoChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video-chat" element={<VideoChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;