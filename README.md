# Artwork Explorer

This project is a web application built with [Next.js](https://nextjs.org) that allows users to explore artwork from the Metropolitan Museum of Art's collection. It includes features such as user authentication, artwork search, and the ability to manage favorites and search history.

https://github.com/user-attachments/assets/1db3e0ae-637f-442c-a440-aa92a10550f9

## Features

### Authentication

- **Login and Registration**: Users can create an account and log in to access personalized features.
- **JWT-based Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **Route Guarding**: Protects private routes and redirects unauthorized users to the login page.

### Artwork Search

- **Advanced Search**: Search for artwork using various filters such as medium, highlights, and on-view status.
- **Pagination**: Browse search results with pagination for better navigation.

### Favorites and History

- **Favorites Management**: Add or remove artworks from a personalized favorites list.
- **Search History**: Keep track of previous searches for quick access.

### Artwork Details

- **Detailed View**: View detailed information about individual artworks, including images, artist information, and dimensions.

## Pages

### Public Pages

- **Home**: Introduction to the application and its features.
- **Login**: User login page.
- **Register**: User registration page.

### Private Pages

- **Search**: Advanced search functionality for exploring artwork.
- **Favorites**: View and manage a list of favorite artworks.
- **History**: View and manage search history.

## Technologies Used

- **Frontend**: React, Next.js, React Bootstrap
- **State Management**: Jotai
- **API Integration**: Fetch API for communication with the backend
- **Authentication**: JWT-based authentication
- **Styling**: Bootstrap and custom CSS

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kolossi101/artwork-explorer-app
   cd artwork-explorer-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_API_URL=<your-api-url>/api/user
   ```

   Please refer to [artwork-explorer-user-api](https://github.com/kolossi101/artwork-explorer-user-api) for an example of building User API.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

- **`NEXT_PUBLIC_API_URL`**: The base URL of the API used for authentication, registration, and user data.

## Project Structure

- **`/components`**: Reusable React components such as `MainNav`, `ArtworkCard`, and `RouteGuard`.
- **`/lib`**: Utility functions for authentication and user data management.
- **`/pages`**: Next.js pages for routing.
- **`/store`**: Jotai atoms for state management.
- **`/public`**: Static assets and data files.

## Key Files

- **`lib/authenticate.js`**: Handles user authentication and token management.
- **`lib/userData.js`**: Manages user-specific data like favorites and search history.
- **`components/RouteGuard.js`**: Protects private routes.
- **`pages/login.js`**: Login page.
- **`pages/register.js`**: Registration page.
- **`pages/search.js`**: Advanced search page.
- **`pages/favourites.js`**: Favorites management page.
- **`pages/history.js`**: Search history page.

## Deployment

This project can be deployed on [Vercel](https://vercel.com) for production. Follow the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

## Acknowledgments

- Data sourced from the [Metropolitan Museum of Art Collection API](https://metmuseum.github.io/).
- Built as part of the BTI425 course assignment.

---

**Author**: Nadiia Geras  
**Date**: April 13, 2025  
**Link**: [Live Application](https://bti425-project06-my-app.vercel.app/)
