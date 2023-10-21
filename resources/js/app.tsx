import './bootstrap';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { ThemeProvider } from './Components/Providers/ThemeProvider';
import ModalProvider from './Components/Providers/ModalProvider';
import { ToastContainer,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <ToastContainer transition={Flip} autoClose={2345} pauseOnHover={false} theme='dark' />
                <ModalProvider />
                <App {...props} />
            </ThemeProvider>
            
        );
    },
});

InertiaProgress.init({ color: '#960000',delay:10 });
