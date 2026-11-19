
/* ============================================================
   PAGE ELEMENTS
============================================================ */

const artistGrid = document.getElementById("artistsGrid");
const artistSearch = document.getElementById("artistSearch");
const artistCount = document.getElementById("artistCount");

const loadingState = document.getElementById("artistsLoading");
const errorState = document.getElementById("artistsError");
const emptyState = document.getElementById("artistsEmpty");

const retryButton = document.getElementById("retryArtists");
const loadMoreButton = document.getElementById("loadMoreArtists");

const filterButtons = document.querySelectorAll(".artist-filter");
const YOUTUBE_API_KEY =
    "AIzaSyBNV_5iM9L9o6KicU3aJyU2MujJmmuEE5M";


/* ============================================================
   ARTIST CATALOGUE
============================================================ */

const genreArtists = {
    "Maskandi": [
        "Phuzekhemisi",
        "Bhekumuzi Luthuli",
        "Ihashi Elimhlophe",
        "Mfaz' Omnyama",
        "Mzukulu",
        "Ntencane",
        "Feza",
        "Inkos'yamagcokama",
        "Nkeshemba",
        "Shiyani Ngcobo",
        "Nkunzi",
        "Khuzani",
        "Umafikizolo",
        "Mthandeni SK",
        "Menzi Music",
        "Umgqumeni",
        "Umajotha",
        "Limit"
    ],

    "Motswako": [
        "HHP",
        "Khuli Chana",
        "Tuks Senganga",
        "Mo'Molemi",
        "Morafe",
        "Fifi Cooper",
        "JR",
        "Cassper Nyovest",
        "Notshi",
        "Dramaboi",
        "Maglera Doe Boy",
        "Stogie T",
        "Zeus",
        "Teargas",
        "Hip Hop Pantsula"
    ],

    "Kwaito": [
        "Arthur Mafokate",
        "Mandoza",
        "Zola 7",
        "TKZee",
        "Boom Shaka",
        "Bongo Maffin",
        "Mafikizolo",
        "Thebe",
        "Oskido",
        "Skwatta Kamp",
        "Brown Dash",
        "Mzekezeke",
        "Chicco",
        "Brenda Fassie",
        "Mapaputsi"
    ],

    "Lekompo": [
        "Shebeshxt",
        "Makhadzi",
        "King Monada",
        "Kharishma",
        "Shandesh",
        "Janesh",
        "Ba Bethe Gashoazen",
        "Natiey Lepaka",
        "Original Sedi",
        "Tribby Wadi Bhozza",
        "PLG Chanty",
        "KayCherlow NLL",
        "Xduppy",
        "Master KG",
        "Makhadzi Entertainment",
        "Lil Meri"
    ],

    "Mbaqanga": [
        "Mahlathini",
        "Mahotella Queens",
        "The Soul Brothers",
        "West Nkosi",
        "Reggie Msomi",
        "Abafana BaseQhudeni",
        "The Movers",
        "Simon 'Mahlathini' Nkabinde",
        "Ladysmith Black Mambazo",
        "Miriam Makeba",
        "Letta Mbulu",
        "Bongi Makeba"
    ],

    "Jazz": [
        "Hugh Masekela",
        "Miriam Makeba",
        "Abdullah Ibrahim",
        "Jonas Gwangwa",
        "Mango Groove",
        "Zim Ngqawana",
        "Bheki Mseleku",
        "Nduduzo Makhathini",
        "Moses Molelekwa",
        "Dudu Pukwana",
        "Kippie Moeketsi",
        "Chris McGregor",
        "Makhozi",
        "Mandisi Dyantyis",
        "Thandi Ntuli"
    ],

    "Amapiano": [
        "Kabza De Small",
        "DJ Maphorisa",
        "MFR Souls",
        "Young Stunna",
        "Daliwonga",
        "Nkosazana Daughter",
        "Boohle",
        "Musa Keys",
        "Uncle Waffles",
        "DBN Gogo",
        "Tyler ICU",
        "De Mthuda",
        "Vigro Deep",
        "Felo Le Tee",
        "Pabi Cooper"
    ],

    "Gqom": [
        "Babes Wodumo",
        "Dlala Thukzin",
        "Mr Thela",
        "RudeBoyz",
        "Distruction Boyz",
        "DJ Lag",
        "Rox",
        "Busiswa",
        "General C'mamane",
        "Dankie Boi",
        "Cairo CPT",
        "Blacks Jnr",
        "We Dem Boyz",
        "Dj Tira",
       
    ],

    "Afro-house": [
        "Black Coffee",
        "Caiiro",
        "Shimza",
        "Sun-El Musician",
        "Prince Kaybee",
        "DJ Zinhle",
        "Zakes Bantwini",
        "Oscar Mbo",
        "Culoe De Song",
        "Da Capo",
        "Mi Casa",
        "Simmy",
        "Mörda",
        "Gaba Cannal",
        "Judy Jay"
    ],

    "Hip-Hop": [
        "A-Reece",
        "Nasty C",
        "Kwesta",
        "AKA",
        "Nadia Nakai",
        "YoungstaCPT",
        "Big Zulu",
        "Riky Rick",
        "K.O",
        "Reason",
        "Emtee",
        "Blxckie",
       ,
        "Gigi Lamayne",
        "Saudi"
    ],

    "Tsa Manyalo": [
    "Pleasure Tsa Manyalo",
    "Maredi Maredi",
    "Fourman",
    "Danny Tsa Manyalo",
    "Doc Tsa Manyalo",
    "Ayanda Tsa Manyalo",
    "Vsinare",
    "Maredi tsa Manyalo"
    ],


    "Afro-pop": [
        "Brenda Fassie",
        "Yvonne Chaka Chaka",
        "Mafikizolo",
        "Sho Madjozi",
        "Nomfundo Moh",
        "Lwah Ndlunkulu",
        "Zahara",
        "Kelly Khumalo",
        "Makhadzi",
        "Miriam Makeba",
        "Thandiswa Mazwai",
        "Simphiwe Dana",
        "Shekhinah",
        "Tyla",
        "Ami Faku",
        "Nomcebo Zikode"
    ],

    "Rock": [
        "The Parlotones",
        "Prime Circle",
        "Seether",
        "Springbok Nude Girls",
        "Fuzigish",
        "Freshlyground",
        "Arno Carstens",
        "Piet Botha",
        "aKING",
        "Taxi Violence",
        "The Narrow",
        "Wonderboom",
        "Just Jinger",
        "Van Coke Kartel"
    ],

    "Gospel": [
        "Rebecca Malope",
        "Benjamin Dube",
        "Ntokozo Mbambo",
        "Dr Tumi",
        "Joyous Celebration",
        "Spirit of Praise",
        "Bucy Radebe",
        "Hlengiwe Mhlaba",
        "Dumi Mkokstad",
        "Xolly Mncwango",
        "Nontokozo Mkhize",
        "Omega Khunou",
        "HLE",
        "Nqubeko Mbatha",
        "Musa Yende",
        "Sbu Noah",
    ],

        "Isicathamiya": [
        "Ladysmith Black Mambazo",
        "Thee Legacy",
        "Kholwa Brothers",
        "Solomon Linda's Original Evening Birds",
        "Insingizi",
        "Umoya Omusha",
        "Young Singers",
       

    ],

    "Pop": [
        "Tyla",
        "Zahara",
        "Shekhinah",
        "Brenda Fassie",
        "Yvonne Chaka Chaka",
        "Kelly Khumalo",
        "Lira",
        "Nomfundo Moh",
        "Amanda Black",
        "Elaine",
        "TRESOR",
        "Musa",
        "Ciza",
        "Bobby van Jaarsveld",
        "Lloyiso",
        
    ],


    "Afro soul": [
        "Ami Faku",
        "Simphiwe Dana",
        "Zahara",
        "Lira",
        "Ringo Madlingozi",
        "The soil",
        "Amanda Black",
        "Vusi Nova",
        "Zahara"


    ],


"Reggae": [
    "Lucky Dube",
    "Carlos Djedje",
    "Colbert Mukwevho",
    "O'Yaba",
    "Tidal Waves",
    "Nkulee Dube",
    "Thokozani Dube",
    "Sister Phumi",
    "Dr Victor and the Rasta Rebels",
    "Dread Warriors",
    "Haile and the Rasta Family",
    "Kori Moraba",
    "P. Postman",
    "Thuthukani Cele",
    "Saggy Saggila",
    "The One People Band",
    "Steve Kekana",
    "Jahnett Tafari"
]

};


/* ============================================================
   ARTIST CATEGORIES
============================================================ */

const categoryGenres = {
    traditional: [
        "Maskandi",
        "Mbaqanga",
        "Isicathamiya",
        "Tsa Manyalo"
    ],

    township: [
        "Motswako",
        "Kwaito",
        "Hip-Hop"
    ],

    dance: [
        "Amapiano",
        "Gqom",
        "Afro-house",
        "Lekompo",
        "Tsa Manyalo"
    ],

    jazz: [
        "Jazz",
        "Afro-jazz",
        "Afro-soul",
       
    ],

    pop: [
        "Pop",
        "Afro-pop",
        "Rock",
        "Reggae"
    ],

    gospel: [
        "Gospel",
        "Isicathamiya"
    ]
};


/* ============================================================
   PAGE STATE
============================================================ */

let enrichedArtists = [];

let activeCategory = "all";
let searchTerm = "";
let visibleArtists = 12;

let mixedArtistOrders = {};

const ARTISTS_PER_PAGE = 12;


/* ============================================================
   SHUFFLE ARTISTS
============================================================ */

function shuffleArray(items) {

    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i]
        ];

    }

    return shuffled;
}


/* ============================================================
   MIX ARTISTS FROM DIFFERENT GENRES
============================================================ */

function mixArtistsByGenre(artistList, category = "all") {

    const allowedGenres = category === "all"
        ? null
        : (categoryGenres[category] || []);

    const genreGroups = new Map();

    artistList.forEach(artist => {

        const matchingGenre = allowedGenres
            ? artist.genres.find(genre => allowedGenres.includes(genre))
            : artist.genres[0];

        const groupName = matchingGenre || "Other";

        if (!genreGroups.has(groupName)) {
            genreGroups.set(groupName, []);
        }

        genreGroups.get(groupName).push(artist);

    });

    const groups = Array.from(genreGroups.entries()).map(
        ([genre, group]) => ({
            genre,
            artists: shuffleArray(group)
        })
    );

    const mixedArtists = [];

    let lastGenre = null;

    while (groups.some(group => group.artists.length > 0)) {

        const availableGroups = groups.filter(group =>
            group.artists.length > 0 &&
            group.genre !== lastGenre
        );

        const choices = availableGroups.length > 0
            ? availableGroups
            : groups.filter(group => group.artists.length > 0);

        const selectedGroup = choices[
            Math.floor(Math.random() * choices.length)
        ];

        mixedArtists.push(selectedGroup.artists.pop());

        lastGenre = selectedGroup.genre;

    }

    return mixedArtists;
}


/* ============================================================
   COMBINE ARTISTS
============================================================ */

const artistMap = new Map();

Object.entries(genreArtists).forEach(([genre, names]) => {

    names.forEach(name => {

        const key = name.toLowerCase().trim();

        if (!artistMap.has(key)) {

            artistMap.set(key, {
                name,
                genres: [],
                categories: [],
                image: null,
                biography: "",
                article: null
            });

        }

        const artist = artistMap.get(key);

        if (!artist.genres.includes(genre)) {
            artist.genres.push(genre);
        }

    });

});

const artists = Array.from(artistMap.values());

artists.forEach(artist => {

    Object.entries(categoryGenres).forEach(([category, genres]) => {

        if (artist.genres.some(genre => genres.includes(genre))) {
            artist.categories.push(category);
        }

    });

});


/* ============================================================
   CREATE MIXED ARTIST ORDERS
============================================================ */

function createMixedArtistOrders() {

    mixedArtistOrders = {};

    mixedArtistOrders.all = mixArtistsByGenre(
        enrichedArtists,
        "all"
    );

    Object.keys(categoryGenres).forEach(category => {

        const categoryArtists = enrichedArtists.filter(artist =>
            artist.categories.includes(category)
        );

        mixedArtistOrders[category] = mixArtistsByGenre(
            categoryArtists,
            category
        );

    });

}


/* ============================================================
   FETCH ARTIST IMAGES
   MATCH ARTIST WIKIPEDIA PAGES BEFORE USING IMAGES
============================================================ */

const artistImageCache = new Map();


/* ============================================================
   NORMALISE ARTIST NAMES
============================================================ */

function normaliseArtistName(name) {
    return name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");
}


/* ============================================================
   CHECK IF WIKIPEDIA PAGE IS ABOUT A MUSICIAN
============================================================ */

function isMusicRelatedDescription(description) {
    const musicTerms =
        /\b(musician|singer|rapper|vocalist|songwriter|composer|producer|dj|disc jockey|band|musical group|music group|recording artist|music artist|hip hop artist|gospel artist)\b/i;

    return musicTerms.test(description || "");
}


/* ============================================================
   FETCH A VERIFIED ARTIST IMAGE FROM WIKIPEDIA
============================================================ */

async function getWikipediaArtistImage(artistName) {

    try {

        const url = new URL(
            "https://en.wikipedia.org/w/api.php"
        );

        url.search = new URLSearchParams({

            action: "query",
            format: "json",
            formatversion: "2",
            origin: "*",

            generator: "search",
            gsrsearch: artistName,
            gsrnamespace: "0",
            gsrlimit: "8",

            prop: "pageimages|pageterms",
            piprop: "thumbnail",
            pithumbsize: "700",
            pilimit: "8",

            wbptterms: "description",
            redirects: "1"

        });

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Wikipedia request failed");
        }

        const data = await response.json();

        const pages = data.query?.pages || [];

        if (!pages.length) {
            return null;
        }

        const requestedName = normaliseArtistName(artistName);

        /* ONLY ACCEPT A PAGE WHOSE TITLE MATCHES THE ARTIST */

        const matchingPages = pages
            .map(page => {

                const pageTitle = normaliseArtistName(
                    page.title.replace(/\s*\([^)]*\)\s*$/, "")
                );

                const description =
                    page.terms?.description?.[0] || "";

                let score = 0;

                if (pageTitle === requestedName) {
                score = 100;
                 }

                return {
                    page,
                    score,
                    description
                };

            })
            .filter(item => {

                return (
                    item.score >= 100 &&
                    item.page.thumbnail?.source &&
                    isMusicRelatedDescription(item.description)
                );

            })
            .sort((a, b) => b.score - a.score);

        if (!matchingPages.length) {
            console.warn(
                "No confidently matched artist image:",
                artistName
            );

            return null;
        }

        return matchingPages[0].page.thumbnail.source;

    } catch (error) {

        console.warn(
            `Could not retrieve image for ${artistName}:`,
            error
        );

        return null;

    }

}



/* ============================================================
   FETCH ARTIST PROFILE IMAGE FROM YOUTUBE
============================================================ */

async function getYouTubeArtistImage(artistName) {

    try {

        const url = new URL(
            "https://www.googleapis.com/youtube/v3/search"
        );

        url.search = new URLSearchParams({

            part: "snippet",
            q: `${artistName} official`,
            type: "channel",
            maxResults: "5",
            key: YOUTUBE_API_KEY

        });

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("YouTube image request failed.");
        }

        const data = await response.json();

        const requestedName = normaliseArtistName(artistName);

        const matchingChannel = (data.items || []).find(channel => {

            const channelName = normaliseArtistName(
                channel.snippet?.title || ""
            );

            return (
                channelName === requestedName ||
                channelName === `${requestedName} official`
            );

        });

        if (!matchingChannel) {
            return null;
        }

        const thumbnails = matchingChannel.snippet.thumbnails;

        return (
            thumbnails?.high?.url ||
            thumbnails?.medium?.url ||
            thumbnails?.default?.url ||
            null
        );

    } catch (error) {

        console.warn(
            `YouTube image unavailable for ${artistName}:`,
            error
        );

        return null;

    }

}

/* ============================================================
   GET ARTIST IMAGE
   PRIORITISE ARTIST PHOTOGRAPH, THEN ALBUM ARTWORK
============================================================ */

async function getArtistImage(artistName) {

    const cacheKey = normaliseArtistName(artistName);

    if (artistImageCache.has(cacheKey)) {
        return artistImageCache.get(cacheKey);
    }

    try {

        
/* First attempt: verified artist photograph from Wikipedia. */

let imageUrl = await getWikipediaArtistImage(artistName);

let imageType = "portrait";

/* Second attempt: artist channel profile image from YouTube. */

if (!imageUrl) {

    imageUrl = await getYouTubeArtistImage(artistName);

    imageType = "youtube";

}

/* Third attempt: matching album artwork from iTunes. */

if (!imageUrl) {

    imageUrl = await getArtistAlbumArtwork(artistName);

    imageType = "album";

}

const result = imageUrl
    ? { url: imageUrl, type: imageType }
    : null;

artistImageCache.set(cacheKey, result);

return result;

        return result;

    } catch (error) {

        console.warn(
            `Image retrieval failed for ${artistName}:`,
            error
        );

        artistImageCache.set(cacheKey, null);

        return null;

    }

}



/* ============================================================
   LOAD IMAGES FOR VISIBLE ARTISTS ONLY
============================================================ */

const artistImageRequests = new Set();

async function loadVisibleArtistImages() {

    const visibleArtistList = getFilteredArtists().slice(
        0,
        visibleArtists
    );

    const artistsToLoad = visibleArtistList.filter(artist => {

        return (
            !artist.imageLoaded &&
            !artistImageRequests.has(artist.name)
        );

    });

    await mapWithConcurrency(
        artistsToLoad,
        2,
        async artist => {

            artistImageRequests.add(artist.name);

            try {

                const imageResult = await getArtistImage(artist.name);

                if (!imageResult) {
                    artist.imageLoaded = true;
                    return;
                }

                artist.image = imageResult.url;
                artist.imageType = imageResult.type;
                artist.imageLoaded = true;

                const card = Array.from(
                    artistGrid.querySelectorAll(".artist-card")
                ).find(card => {

                    return card.dataset.artistName === artist.name;

                });

                if (!card) {
                    return;
                }

                const imageContainer = card.querySelector(
                    ".artist-card-image"
                );

                if (!imageContainer) {
                    return;
                }

                const placeholder = imageContainer.querySelector(
                    ".artist-image-placeholder"
                );

                if (placeholder) {
                    placeholder.remove();
                }

                const image = document.createElement("img");

                image.src = imageResult.url;

               image.alt = imageResult.type === "album"
                ? `${artist.name} album artwork`
                : imageResult.type === "youtube"
                 ? `${artist.name} YouTube channel profile image`
        : `${artist.name} photograph`;

                image.loading = "lazy";

                image.onerror = () => {

                    image.remove();

                    createImagePlaceholder(
                        imageContainer,
                        artist.name
                    );

                };

                const arrow = imageContainer.querySelector(
                    ".artist-card-arrow"
                );

                imageContainer.insertBefore(
                    image,
                    arrow || null
                );

            } catch (error) {

                console.warn(
                    `Image loading failed for ${artist.name}:`,
                    error
                );

            } finally {

                artistImageRequests.delete(artist.name);

            }

        }
    );

}

/* ============================================================
   GET ALBUM ARTWORK FROM ITUNES
   FALLBACK WHEN NO VERIFIED ARTIST PHOTO IS FOUND
============================================================ */

async function getArtistAlbumArtwork(artistName) {

    try {

        const url = new URL("https://itunes.apple.com/search");

        url.search = new URLSearchParams({

            term: artistName,
            entity: "song",
            media: "music",
            country: "ZA",
            limit: "30"

        });

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("iTunes artwork request failed.");
        }

        const data = await response.json();

        const matchingSong = (data.results || []).find(song => {

            return (
                normaliseArtistName(song.artistName || "") ===
                normaliseArtistName(artistName) &&
                song.artworkUrl100
            );

        });

        if (!matchingSong) {
            return null;
        }

        return matchingSong.artworkUrl100.replace(
            "100x100",
            "600x600"
        );

    } catch (error) {

        console.warn(
            `No album artwork found for ${artistName}:`,
            error
        );

        return null;

    }

}


/* ============================================================
   LIMIT SIMULTANEOUS IMAGE REQUESTS
============================================================ */

async function mapWithConcurrency(items, limit, callback) {

    const results = new Array(items.length);

    let currentIndex = 0;

    async function worker() {

        while (currentIndex < items.length) {

            const index = currentIndex++;

            results[index] = await callback(items[index]);

        }

    }

    const workers = Array.from(
        { length: Math.min(limit, items.length) },
        () => worker()
    );

    await Promise.all(workers);

    return results;

}



/* ============================================================
   FETCH ARTIST INFORMATION
============================================================ */

async function fetchArtistInformation() {

    loadingState.hidden = false;
    errorState.hidden = true;

    /* Prepare the artist catalogue immediately. */

    enrichedArtists = artists.map(artist => ({

        ...artist,

        image: null,

        biography: "",

        article: null

    }));

    createMixedArtistOrders();

    /* Display artist cards without waiting for images. */

    loadingState.hidden = true;

    renderArtists();

}



/* ============================================================
   FILTER ARTISTS
============================================================ */

function getFilteredArtists() {

    const categoryArtists =
        mixedArtistOrders[activeCategory] || [];

    return categoryArtists.filter(artist => {

        const searchableText = [

            artist.name,
            ...artist.genres

        ].join(" ").toLowerCase();

        return searchableText.includes(searchTerm);

    });

}

/* ============================================================
   RENDER ARTIST CARDS
============================================================ */

function renderArtists() {

    const filteredArtists = getFilteredArtists();

    const artistsToShow = filteredArtists.slice(
        0,
        visibleArtists
    );

    artistGrid.innerHTML = "";

    artistCount.textContent =
        `${filteredArtists.length} artists`;

    emptyState.hidden = filteredArtists.length !== 0;

    loadMoreButton.hidden =
        filteredArtists.length <= visibleArtists;


    artistsToShow.forEach(artist => {

        const card = document.createElement("a");

        card.className = "artist-card";
        card.dataset.artistName = artist.name;

        const artistSlug = artist.name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        const artistGenres = encodeURIComponent(artist.genres.join("|"));

        card.href =
            `artist-details.html?artist=${encodeURIComponent(artistSlug)}&genres=${artistGenres}`;


        /* ============================================================
           ARTIST IMAGE
        ============================================================ */

        const imageContainer = document.createElement("div");

        imageContainer.className = "artist-card-image";

        const image = document.createElement("img");

        image.alt = artist.imageType === "album"
            ? `${artist.name} album artwork`
            : artist.imageType === "youtube"
                ? `${artist.name} YouTube channel profile image`
                : `${artist.name} photograph`;

        image.loading = "lazy";

        image.src = artist.image || "";

        image.onerror = () => {

            image.remove();

            createImagePlaceholder(
                imageContainer,
                artist.name
            );

        };

        if (artist.image) {

            imageContainer.appendChild(image);

        } else {

            createImagePlaceholder(
                imageContainer,
                artist.name
            );

        }


        /* ============================================================
           ARROW
        ============================================================ */

        const arrow = document.createElement("span");

        arrow.className = "artist-card-arrow";
        arrow.textContent = "↗";

        imageContainer.appendChild(arrow);


        /* ============================================================
           ARTIST INFORMATION
        ============================================================ */

        const information = document.createElement("div");

        information.className = "artist-card-info";

        const name = document.createElement("h3");

        name.textContent = artist.name;

        const genres = document.createElement("p");

        genres.textContent = artist.genres.join(" · ");

        information.appendChild(name);
        information.appendChild(genres);

        card.appendChild(imageContainer);
        card.appendChild(information);

        artistGrid.appendChild(card);

    });


    /* ============================================================
       LOAD IMAGES AFTER ALL ARTIST CARDS EXIST
    ============================================================ */

    loadVisibleArtistImages();

}

/* ============================================================
   IMAGE PLACEHOLDER
============================================================ */

function createImagePlaceholder(container, artistName) {

    const placeholder = document.createElement("div");

    placeholder.className = "artist-image-placeholder";

    placeholder.textContent =
        artistName.charAt(0).toUpperCase();

    container.appendChild(placeholder);

}


/* ============================================================
   CATEGORY FILTERS
============================================================ */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(filter => {
            filter.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory = button.dataset.category;

        visibleArtists = ARTISTS_PER_PAGE;

        renderArtists();
        loadVisibleArtistImages();

    });

});


/* ============================================================
   SEARCH
============================================================ */

let searchScrollTimeout;

artistSearch.addEventListener("input", event => {

    searchTerm = event.target.value.trim().toLowerCase();

    visibleArtists = ARTISTS_PER_PAGE;

    renderArtists();

    clearTimeout(searchScrollTimeout);

    if (searchTerm.length > 0) {
        searchScrollTimeout = setTimeout(() => {
            artistGrid.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 500);
    }

});

/* ============================================================
   LOAD MORE
============================================================ */

loadMoreButton.addEventListener("click", () => {

    visibleArtists += ARTISTS_PER_PAGE;

    renderArtists();

});


/* ============================================================
   RETRY
============================================================ */

retryButton.addEventListener("click", () => {

    fetchArtistInformation();

});


/* ============================================================
   INITIALISE
============================================================ */

fetchArtistInformation();

