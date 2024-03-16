import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({mode}) => {
    //THIS IS HOW YOU LOAD IN ENVIRONMENT VARIABLES OUTSIDE THE CLIENT (import.meta.env does NOT work here)
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd()));


    // Load environment variables
    const username = process.env.VITE_API_USER;
    const password = process.env.VITE_API_PW;


    // Ensure that username and password are defined before encoding
    if (!username || !password) {
        console.error('Username or password environment variables are not set.');
        process.exit(1);
    }

    const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

    return defineConfig({

        plugins: [react()],
        server: {
            proxy: {
                // Proxying API requests to the backend server
                // Example: All requests to '/api' will be proxied to 'http://localhost:8080'
                '/api': {
                    target: 'http://localhost:9000', // Backend server URL
                    changeOrigin: true, // Needed for virtual hosted sites
                    secure: false, // If you're using https, you might need to set this to false
                    // Path rewrite is optional. Use it if you want to remove the base path.
                    // For example, rewrite '/api/test' to '/test' before the request is sent.
                    rewrite: (path) => path.replace(/^\/api/, '/api/v1/'),
                    headers: {
                        'RC-R-API': `${encodedCredentials}`,
                    },
                },
                // You can add more proxy rules here
            },
        },
    })
}