import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

if (typeof global.structuredClone === 'undefined') {
    global.structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
}

export default defineConfig({
    plugins: [react()],
});
