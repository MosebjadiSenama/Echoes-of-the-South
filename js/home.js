
/* GSAP EXPLORE GENRES SECTION ANIMATION */

const genreSection = document.querySelector(".featured-genres");

if (genreSection) {

    // Select the Explore Genres heading
    const genreHeading = genreSection.querySelector(".section-heading");

    // Select the section subtitle
    const genreSubtitle = genreSection.querySelector("h3");

    // Select the section description
    const genreDescription = genreSection.querySelector("p");

    // Create a timeline for the heading animations
    const genreTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: genreSection,
            start: "top 80%",
            toggleActions: "restart none restart none"
        }
    });

    // Animate the Explore Genres heading
    if (genreHeading) {
        genreTimeline.from(genreHeading, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    // Animate the subtitle
    if (genreSubtitle) {
        genreTimeline.from(genreSubtitle, {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        }, "-=0.4");
    }

    // Animate the description
    if (genreDescription) {
        genreTimeline.from(genreDescription, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        }, "-=0.3");
    }
}

//GENRE CARD
gsap.registerPlugin(ScrollTrigger);

const genreCards = gsap.utils.toArray(".genre-card");

genreCards.forEach((card, index) => {

    // Set the initial size of each card
    gsap.set(card, {
        scale: 1 - (index * 0.04),
        transformOrigin: "center top"
    });

    // Shrink the current card as the next card takes over
    if (index < genreCards.length - 1) {

        const nextCard = genreCards[index + 1];

        gsap.fromTo(card,
            {
                scale: 1 - (index * 0.04),
                opacity: 1
            },
            {
                scale: 0.82,
                opacity: 0.65,
                ease: "none",
                scrollTrigger: {
                    trigger: nextCard,
                    start: "top 130px",
                    end: "top 70px",
                    scrub: true
                }
            }
        );

        // Grow the next card as it moves into the foreground
        gsap.fromTo(nextCard,
            {
                scale: 1 - ((index + 1) * 0.04)
            },
            {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: nextCard,
                    start: "top 130px",
                    end: "top 70px",
                    scrub: true
                }
            }
        );
    }
});

/* GSAP FEATURED ARTISTS SECTION ANIMATION */

// Select the entire Featured Artists section
const artistSection = document.querySelector(".featured-artists");

if (artistSection) {

    // Select the heading, description, artist cards and explore link
    const artistHeading = artistSection.querySelector("h2");
    const artistDescription = artistSection.querySelector("p");
    const artistCards = artistSection.querySelectorAll(".artist-card");
    const artistLink = artistSection.querySelector(".explore-all-artists");

    // Create a timeline to control the animation sequence
    const artistTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: artistSection,
            start: "top 80%",
            toggleActions: "restart none restart none"
        }
    });

    // Animate the Featured Artists heading
    if (artistHeading) {
        artistTimeline.from(artistHeading, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    // Animate the section description
    if (artistDescription) {
        artistTimeline.from(artistDescription, {
            y: 25,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
        }, "-=0.4");
    }

    // Reveal artist cards one after another
    if (artistCards.length) {
        artistTimeline.from(artistCards, {
            y: 55,
            opacity: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: "power3.out"
        }, "-=0.2");
    }

    // Animate the Explore All Artists link
    if (artistLink) {
        artistTimeline.from(artistLink, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3");
    }
}

//PUSH STORY CARDS TO HOMEOAGE


/* Category filters */

if (extraGrid && extraSearch && storyCount) {
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(filter => {
                filter.classList.remove("active");
                filter.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            activeCategory = button.dataset.category;
            displayStories();
        });
    });

    extraSearch.addEventListener("input", displayStories);
}

/* Retry button */

if (retryButton) {
    retryButton.addEventListener("click", initialiseStories);
}

/* Homepage featured stories */

async function initialiseHomeStories() {
    const homeGrid = document.getElementById("homeStoriesGrid");

    if (!homeGrid) return;

    const featuredStories = stories.slice(0, 3);

    homeGrid.innerHTML = "";

    try {
        await Promise.all(featuredStories.map(async story => {
            if (imageCollection[story.id]) return;

            try {
                const response = await fetch(
                    "https://proxy.cors.dev/" + story.source,
                    { credentials: "omit" }
                );

                if (!response.ok) return;

                const html = await response.text();
                const parser = new DOMParser();
                const page = parser.parseFromString(html, "text/html");

                const imageMeta =
                    page.querySelector('meta[property="og:image"]') ||
                    page.querySelector('meta[name="twitter:image"]');

                if (imageMeta && imageMeta.content) {
                    imageCollection[story.id] = new URL(
                        imageMeta.content,
                        story.source
                    ).href;
                }
            } catch (error) {
                console.warn("Homepage story image unavailable:", story.title);
            }
        }));

        featuredStories.forEach(story => {
            const card = document.createElement("a");
            card.className = "story-card";
            card.href = story.source;
            card.target = "_blank";
            card.rel = "noopener noreferrer";

            const imageContainer = document.createElement("div");
            imageContainer.className = "story-card-image";

            const imageURL = imageCollection[story.id];

            if (imageURL) {
                const image = document.createElement("img");
                image.src = imageURL;
                image.alt = story.title;
                image.loading = "lazy";

                image.onerror = () => {
                    imageContainer.classList.add("image-unavailable");
                };

                imageContainer.appendChild(image);
            } else {
                imageContainer.classList.add("image-unavailable");
            }

            const content = document.createElement("div");
            content.className = "story-card-content";

            const category = document.createElement("div");
            category.className = "story-card-tags";

            const tag = document.createElement("span");
            tag.className = "story-tag";
            tag.textContent = story.label;

            category.appendChild(tag);

            const title = document.createElement("h2");
            title.textContent = story.title;

            const description = document.createElement("p");
            description.textContent = story.description;

            const arrow = document.createElement("span");
            arrow.className = "story-card-arrow";
            arrow.textContent = "↗";

            content.append(category, title, description);
            card.append(imageContainer, content, arrow);

            homeGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Could not load homepage stories:", error);
        homeGrid.innerHTML = "<p class='stories-status'>Stories are currently unavailable.</p>";
    }
}

/* Initialise the Stories page only when its elements exist */

if (extraGrid && extraSearch && storyCount) {
    initialiseStories();
}

/* Initialise homepage stories */

initialiseHomeStories();

//open story cards in a new tab
const card = document.createElement("a");

card.className = "story-card";
card.href = story.source;
card.target = "_blank";
card.rel = "noopener noreferrer";


// Featured Stories Animation
gsap.registerPlugin(ScrollTrigger);

const storiesTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".featured-stories",
        start: "top 75%",
        toggleActions: "restart none restart none"
    }
});

storiesTimeline.from(".featured-stories .section-heading", {
    y: 35,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
});

storiesTimeline.from(".featured-stories .hero-description, .featured-stories .genre-content p", {
    y: 20,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: "power2.out"
}, "-=0.4");

storiesTimeline.from(".featured-stories-grid .story-card", {
    y: 35,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: "power2.out"
}, "-=0.2");

storiesTimeline.from(".view-all-stories-section", {
    opacity: 0,
    y: 15,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.2");


//

// Featured Stories Animation
function animateFeaturedStories() {
    const storiesSection = document.querySelector(".featured-stories");

    if (!storiesSection) return;

    const storiesHeading = storiesSection.querySelector(".section-heading");
    const storiesDescription = storiesSection.querySelectorAll(
        ".hero-description, .genre-content p"
    );
    const storyCards = storiesSection.querySelectorAll(".story-card");
    const viewAllStories = storiesSection.querySelector(".view-all-stories-section");

    const storiesTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: storiesSection,
            start: "top 75%",
            toggleActions: "play none none none"
        }
    });

    if (storiesHeading) {
        storiesTimeline.from(storiesHeading, {
            y: 35,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    if (storiesDescription.length) {
        storiesTimeline.from(storiesDescription, {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.4");
    }

    if (storyCards.length) {
        storiesTimeline.from(storyCards, {
            y: 35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.2");
    }

    if (viewAllStories) {
        storiesTimeline.from(viewAllStories, {
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.2");
    }
}