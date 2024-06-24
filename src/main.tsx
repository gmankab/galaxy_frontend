import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import '@/styles/reset.css';
import { App } from './app/index.tsx';
import { RouteProvider } from './context/routeContext.tsx';


const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  
  <RouteProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </RouteProvider>

);
