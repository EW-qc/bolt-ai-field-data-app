import { handleAuth } from '@auth0/nextjs-auth0';

// Add a log to check if the Auth0 handler is initialized
console.log("Initializing Auth0 route handler");

export const GET = handleAuth();


// example@perforoc.ca  Perforoc-2024