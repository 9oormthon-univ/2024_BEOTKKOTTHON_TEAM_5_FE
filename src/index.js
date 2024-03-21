import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RecoilRoot } from "recoil";
import { HelmetProvider } from "react-helmet-async";
import { hydrateRoot, createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
const isPreRendered = document.body.hasAttribute('data-prerendered');

if (rootElement) {
  if (isPreRendered) {
      hydrateRoot(rootElement, 
          <React.StrictMode>
              <HelmetProvider>
                  <RecoilRoot>
                      <App />
                  </RecoilRoot>
              </HelmetProvider>
          </React.StrictMode>
      );
  } else {
      const root = createRoot(rootElement);
      root.render(
          <React.StrictMode>
              <HelmetProvider>
                  <RecoilRoot>
                      <App />
                  </RecoilRoot>
              </HelmetProvider>
          </React.StrictMode>
      );
  }
}

// Performance monitoring
reportWebVitals();
