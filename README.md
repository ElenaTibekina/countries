# Countries App

This is a React project built with [Next.js](https://nextjs.org/) and Apollo Client for fetching GraphQL data. It provides an interactive map displaying information about different countries.

## Getting Started
```bash
npm install
# or
yarn add
```

then you need to create a new file in the root of the project, name it .env.local and paste the content from the zip.

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

Now you can see the app, it consists of Select element where you can choose a country and the info about the country will be shown on the map. Also, you can click on a pin and the country in the select will be changed as well.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Features
- Displays information about countries on an interactive map.
- Uses Apollo Client for GraphQL data fetching.
- Integrated error handling with toast notifications.
- Has a pretty loading page.
- You can test the mobile view of the app: for this, open the browser on your phone and in search bar put your IP address and port, like this "IP-address:3000".
- For styles we use andt library and css modules.

## Project Structure
- app/: Contains React components
- lib/: Includes server schema, such as the GraphQL query for fetching countries, and apollo-wrapper as a centralized place to configure and initialize the Apollo Client for GraphQL and handling errors.
- countries.json: JSON file containing additional information about countries (locations).
- public/assets: Stores the static images.

## Key Components
- HomePage (app/page.tsx)
   Displays the main content, including the map component.
   Uses useQuery from Apollo Client to fetch countries data.
   Utilizes react-toastify for displaying error notifications.
- MapComponent (app/components/MapComponent.tsx)
   Renders an interactive map with country markers.
   Utilizes the @vis.gl/react-google-maps library.
   Displays information in an InfoWindow when a marker is clicked.
   Uses Apollo Client data and local JSON data for country details.
- Map Schema (lib/server/schemas/countries/getCountries.schema.ts)
   Defines the GraphQL query for fetching countries data. 
- Apollo Wrapper (lib/client/apolloWrapper.tsx)
   Configures the Apollo Client with error handling.