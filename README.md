# Event Management System

A React single-page app for discovering events, registering for them, and managing your registrations. Event data comes from the [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/). Built for Web Programming Assignment 2.

There is no backend: authentication and registrations are simulated in the browser with `localStorage`.

## Features

- **Authentication**: register, log in and log out with Redux Toolkit; the session survives a page refresh.
- **Event exploration**: browse live Ticketmaster events with loading, empty and error states (including invalid-key and rate-limit messages).
- **Search and filter**: keyword search (debounced) and a category filter: Music, Sports, Arts & Theatre, Film, Miscellaneous.
- **Event details**: name, date, time, venue, location, category, image, ticket price when available, and a link to buy tickets on Ticketmaster.
- **Registration**: logged-in users can register for an event and cancel; duplicate registrations are prevented and every registration belongs to the user who made it.
- **My Events**: your registered events, split into upcoming and completed, with a cancel button. Logged-out visitors are asked to log in.

## Tech stack

Versions are the ones declared in `package.json`; `package-lock.json` pins the exact versions that `npm install` uses.

| Package              | Version |
| -------------------- | ------- |
| react / react-dom    | ^19.2.8 |
| @reduxjs/toolkit     | ^2.13.0 |
| react-redux          | ^9.3.0  |
| react-router-dom     | ^7.18.4 |
| vite                 | ^8.3.0  |
| @vitejs/plugin-react | ^6.1.1  |
| oxlint               | ^1.81.0 |

Vite 8 needs Node.js **20.19+** or **22.12+**.

## Getting started

1. **Get a Ticketmaster API key.** Create an account at [developer.ticketmaster.com](https://developer.ticketmaster.com/) and copy the **Consumer Key** of your app. The free tier allows 5,000 requests per day and 2 requests per second.

2. **Clone the repository and install dependencies.**

   ```bash
   https://github.com/hafabdulla/event-management-system.git
   cd event-management-system
   npm install
   ```

3. **Create your `.env` file** from the template:

   ```bash
   cp .env.example .env
   ```

   Open `.env` and put your key in:

   ```
   VITE_TM_API_KEY=<consumer_key_here>
   ```

   `.env` is listed in `.gitignore`, so your key is never committed. Restart the dev server after changing it.

4. **Start the dev server.**

   ```bash
   npm run dev
   ```

   Open the URL it prints (usually <http://localhost:5173>).

## Scripts

| Command           | What it does                         |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run oxlint                           |

## Project structure

```
src/
  api/ticketmaster.js        fetchEvents, fetchEventsById
  components/EventCard.jsx   shared card, used by Events and MyEvents
  pages/                     Login, Register, Events, EventDetails, MyEvents
  store/                     store.js, authSlice.js, registrationsSlice.js
```

## Routes

| Path              | Page                               |
| ----------------- | ---------------------------------- |
| `/` and `/events` | Events list with search and filter |
| `/events/:id`     | Event details, register / cancel   |
| `/my-events`      | My Events (upcoming and completed) |
| `/login`          | Login                              |
| `/register`       | Register                           |

## State and storage

Redux Toolkit holds the shared state: `auth` (current user, errors) and `registrations` (all registrations). Both slices write to `localStorage` so data survives a refresh.

| Key                 | Contents                                                   |
| ------------------- | ---------------------------------------------------------- |
| `ems_users`         | Registered accounts                                        |
| `ems_session`       | The logged-in user                                         |
| `ems_registrations` | Event registrations, each tagged with the user who made it |

To reset the app, clear these keys in your browser's dev tools (Application -> Local Storage).

## Notes

- Authentication is a frontend simulation. Passwords are kept in `localStorage` and this is **not** secure; do not use real credentials.
- Search input is debounced by 500 ms so typing does not burn through the API's 2 requests per second limit.
