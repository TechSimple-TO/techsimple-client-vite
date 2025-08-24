
/**
 * App.tsx
 * Main application component that sets up routing and layout.
 * 
 * Notes:
 * - Uses React Router (BrowserRouter is applied in main.tsx)
 * - Try and keep this file focused only on routing stuff.
 */

import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import SavedQuotes from './pages/SavedQuotes';

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/saved" element={<SavedQuotes />} />
      </Routes>
    </Layout>
  );
}