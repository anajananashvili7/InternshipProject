This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Description
Movie Explorer is a React-based web application that allows users to explore and manage movies. The application features movie discovery, genre filtering, search functionality, and favorites management. Users can authenticate using The Movie Database (TMDb) API and save their favorite movies for quick access.

/Features/
User Authentication: Log in using TMDb credentials.
Movie Discovery: Browse popular movies with sorting and filtering options.
Search Functionality: Search for movies by title.
Genre Filtering: Filter movies by genre.
Favorites Management: Add or remove movies from favorites.
Pagination: Navigate through pages of movie results.
Responsive Design: Optimized for both desktop and mobile views.

/Technologies/
React - Frontend library for building user interfaces.
React Router - For handling routing in the application.
TMDb API - For fetching movie data and authentication.
CSS Modules - For scoped styling.

/Usage/
Authenticate: Log in using your TMDb credentials.
Browse Movies: View popular movies and filter by genres.
Search Movies: Use the search bar to find specific movies.
Manage Favorites: Click on the heart icon to add/remove movies from your favorites.
Pagination: Navigate through pages of movie results using the pagination controls.

/Components/
App: Main component that handles routing, authentication, and movie fetching.
TMDBAuth: Component for handling user login.
Movie: Component for displaying individual movie details.
Favorites: Component for displaying user's favorite movies.
BurgerMenu: Component for genre selection on mobile devices.

/Configuration/
API_KEY: Your TMDb API key (stored in config.js).
BASE_URL: Base URL for TMDb API requests.
searchURL: URL for movie search endpoint.
genres: List of genres for filtering movies.

/Acknowledgments/
TMDb: For providing the movie database API.
React: For being an excellent library for building UIs.




This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
