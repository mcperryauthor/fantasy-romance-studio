import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ProjectProvider } from './context/ProjectContext';

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
    <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route path="/workspace" element={<ReviewWorkspace />} />
          <Route path="/workspace/:id" element={<ReviewWorkspace />} />
          
          {/* Protected/App Routes wrapped in Layout */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-review" element={<NewReview />} />
            <Route path="/style-profile" element={<StyleProfile />} />
            <Route path="/report/:id" element={<ReportView />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
          </Route>
        </Routes>
      </Router>
    </ProjectProvider>
  );
}

export default App;
