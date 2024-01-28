<a align="center" href="https://saasi.vercel.app/demo">
  <h1 align="center">SAASi </h1>
</a>

<p align="center">
 Make your pricing pages more SAASi
</p>

## Motivation

In the competitive SAAS sector, determining the optimal pricing strategy is crucial yet challenging, often leading to high development and marketing costs.

Saasi addresses this challenge by facilitating the easy creation and management of adaptable pricing pages. This tool allows you to conduct real-time pricing experiments, efficiently pinpointing the most effective pricing strategy for your SAAS startup.

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a> ·
  <a href="#tech-stack"><strong>Tech stack</strong></a> 
</p>
<br/>

## Features

This is a work in progress and is not yet ready for production use.

- Pricing configuration:
  - Add supabase backend 🟢
  - Add DB schema and migration 🟢
  - Add authentication 🟢
  - Add server actions 🟢
  - Choose a pricing theme 🟢
  - Set branding colors and logo
  - Attach terms summary
  - Manage tiers & features 🟢
  - Create and manage pricing
- Stripe integration (coming soon):
  - Connect your stripe account

## Demo

You can view a fully working demo at [https://saasi.vercel.app/demo](https://saasi.vercel.app/demo).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   git clone https://github.com/saasitech/saasi.git name-of-new-app
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Saasi GitHub](https://github.com/saasitech/saasi/issues/new).

## Tech stack

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Daisy UI](https://daisyui.com/)
- [Stripe](https://stripe.com/)
