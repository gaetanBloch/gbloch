# Gaetan Bloch's Personal Website and Blog

### Video Demo: [Demo Video](https://youtu.be/I9ZunrRCt6I)

### Description:

Welcome to my final project for CS50's Introduction to Computer Science course! This project is a culmination of the skills and knowledge I've acquired during the course, presented as a comprehensive personal website and blog. My site is accessible via three URLs: [gaetan-bloch.com](https://gaetan-bloch.com/), [gaetanbloch.ai](https://gaetanbloch.ai/), and [gbloch.com](https://gbloch.com/).

## **Project Overview**

This project is a personal website that serves as a portfolio and a blog. It's built using a modern web development stack that includes TypeScript, JavaScript, Astro, AlpineJS, and SolidJS. For content management, I've integrated two headless CMSs: Strapi and Ghost. Strapi manages the general content, while Ghost is dedicated to the blog posts. These CMSs are deployed on Render and Digital Ocean, respectively. The website itself is hosted on Vercel and Netlify, ensuring high availability and performance.

## **Technical Details**

- **TypeScript/JavaScript**: Leveraged for scripting and adding interactive features.
- **Astro**: Utilized as the build framework, providing excellent performance and SEO capabilities.
- **AlpineJS**: Employed for its simplicity and power in handling reactivity and data-binding on the front-end.
- **SolidJS**: Selected for its efficiency and fine-grained reactivity in the development of UI components.
- **Strapi**: Used as a headless CMS for managing general content, hosted on Digital Ocean.
- **Ghost**: Chosen for blog post management due to its focus on blogging, hosted on Render.
- **Deployment**: The site is deployed on Vercel and Netlify, ensuring robust hosting solutions.

## **Design Decisions**

Throughout the development process, I faced several design choices:

- **Choosing Astro**: I opted for Astro because of its impressive performance metrics, especially its efficient handling of static site generation, which is key for SEO.
- **AlpineJS and SolidJS**: The combination of AlpineJS and SolidJS provided a balance between ease of use and reactivity, perfect for a dynamic yet lightweight website.
- **Dual CMS Approach**: Utilizing Strapi and Ghost allowed me to leverage the strengths of each platform — Strapi for versatile content management and Ghost for its blogging prowess.
- **Multiple Hosting Services**: Deploying on both Vercel and Netlify guarantees high availability and redundancy.

## **Conclusion**

This project represents not just my learning journey in CS50, but also my passion for web development and content creation. I've aimed to create a website that is not only functional and informative but also a reflection of my skills and creativity.

I invite you to explore the website, and I hope it serves as a testament to the knowledge and skills I've gained in CS50.

[![Netlify Status](https://api.netlify.com/api/v1/badges/44a100f8-9cff-4933-9907-a39a5e84f840/deploy-status)](https://app.netlify.com/sites/gbloch/deploys)

# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
