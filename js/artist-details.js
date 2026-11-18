
/* ============================================================
   API CONFIGURATION
============================================================ */

const LASTFM_API_KEY = "a7ed247179300d8c1860d2caa0aef811";

const MUSICBRAINZ_API = "https://musicbrainz.org/ws/2/artist/";
const LASTFM_API = "https://ws.audioscrobbler.com/2.0/";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

const WIKIPEDIA_SEARCH_API =
    "https://en.wikipedia.org/w/rest.php/v1/search/page";

const WIKIPEDIA_SUMMARY_API =
    "https://en.wikipedia.org/api/rest_v1/page/summary/";


const YOUTUBE_API_KEY =
    "AIzaSyBNV_5iM9L9o6KicU3aJyU2MujJmmuEE5M";
/* ============================================================
   VERIFIED ARTIST INFORMATION
============================================================ */

const artistProfiles = {

    "zahara": {

        name: "Zahara",
        realName: "Bulelwa Mkutukana",
        years: "1987 – 2023",
        identity: "South African Singer-Songwriter",
        genres: ["Afro-soul"],

        biography:
            "Bulelwa Mkutukana, known professionally as Zahara, was a South African singer-songwriter and guitarist from the Eastern Cape. She rose to prominence with her debut album Loliwe in 2011. Her music celebrated South African musical heritage and featured songs in isiXhosa and English.",

        fullBiography: [

            "Bulelwa Mkutukana, known as Zahara, was born on 9 November 1987 in the Eastern Cape. She developed an interest in music at a young age and began singing in her school choir.",

            "Her debut album, Loliwe, was released in 2011 and achieved significant commercial success. Zahara became recognised for her distinctive Afro-soul sound, songwriting and guitar performances.",

            "Throughout her career, Zahara received numerous music awards and became one of South Africa's celebrated contemporary musicians. She died on 11 December 2023 in Johannesburg."

        ],

        source: "City of Johannesburg",

        sourceUrl:
            "https://joburg.org.za/media_/Documents/2023-Media-Statements/City%20mourns%20passing%20of%20%20Zahara.pdf",

        imageSearchName: "Bulelwa Mkutukana Zahara"

    }

};


/* ============================================================
   SOUTH AFRICAN HISTORY ONLINE BIOGRAPHIES

   Curated summaries based on verified SAHO records.
   These are paraphrased, not copied verbatim.
============================================================ */

const sahOProfiles = {

    "brenda-fassie": {

        name: "Brenda Fassie",
        years: "1964 – 2004",
        identity: "South African Pop Singer",

        biography:
            "Brenda Nokuzola Fassie was a South African singer born in Langa, Cape Town. She began singing at a young age and later joined the group Joy before forming Brenda and the Big Dudes. Her 1983 hit Weekend Special achieved major success, including international popularity. She became one of South Africa's most celebrated pop artists. Her music and public image made her an influential figure in South African popular culture.",

        fullBiography: [

            "Brenda Fassie was born on 3 November 1964 in Langa, Cape Town. She developed her singing talent as a child and eventually moved to Johannesburg to pursue a professional music career.",

            "She became widely recognised through Brenda and the Big Dudes and the international success of Weekend Special. Her career continued with popular releases including Memeza and Nomakanjani.",

            "Known for her energetic performances and distinctive voice, Fassie became an influential figure in South African popular music. She died on 9 May 2004."

        ],

        source: "South African History Online",

        sourceUrl:
            "https://sahistory.org.za/people/brenda-nokuzola-fassie"

    },


    "miriam-makeba": {

        name: "Miriam Makeba",
        realName: "Miriam Zenzile Makeba",
        years: "1932 – 2008",
        identity: "South African Singer and Human Rights Campaigner",

        biography:
            "Miriam Makeba was a South African singer and human rights campaigner internationally known as Mama Africa. She became an internationally recognised performer through her music and appearances in the United States. During apartheid, she spoke against racial discrimination and represented South Africa's struggle for freedom on international platforms.",

        fullBiography: [

            "Miriam Zenzile Makeba was born on 4 March 1932 in Johannesburg. Her musical career developed through groups including the Manhattan Brothers and the Skylarks.",

            "Her international career grew after appearing in the film Come Back, Africa and performing in the United States. Her music introduced international audiences to African musical traditions.",

            "During apartheid, Makeba lived in exile after her South African passport was revoked. She became an internationally recognised voice against apartheid and addressed the United Nations.",

            "She returned to South Africa in 1990 and continued performing and supporting humanitarian causes. She died on 9 November 2008 in Italy."

        ],

        source: "South African History Online",

        sourceUrl:
            "https://sahistory.org.za/people/miriam-makeba"

    }

};


/* ============================================================
   GET ARTIST FROM URL
============================================================ */

const urlParameters = new URLSearchParams(window.location.search);

const artistSlug = urlParameters.get("artist") || "";
const artistNameFromUrl = urlParameters.get("name") || "";

const artistGenresFromUrl = (urlParameters.get("genres") || "")
    .split("|")
    .map(genre => genre.trim())
    .filter(Boolean);


/* ============================================================
   PAGE ELEMENTS
============================================================ */

const artistNameElement = document.getElementById("artistName");
const artistYearsElement = document.getElementById("artistYears");
const artistIdentityElement = document.getElementById("artistIdentity");
const artistBiographyElement = document.getElementById("artistBiography");
const artistGenresElement = document.getElementById("artistGenres");
const artistImageElement = document.getElementById("artistImage");

const featuredSongImage = document.getElementById("featuredSongImage");
const featuredSongTitle = document.getElementById("featuredSongTitle");
const featuredSongArtist = document.getElementById("featuredSongArtist");

const artistSongsElement = document.getElementById("artistSongs");
const fullBiographyElement = document.getElementById("fullBiography");
const artistGalleryElement = document.getElementById("artistGallery");

const audioElement = document.getElementById("artistAudio");
const playButton = document.getElementById("playFeaturedSong");

const tabButtons = document.querySelectorAll(".artist-tab");
const tabContents = document.querySelectorAll(".artist-tab-content");


/* ============================================================
   FORMAT ARTIST NAME
============================================================ */

function formatArtistName(slug) {

    return slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

}


function normaliseArtistName(name) {

    return name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, " ");

}


/* ============================================================
   FETCH ARTIST FROM MUSICBRAINZ
============================================================ */

async function fetchMusicBrainzArtist(artistName) {

    try {

        const url = new URL(MUSICBRAINZ_API);

        url.search = new URLSearchParams({

            query: `artist:"${artistName}" AND country:ZA`,
            fmt: "json",
            limit: "10"

        });

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("MusicBrainz request failed.");
        }

        const data = await response.json();

        const requestedName = normaliseArtistName(artistName);

        const match = (data.artists || []).find(artist =>

            normaliseArtistName(artist.name) === requestedName &&
            artist.country === "ZA"

        );

        if (!match) {
            return null;
        }

        const lifespan = match["life-span"] || {};

        return {

            name: match.name,
            mbid: match.id,
            begin: lifespan.begin || "",
            end: lifespan.end || "",
            ended: lifespan.ended || false

        };

    } catch (error) {

        console.error("MusicBrainz error:", error);

        return null;

    }

}


/* ============================================================
   FETCH WIKIPEDIA BIOGRAPHY

   Retrieves an existing published Wikipedia article.
   Does not generate or invent biography information.
============================================================ */

async function fetchWikipediaBiography(artistName) {

    try {

        const searchTerms = [
    `${artistName} South African musician biography`,
    `${artistName} artist profile`,
    `${artistName} about the artist`,
    `${artistName} artist description`,
    `${artistName} career overview`,
    `${artistName} music background`,
    `${artistName} musical journey`,
    `${artistName} discography`
];

        let matchingPage = null;

        const requestedName = normaliseArtistName(artistName);

        /* Search Wikipedia using different music-related terms. */

        for (const searchTerm of searchTerms) {

            const searchUrl = new URL(WIKIPEDIA_SEARCH_API);

            searchUrl.search = new URLSearchParams({

                q: searchTerm,
                limit: "20"

            });

            const searchResponse = await fetch(searchUrl);

            if (!searchResponse.ok) {
                continue;
            }

            const searchData = await searchResponse.json();

            const pages = searchData.pages || [];

            /* Prefer exact artist-name matches. */

            matchingPage = pages.find(page => {

                const title = normaliseArtistName(page.title);

                return title === requestedName;

            });

            /* 
               Some artists have Wikipedia titles such as:
               Thebe (rapper)
               Big Zulu (musician)

               Check the title before the brackets as well.
            */

            if (!matchingPage) {

                matchingPage = pages.find(page => {

                    const baseTitle = normaliseArtistName(
                        page.title.replace(/\s*\([^)]*\)\s*$/, "")
                    );

                    return baseTitle === requestedName;

                });

            }

            if (matchingPage) {
                break;
            }

        }

        if (!matchingPage) {
            return null;
        }


        /* Retrieve the published article summary. */

        const summaryUrl =
            WIKIPEDIA_SUMMARY_API +
            encodeURIComponent(matchingPage.title);

        const summaryResponse = await fetch(summaryUrl);

        if (!summaryResponse.ok) {
            throw new Error("Wikipedia biography request failed.");
        }

        const summary = await summaryResponse.json();

        const biography = (summary.extract || "").trim();

        const description = summary.description || "";

        const verificationText = `${description} ${biography}`;


        /* Check that the article is about music. */

        const isMusicRelated =
            /\b(singer|musician|rapper|songwriter|producer|DJ|disc jockey|band|music group|vocalist|composer|record producer|musical artist)\b/i
                .test(verificationText);


        /* Check that the article relates to South Africa. */

        const isSouthAfrican =
            /\bSouth African|South Africa|South Africa's|born in South Africa\b/i
                .test(verificationText);


        if (
            biography.length < 100 ||
            !isMusicRelated ||
            !isSouthAfrican
        ) {

            return null;

        }


        return {

            biography: biography,

            fullBiography: [biography],

            source: "Wikipedia",

            sourceUrl:
                summary.content_urls?.desktop?.page ||
                `https://en.wikipedia.org/wiki/${encodeURIComponent(matchingPage.title)}`

        };

    } catch (error) {

        console.error("Wikipedia biography error:", error);

        return null;

    }

}


/* ============================================================
   FETCH LAST.FM BIOGRAPHY

   Used as a secondary biography source.
============================================================ */

async function fetchLastFmArtist(artistName, mbid = "") {

    try {

        const url = new URL(LASTFM_API);

        const params = {

            method: "artist.getInfo",
            api_key: LASTFM_API_KEY,
            format: "json"

        };

        if (mbid) {

            params.mbid = mbid;

        } else {

            params.artist = artistName;

        }

        url.search = new URLSearchParams(params);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Last.fm request failed.");
        }

        const data = await response.json();

        if (
            data.error ||
            !data.artist ||
            normaliseArtistName(data.artist.name) !==
            normaliseArtistName(artistName)
        ) {

            return null;

        }

        const biography = data.artist.bio?.summary || "";

        const cleanBiography = biography
            .replace(/<[^>]*>/g, "")
            .replace(/\s+/g, " ")
            .trim();

        if (cleanBiography.length < 80) {
            return null;
        }

        return {

            biography: cleanBiography,

            fullBiography: [cleanBiography],

            source: "Last.fm",

            sourceUrl: data.artist.url || ""

        };

    } catch (error) {

        console.error("Last.fm error:", error);

        return null;

    }

}


/* ============================================================
   FETCH ARTIST PHOTOGRAPHS FROM WIKIMEDIA COMMONS
============================================================ */

async function fetchCommonsImages(searchName) {

    try {

        const searchUrl = new URL(COMMONS_API);

        searchUrl.search = new URLSearchParams({

            action: "query",
            format: "json",
            origin: "*",
            generator: "search",
            gsrsearch: `"${searchName}"`,
            gsrnamespace: "6",
            gsrlimit: "15",
            prop: "imageinfo",
            iiprop: "url|extmetadata",
            iiurlwidth: "900"

        });

        const response = await fetch(searchUrl, {

            headers: {

                "Api-User-Agent":
                    "EchoesOfTheSouth/1.0 (https://github.com/MosebjadiSenama/Echoes-of-the-South)"

            }

        });

        if (!response.ok) {
            throw new Error("Wikimedia Commons request failed.");
        }

        const data = await response.json();

        const pages = Object.values(data.query?.pages || {});

        const requestedTerms = searchName
            .toLowerCase()
            .split(" ")
            .filter(Boolean);

        const images = pages.map(page => {

            const info = page.imageinfo?.[0];

            if (!info) {
                return null;
            }

            const metadata = info.extmetadata || {};

            const description = (
                metadata.ImageDescription?.value || ""
            ).replace(/<[^>]*>/g, " ").toLowerCase();

            const artist = (
                metadata.Artist?.value || ""
            ).replace(/<[^>]*>/g, " ").toLowerCase();

            const title = page.title.toLowerCase();

            const searchableText = `${title} ${description} ${artist}`;

            const matches = requestedTerms.filter(term =>
                searchableText.includes(term)
            ).length;

            if (matches < requestedTerms.length) {
                return null;
            }

            return {

                url: info.thumburl || info.url,

                title: page.title,

                description: description,

                license:
                    metadata.LicenseShortName?.value || "See file page",

                filePage: info.descriptionurl

            };

        }).filter(Boolean);

        return images;

    } catch (error) {

        console.error("Wikimedia Commons error:", error);

        return [];

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
   DISPLAY ARTIST IMAGE
============================================================ */

function displayArtistImage(imageUrl, artistName, imageDescription = "photograph") {

    if (!artistImageElement) {
        return;
    }

    if (!imageUrl) {

        artistImageElement.removeAttribute("src");
        artistImageElement.hidden = true;

        return;

    }

    artistImageElement.hidden = false;

    artistImageElement.alt = `${artistName} ${imageDescription}`;

    artistImageElement.onerror = () => {

        artistImageElement.removeAttribute("src");
        artistImageElement.hidden = true;

    };

    artistImageElement.src = imageUrl;

}


/* ============================================================
   DISPLAY ARTIST PROFILE
============================================================ */

function displayArtistProfile(artist) {

    artistNameElement.textContent = artist.name;

    artistYearsElement.textContent = artist.years || "";

    artistIdentityElement.textContent =
        artist.identity || "South African Music Artist";

    artistBiographyElement.textContent =
        artist.biography ||
        "A verified biography for this artist is not currently available.";

    artistGenresElement.innerHTML = "";

    (artist.genres || []).forEach(genre => {

        const tag = document.createElement("span");

        tag.className = "artist-genre-tag";
        tag.textContent = genre;

        artistGenresElement.appendChild(tag);

    });

    displayArtistImage(artist.image, artist.name);

    displayFullBiography(artist);

}


/* ============================================================
   DISPLAY FULL BIOGRAPHY
============================================================ */

function displayFullBiography(artist) {

    fullBiographyElement.innerHTML = "";

    (artist.fullBiography || []).forEach(paragraph => {

        const paragraphElement = document.createElement("p");

        paragraphElement.textContent = paragraph;

        fullBiographyElement.appendChild(paragraphElement);

    });

    if (!artist.fullBiography?.length && artist.biography) {

        const paragraphElement = document.createElement("p");

        paragraphElement.textContent = artist.biography;

        fullBiographyElement.appendChild(paragraphElement);

    }

    if (artist.sourceUrl) {

        const sourceLink = document.createElement("a");

        sourceLink.href = artist.sourceUrl;
        sourceLink.target = "_blank";
        sourceLink.rel = "noopener noreferrer";

        sourceLink.textContent =
            `Source: ${artist.source || "Artist information"}`;

        sourceLink.className = "artist-source-link";

        fullBiographyElement.appendChild(sourceLink);

    }

    if (!fullBiographyElement.children.length) {

        fullBiographyElement.textContent =
            "More information about this artist will be added.";

    }

}


/* ============================================================
   DISPLAY ARTIST GALLERY
============================================================ */

function displayArtistGallery(images, artistName) {

    artistGalleryElement.innerHTML = "";

    if (!images.length) {

        artistGalleryElement.textContent =
            "No verified photographs are currently available.";

        return;

    }

    images.forEach((item, index) => {

        const container = document.createElement("div");

        container.className = "artist-gallery-image";

        const image = document.createElement("img");

        image.src = item.url;
        image.alt = `${artistName} photograph ${index + 1}`;
        image.loading = "lazy";

        image.onerror = () => {

            container.remove();

        };

        const credit = document.createElement("a");

        credit.href = item.filePage;
        credit.target = "_blank";
        credit.rel = "noopener noreferrer";

        credit.textContent =
            `Image ${index + 1} · ${item.license}`;

        container.append(image, credit);

        artistGalleryElement.appendChild(container);

    });

}


/* ============================================================
   FETCH ARTIST SONGS FROM ITUNES
============================================================ */

async function fetchArtistSongs(artistName) {

    artistSongsElement.innerHTML = "<p>Loading songs...</p>";

    try {

        const url = new URL("https://itunes.apple.com/search");

        url.search = new URLSearchParams({

            term: artistName,
            entity: "song",
            media: "music",
            country: "ZA",
            limit: "50"

        });

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to retrieve songs.");
        }

        const data = await response.json();

        const requestedArtist = normaliseArtistName(artistName);

        const songs = (data.results || []).filter(song => {

            return (

                song.trackName &&
                song.artistName &&
                normaliseArtistName(song.artistName) === requestedArtist

            );

        });

        if (!songs.length) {

            artistSongsElement.innerHTML =
                "<p>No songs are currently available.</p>";

            return [];

        }

        displayArtistSongs(songs);

        return songs;

    } catch (error) {

        console.error("iTunes error:", error);

        artistSongsElement.innerHTML =
            "<p>Unable to load songs. Please try again later.</p>";

        return [];

    }

}


/* ============================================================
   DISPLAY ARTIST SONGS
============================================================ */

function displayArtistSongs(songs) {

    artistSongsElement.innerHTML = "";

    songs.forEach((song, index) => {

        const row = document.createElement("div");

        row.className = "artist-song";

        const button = document.createElement("button");

        button.className = "artist-song-play";
        button.type = "button";
        button.textContent = "▶";

        const title = document.createElement("span");

        title.className = "artist-song-name";
        title.textContent = song.trackName;

        const duration = document.createElement("span");

        duration.className = "artist-song-duration";

        duration.textContent = song.trackTimeMillis
            ? formatSongDuration(song.trackTimeMillis)
            : "--:--";

        button.addEventListener("click", () => playSong(song));

        row.append(button, title, duration);

        artistSongsElement.appendChild(row);

        if (index === 0) {
            displayFeaturedSong(song);
        }

    });

}


/* ============================================================
   FORMAT SONG DURATION
============================================================ */

function formatSongDuration(milliseconds) {

    const totalSeconds = Math.floor(milliseconds / 1000);

    const minutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;

    return `${minutes}:${String(seconds).padStart(2, "0")}`;

}


/* ============================================================
   DISPLAY FEATURED SONG
============================================================ */

function displayFeaturedSong(song) {

    featuredSongTitle.textContent = song.trackName;

    featuredSongArtist.textContent = song.artistName;

    if (song.artworkUrl100) {

        featuredSongImage.hidden = false;

        featuredSongImage.src =
            song.artworkUrl100.replace("100x100", "500x500");

    } else {

        featuredSongImage.removeAttribute("src");
        featuredSongImage.hidden = true;

    }

    audioElement.pause();

    audioElement.src = song.previewUrl || "";

    playButton.disabled = !song.previewUrl;

    playButton.textContent = "▶";

}


/* ============================================================
   PLAY SONG
============================================================ */

async function playSong(song) {

    if (!song.previewUrl) {
        return;
    }

    audioElement.pause();

    audioElement.src = song.previewUrl;

    featuredSongTitle.textContent = song.trackName;

    featuredSongArtist.textContent = song.artistName;

    if (song.artworkUrl100) {

        featuredSongImage.hidden = false;

        featuredSongImage.src =
            song.artworkUrl100.replace("100x100", "500x500");

    }

    playButton.disabled = false;

    try {

        await audioElement.play();

    } catch (error) {

        console.error("Audio playback error:", error);

    }

}


/* ============================================================
   FEATURED SONG PLAYER
============================================================ */

playButton.addEventListener("click", async () => {

    if (!audioElement.src) {
        return;
    }

    if (audioElement.paused) {

        try {

            await audioElement.play();

        } catch (error) {

            console.error("Playback error:", error);

        }

    } else {

        audioElement.pause();

    }

});


audioElement.addEventListener("ended", () => {

    playButton.textContent = "▶";

});


audioElement.addEventListener("pause", () => {

    playButton.textContent = "▶";

});


audioElement.addEventListener("play", () => {

    playButton.textContent = "Ⅱ";

});


/* ============================================================
   ARTIST PROFILE TABS
============================================================ */

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedTab = button.dataset.tab;

        tabButtons.forEach(tab => {

            tab.classList.remove("active");

        });

        tabContents.forEach(content => {

            content.classList.remove("active");
            content.hidden = true;

        });

        button.classList.add("active");

        const selectedContent = document.getElementById(
            `${selectedTab}Content`
        );

        if (selectedContent) {

            selectedContent.classList.add("active");
            selectedContent.hidden = false;

        }

    });

});


/* ============================================================
   INITIALISE ARTIST PROFILE
============================================================ */

async function initialiseArtistProfile() {

    if (!artistSlug) {

        artistNameElement.textContent = "Artist not found";

        artistBiographyElement.textContent =
            "Please return to the Artists page and select an artist.";

        artistSongsElement.innerHTML = "";

        return;

    }

    const savedProfile = artistProfiles[artistSlug];

    const sahOProfile = sahOProfiles[artistSlug];

    const artistName =
        sahOProfile?.name ||
        savedProfile?.name ||
        artistNameFromUrl ||
        formatArtistName(artistSlug);

    document.title = `${artistName} | Echoes of the South`;

    artistNameElement.textContent = artistName;

    artistBiographyElement.textContent =
        "Loading artist information...";

    let artist = {

        name: artistName,

        years: "",

        identity: "South African Music Artist",

        biography: "",

        genres: artistGenresFromUrl,

        fullBiography: [],

        image: null,

        source: "",

        sourceUrl: ""

    };


    /* ============================================================
       MUSICBRAINZ ARTIST INFORMATION
    ============================================================ */

    const verifiedArtist =
        await fetchMusicBrainzArtist(artistName);

    if (verifiedArtist) {    
    }


    /* ============================================================
       BIOGRAPHY SOURCE PRIORITY

       1. Curated verified profiles
       2. Wikipedia published biography
       3. Last.fm biography
    ============================================================ */

    if (savedProfile) {

        artist = {

            ...artist,
            ...savedProfile

        };

    } else if (sahOProfile) {

        artist = {

            ...artist,
            ...sahOProfile

        };

    } else {

        const wikipediaData =
            await fetchWikipediaBiography(artistName);

        if (wikipediaData) {

            artist.biography = wikipediaData.biography;

            artist.fullBiography = wikipediaData.fullBiography;

            artist.source = wikipediaData.source;

            artist.sourceUrl = wikipediaData.sourceUrl;

        }

        /* Try Last.fm only if Wikipedia has no suitable biography. */

        if (!artist.biography) {

            const lastFmData = await fetchLastFmArtist(
                artistName,
                verifiedArtist?.mbid || ""
            );

            if (lastFmData) {

                artist.biography = lastFmData.biography;

                artist.fullBiography = lastFmData.fullBiography;

                artist.source = lastFmData.source;

                artist.sourceUrl = lastFmData.sourceUrl;

            }

        }

    }


    /* ============================================================
       PRIORITISE GENRES FROM ARTIST LISTING
    ============================================================ */

    if (artistGenresFromUrl.length) {

        artist.genres = artistGenresFromUrl;

    }


    /* ============================================================
       FETCH ARTIST PHOTOGRAPHS
    ============================================================ */

    const imageSearchName =
        savedProfile?.imageSearchName || artistName;

    const images = await fetchCommonsImages(imageSearchName);

    if (images.length) {

        artist.image = images[0].url;

    }


    /* ============================================================
       DISPLAY ARTIST PROFILE
    ============================================================ */

    displayArtistProfile(artist);

    displayArtistGallery(images.slice(0, 6), artistName);


    /* ============================================================
       FETCH SONGS AND ALBUM ARTWORK FALLBACK
    ============================================================ */

    const songs = await fetchArtistSongs(artistName);

    if (!artist.image && songs.length) {

        const albumArtwork = songs.find(song => song.artworkUrl100);

        if (albumArtwork) {

            const artworkUrl = albumArtwork.artworkUrl100.replace(
                "100x100",
                "600x600"
            );

            displayArtistImage(
                artworkUrl,
                artistName,
                "album artwork"
            );

        }

    }

}


/* ============================================================
   START PAGE
============================================================ */

initialiseArtistProfile();
