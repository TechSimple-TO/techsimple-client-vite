
/**
 * App.tsx
 * Main application component that sets up routing and layout.
 * 
 * Notes:
 * - Uses React Router (BrowserRouter is applied in main.tsx)
 * - Try and keep this file focused only on routing stuff.
 */

import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './Layout';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

/**
*App
* Renders the global layout and defines the primary routes.
* 
* Future Ideas:
* - Add a 404 Not Found page
* - Implement lazy loading for routes to improve performance
* - if you add authentication, wrap the routes in a PrivateRoute component
*/

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="container" style={{ padding: '2rem 0' }}>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
