import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import NewReview from './pages/NewReview';
import ReviewWorkspace from './pages/ReviewWorkspace';
import StyleProfile from './pages/StyleProfile';
import ReportView from './pages/ReportView';
import Settings from './pages/Settings';
import About from './pages/About';
import Pricing from './pages/Pricing';

// Layout
import MainLayout from './components/layout/MainLayout';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Landing />} />
        
        {/* Protected/App Routes wrapped in Layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-review" element={<NewReview />} />
          <Route path="/workspace/:id" element={<ReviewWorkspace />} />
          <Route path="/style-profile" element={<StyleProfile />} />
          <Route path="/report/:id" element={<ReportView />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
