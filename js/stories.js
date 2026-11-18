
/* ============================================================
   SOUTH AFRICAN HISTORY ONLINE API
============================================================ */

const SAHO_API =
    "https://sahistory.org.za/jsonapi/node/article?page[limit]=50&sort=-created";


/* ============================================================
   PAGE ELEMENTS
============================================================ */

const storiesGrid = document.getElementById("storiesGrid");
const storiesLoading = document.getElementById("storiesLoading");
const storiesError = document.getElementById("storiesError");
const storiesEmpty = document.getElementById("storiesEmpty");
const retryStories = document.getElementById("retryStories");

const storySearch = document.getElementById("storySearch");

const storyFilters = document.querySelectorAll(".story-filter");

const storyCount =
    document.getElementById("storyCount") ||
    document.getElementById("storiesCount");


/* ============================================================
   STORY DATA
============================================================ */

let stories = [];

let activeCategory = "all";
let searchTerm = "";


/* ============================================================
   CATEGORY CLASSIFICATION
   Categories are assigned using article titles and summaries.
============================================================ */

function assignCategories(title, description) {

    const content = `${title} ${description}`.toLowerCase();

    const categories = [];

    const categoryKeywords = {

        History: [
            "history",
            "historical",
            "apartheid",
            "colonial",
            "heritage",
            "war",
            "struggle",
            "freedom",
            "independence",
            "past"
        ],

        Culture: [
            "culture",
            "music",
            "jazz",
            "kwaito",
            "dance",
            "literature",
            "art",
            "poetry",
            "tradition",
            "language"
        ],

        People: [
            "people",
            "women",
            "men",
            "leader",
            "activist",
            "artist",
            "politician",
            "community",
            "population",
            "biography"
        ],

        Movements: [
            "movement",
            "congress",
            "organisation",
            "organization",
            "union",
            "campaign",
            "resistance",
            "protest",
            "liberation"
        ],

        Protest: [
            "protest",
            "resistance",
            "uprising",
            "revolt",
            "strike",
            "boycott",
            "march",
            "repression",
            "forced removal"
        ],

        "Global Influence": [
            "global",
            "international",
            "world",
            "united nations",
            "unesco",
            "foreign",
            "internationally",
            "worldwide"
        ]

    };

    Object.entries(categoryKeywords).forEach(([category, keywords]) => {

        const matches = keywords.some(keyword =>
            content.includes(keyword)
        );

        if (matches) {
            categories.push(category);
        }

    });

    if (categories.length === 0) {
        categories.push("History");
    }

    return categories;
}


/* ============================================================
   CLEAN ARTICLE SUMMARY
============================================================ */

function cleanSummary(html) {

    if (!html) {
        return "Explore this historical article from South African History Online.";
    }

    const parser = new DOMParser();
    const documentContent = parser.parseFromString(html, "text/html");

    return documentContent.body.textContent
        .replace(/\s+/g, " ")
        .trim();
}


/* ============================================================
   EXTRACT ARTICLE IMAGE
============================================================ */

function getArticleImage(article) {

    const metaTags = article.attributes.metatag || [];

    const imageTag = metaTags.find(tag =>
        tag.attributes?.property === "og:image"
    );

    if (imageTag?.attributes?.content) {
        return imageTag.attributes.content;
    }

    return null;
}


/* ============================================================
   EXTRACT ARTICLE LINK
============================================================ */

function getArticleLink(article) {

    const metaTags = article.attributes.metatag || [];

    const canonicalTag = metaTags.find(tag =>
        tag.attributes?.rel === "canonical"
    );

    if (canonicalTag?.attributes?.href) {
        return canonicalTag.attributes.href;
    }

    const alias = article.attributes.path?.alias;

    if (alias) {
        return `https://sahistory.org.za${alias}`;
    }

    return `https://sahistory.org.za/`;
}


/* ============================================================
   NORMALISE API ARTICLES
============================================================ */

function formatArticle(article) {

    const attributes = article.attributes;

    const title = attributes.title || "Untitled article";

    const summary = cleanSummary(
        attributes.body?.summary ||
        attributes.body?.value ||
        ""
    );

    return {

        id: article.id,

        title: title,

        description: summary,

        image: getArticleImage(article),

        link: getArticleLink(article),

        categories: assignCategories(title, summary),

        source: "South African History Online"

    };

}


/* ============================================================
   FETCH ARTICLES FROM SAHO
============================================================ */

async function fetchStories() {

    try {

        showLoading();

        let nextUrl = SAHO_API;

        const fetchedArticles = [];

        const seenUrls = new Set();

        /* Fetch the first page and any available next pages */

        while (nextUrl && fetchedArticles.length < 100) {

            if (seenUrls.has(nextUrl)) {
                break;
            }

            seenUrls.add(nextUrl);

            const response = await fetch(nextUrl, {
                method: "GET",
                headers: {
                    "Accept": "application/vnd.api+json"
                }
            });

            if (!response.ok) {
                throw new Error(
                    `SAHO request failed. Status: ${response.status}`
                );
            }

            const result = await response.json();

            if (!Array.isArray(result.data)) {
                throw new Error("The SAHO API returned an unexpected response.");
            }

            const articles = result.data
                .filter(article =>
                    article.type === "node--article" &&
                    article.attributes?.status === true
                )
                .map(formatArticle);

            fetchedArticles.push(...articles);

            nextUrl = result.links?.next?.href || null;

        }

        stories = fetchedArticles;

        if (stories.length === 0) {
            showEmpty();
            return;
        }

        renderStories();

        hideLoading();
        hideError();
        hideEmpty();

    } catch (error) {

        console.error("Stories API error:", error);

        showError();

    }

}


/* ============================================================
   RENDER STORY CARDS
============================================================ */

function renderStories() {

    if (!storiesGrid) return;

    storiesGrid.innerHTML = "";

    const filteredStories = stories.filter(story => {

        const matchesCategory =
            activeCategory === "all" ||
            story.categories.some(category =>
                category.toLowerCase() === activeCategory.toLowerCase()
            );

        const searchableText = `
            ${story.title}
            ${story.description}
            ${story.categories.join(" ")}
        `.toLowerCase();

        const matchesSearch =
            searchableText.includes(searchTerm);

        return matchesCategory && matchesSearch;

    });

    updateStoryCount(filteredStories.length);

    if (filteredStories.length === 0) {
        showEmpty();
        return;
    }

    hideEmpty();

    const fragment = document.createDocumentFragment();

    filteredStories.forEach(story => {

        const card = document.createElement("a");

        card.className = "story-card";

        card.href = story.link;

        card.target = "_blank";

        card.rel = "noopener noreferrer";

        card.setAttribute(
            "aria-label",
            `Read ${story.title} on South African History Online`
        );


        /* Story image */

        const imageContainer = document.createElement("div");

        imageContainer.className = "story-card-image";

        if (story.image) {

            const image = document.createElement("img");

            image.src = story.image;

            image.alt = `Historical image for ${story.title}`;

            image.loading = "lazy";

            image.onerror = () => {

                image.remove();

                imageContainer.classList.add("image-unavailable");

            };

            imageContainer.appendChild(image);

        } else {

            imageContainer.classList.add("image-unavailable");

        }


        /* Story information */

        const content = document.createElement("div");

        content.className = "story-card-content";

        const title = document.createElement("h2");

        title.textContent = story.title;

        const description = document.createElement("p");

        description.textContent = story.description.length > 190
            ? `${story.description.substring(0, 190).trim()}...`
            : story.description;


        /* Category tags */

        const tags = document.createElement("div");

        tags.className = "story-card-tags";

        story.categories.forEach(category => {

            const tag = document.createElement("span");

            tag.className = "story-tag";

            tag.textContent = category;

            tags.appendChild(tag);

        });


        /* Source attribution */

        const source = document.createElement("span");

        source.className = "story-tag";

        source.textContent = "Source: SAHO";


        content.appendChild(title);

        content.appendChild(description);

        content.appendChild(tags);

        content.appendChild(source);


        /* Arrow */

        const arrow = document.createElement("span");

        arrow.className = "story-card-arrow";

        arrow.textContent = "→";

        arrow.setAttribute("aria-hidden", "true");


        card.appendChild(imageContainer);

        card.appendChild(content);

        card.appendChild(arrow);

        fragment.appendChild(card);

    });

    storiesGrid.appendChild(fragment);

}


/* ============================================================
   SEARCH STORIES
============================================================ */

function handleStorySearch(event) {

    searchTerm = event.target.value
        .trim()
        .toLowerCase();

    renderStories();

}


/* ============================================================
   FILTER STORIES BY CATEGORY
============================================================ */

function handleCategoryFilter(event) {

    const selectedFilter = event.currentTarget;

    activeCategory = (
        selectedFilter.dataset.category || "all"
    ).toLowerCase();

    storyFilters.forEach(filter => {

        filter.classList.remove("active");

        filter.setAttribute("aria-pressed", "false");

    });

    selectedFilter.classList.add("active");

    selectedFilter.setAttribute("aria-pressed", "true");

    renderStories();

}


/* ============================================================
   UPDATE STORY COUNT
============================================================ */

function updateStoryCount(count) {

    if (!storyCount) return;

    storyCount.textContent = `${count} stories found`;

}


/* ============================================================
   LOADING STATE
============================================================ */

function showLoading() {

    if (storiesLoading) {
        storiesLoading.hidden = false;
    }

    if (storiesGrid) {
        storiesGrid.innerHTML = "";
    }

    hideError();
    hideEmpty();

}

function hideLoading() {

    if (storiesLoading) {
        storiesLoading.hidden = true;
    }

}


/* ============================================================
   ERROR STATE
============================================================ */

function showError() {

    hideLoading();
    hideEmpty();

    if (storiesError) {
        storiesError.hidden = false;
    }

}

function hideError() {

    if (storiesError) {
        storiesError.hidden = true;
    }

}


/* ============================================================
   EMPTY STATE
============================================================ */

function showEmpty() {

    hideLoading();

    if (storiesEmpty) {
        storiesEmpty.hidden = false;
    }

}

function hideEmpty() {

    if (storiesEmpty) {
        storiesEmpty.hidden = true;
    }

}


/* ============================================================
   RETRY API REQUEST
============================================================ */

function retryFetchStories() {

    fetchStories();

}


/* ============================================================
   EVENT LISTENERS
============================================================ */

if (storySearch) {

    storySearch.addEventListener(
        "input",
        handleStorySearch
    );

}

storyFilters.forEach(filter => {

    filter.addEventListener(
        "click",
        handleCategoryFilter
    );

});

if (retryStories) {

    retryStories.addEventListener(
        "click",
        retryFetchStories
    );

}


/* ============================================================
   INITIALISE STORIES PAGE
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    fetchStories();

});
