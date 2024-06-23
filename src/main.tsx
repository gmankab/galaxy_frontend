import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { App } from './app/index.tsx';

import '@/styles/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
