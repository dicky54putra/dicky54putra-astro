// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
const buildMode = process.env.BUILD_ENV || "production";
const siteUrl = (() => {
  let siteUrl = process.env.SITE_URL || process.env.VERCEL_URL || "";

  if (siteUrl && !siteUrl.startsWith("http")) siteUrl = `https://${siteUrl}`;

  if (!siteUrl) {
    switch (buildMode) {
      case "production":
        return "https://ntc.dicky54putra.com";
      case "development":
        return "http://localhost:4321";
      default:
        return "https://beta.ntc.dicky54putra.com";
    }
  }

  return siteUrl;
})();

// To set for Twitch player embedding in blog posts
let parent = new URL(siteUrl).host;

// Twitch embed throws error with strings like 'localhost:3000', but
// those persist with `new URL().host`
if (parent.startsWith("localhost")) {
  parent = "localhost";
}

const siteMetadata = {
  title: `Unicorn Utterances`,
  description: `Learning programming from magically majestic words. A place to learn about all sorts of programming topics from entry-level concepts to advanced abstractions`,
  siteUrl,
  repoPath: "dicky54putra/dicky54putra-astro",
  relativeToPosts: "/content/blog",
  keywords:
    "programming,development,mobile,web,game,software engineering,javascript,angular,react,computer science",
  twitterHandle: "@dicky54puta",
};

export { buildMode, parent, siteMetadata, siteUrl };

export const SITE_TITLE = "Notes the Code by dicky54putra";
export const SITE_DESCRIPTION = "Welcome to my website!";
