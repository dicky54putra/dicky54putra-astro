---
title: How to Hide the Title from an Embedded YouTube Video
pubDate: 2024-06-14T01:18:23.011Z
type: blog
description: Here’s a step-by-step guide on how to hide the title from an embedded YouTube video.
categories:
  - General tips
tags:
  - css
  - javascript
  - scss
  - iframe
---

Embedding YouTube videos on your website is a great way to enhance your content and engage your audience. However, sometimes you might want to hide the video title for a cleaner look. While YouTube’s standard embed code includes the video title, there are a few workarounds to hide it. Here’s a step-by-step guide on how to hide the title from an embedded YouTube video.

## Using CSS and JavaScript

This time I will use the CSS method to overcome this. because I have tried with parameters but it doesn't work. so, I used the css method. I think this is effective in overcoming it

### Step 1: Prepare your HTML script

make the html structure like this.

```html
<div class="Iframe">
  <div class="Iframe__Wrapper">
    <img
      src="/app/assets/images/yt-logo.webp"
      class="Iframe__Button js-iframe-yt"
      width="120"
      height="120"
      alt="Button"
    />
    <img
      src="https://img.youtube.com/vi/__VIDEO_ID__/maxresdefault.jpg"
      alt="Youtube Video"
      class="Iframe__Thumbnail js-iframe-yt"
      width="1280"
      height="720"
    />
    <iframe
      frameborder="0"
      allowfullscreen=""
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      width="640"
      height="360"
      src="https://www.youtube-nocookie.com/embed/__VIDEO_ID__?controls=0&rel=0&playsinline=0&modestbranding=0&start&end&showinfo=0&autohide=0&modestbranding=0"
    ></iframe>
  </div>
</div>
```

### Step 1: Styling the component

```scss
@use "./abstract/variables" as v;

.Iframe {
  padding: 12px;
  background-color: v.$base-white;
  border-radius: 36px;

  &__Wrapper {
    border-radius: 36px;
    overflow: hidden;
    aspect-ratio: 16/9;
    position: relative;

    .Iframe__Button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }

    .Iframe__Thumbnail {
      object-fit: cover;
    }

    iframe {
      margin-block: 0;
      aspect-ratio: 16/9;
      width: 300%;
      height: 100%;
      margin-left: -100%;
      max-width: unset;
    }
  }
}
```

### Step 3: Add javascript

javascript to run when the button is clicked the video will play

```js
import $ from "jquery";

const componentsIframeYt = () => {
  const init = () => {
    execute();
  };

  const execute = () => {
    const el = {
      main: ".js-iframe-yt",
    };
    if ($(el.main).length === 0) return;

    $(document).on("click", el.main, function (e) {
      e.preventDefault();
      $(this).hide();
      $(this).siblings("img").hide();
      const iframe = $(this).siblings("iframe");

      iframe.attr("src", `${iframe.attr("src")}&autoplay=1`);
    });
  };
  init();
};

try {
  componentsIframeYt();
} catch (error) {
  console.error("componentsIframeYt", error);
}
```

## Conclusion

Hiding the title from an embedded YouTube video can help maintain a clean and professional look on your website. While direct support for hiding titles is limited, using URL parameters, CSS/JavaScript overlays, or third-party tools can achieve the desired effect. Experiment with these methods to find the best solution for your needs.
