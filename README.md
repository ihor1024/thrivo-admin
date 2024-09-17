# Thrivo Admin Panel

Tools to help manage Thrivo's backend (originally just for the OMNI). Once the server is running, consider looking at these routes:
- management/color
    - Color line inputting panel, has a place to upload json, and enable the colorline
    - When uploading, it will attempt to identify preexisting products and overwrite any details different
    - View colors, lines, and brands - batch change ingredients for a color line
- management/user
    - Assign users to salons
    - See what users are on what version of the app
- management/salon
    - Create/manage salons in the backend
    - Enabled/disable shipping, thrivette (deprecated)
    - Add addresses/etc
- data
    - See OMNI specific "data" - very archaic
    - See who uses OMNI's based on serial numbers

# From Sveltekit...
## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Considerations
- Make sure you login as a user in the "AdminAdmin" group on our AWS backend
- This is the wild west of our backend - especially the colors backend, so tread carefully
- This project was originally developed to allow Brendon to script custom code with the AWS Amplify libraries - ie put a button to very custom js code - as well as learn Sveltekit framework
- If you need an "AdminAdmin" login - use "Brendon@thrivotech.com" password: "12345678" (Change the password at some point)
- Open the browsers 'console' to see feedback from the code (crucial because of this projects experimental state)

