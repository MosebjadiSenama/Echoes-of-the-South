

/* =========================================================
   1. SOUTH AFRICAN MUSIC GENRE DATA
   ========================================================= */

const genres = [
    {
        name: "Maskandi",
        category: "traditional",
        description: "Born from the journeys and experiences of Zulu migrant workers, Maskandi is a musical diary of everyday life. Driven by intricate guitar melodies and expressive vocals, it carries stories of love, hardship, identity and the rhythms of home.",
        image: "../Assets/genres/Maskandi.webp"
    },
    {
        name: "Lekompo",
        category: "dance",
        description: "Straight from Limpopo, Lekompo is a high-energy sound where local identity meets fearless electronic production. With infectious rhythms, bold vocals and dance-floor energy, it captures the spirit of a new generation making its own musical rules.",
        image: "../Assets/genres/Lekompo.webp"
    },
    {
        name: "Gqom",
        category: "dance",
        description: "Born in the townships of Durban, Gqom makes its presence felt through heavy bass, raw percussion and hypnotic rhythms. Stripped back yet impossible to ignore, its unmistakable sound transformed underground street parties into a global dance movement.",
        image: "../Assets/genres/gqom.jpg"
    },
    {
        name: "Isicathamiya",
        category: "traditional",
        description: "Built on the power of the human voice, Isicathamiya brings together intricate harmonies, gentle movements and deeply expressive performances. Rooted in Zulu musical traditions, its sound carries stories of community, belonging, faith and cultural pride.",
        image: "../Assets/genres/Mbube.jpeg"
    },
    {
        name: "Marabi",
        category: "township",
        description: "The soundtrack of early urban township nightlife, Marabi grew from lively piano melodies, jazz influences and African rhythms. Its infectious sound filled shebeens and social spaces, creating a musical culture that helped shape South African popular music.",
        image: "../assets/genres/Marabi.jpeg"
    },
    {
        name: "Mbaqanga",
        category: "traditional",
        description: "Mbaqanga is a vibrant meeting of traditional African melodies, electric guitars, basslines and irresistible vocal harmonies. With its unmistakable groove, it became one of South Africa's defining popular sounds, bringing communities together through music and dance.",
        image: "../Assets/genres/Mbaqanga.jpeg"
    },
    {
        name: "Kwela",
        category: "township",
        description: "With a pennywhistle at its heart, Kwela brought a playful new rhythm to the streets of South Africa. Its lively melodies, bouncing beats and unmistakable township character made it a sound of everyday celebration and urban musical creativity.",
        image: "../Assets/genres/Kwela.jpg"
    },
    {
        name: "Reggae",
        category: "pop",
        description: "In South Africa, reggae became more than a rhythm. Through deep basslines, steady grooves and socially conscious lyrics, artists used the genre to speak about freedom, justice, love and the realities of everyday life.",
        image: "../Assets/images/lucky dube.jpeg"
    },
    {
        name: "Kwaito",
        category: "township",
        description: "The sound of the youth. Born in the townships of post-apartheid South Africa, Kwaito gave a generation its own soundtrack, blending slowed-down house beats, deep basslines, local slang and unapologetic attitude. More than music, it became a statement of freedom, identity and a new South African youth culture.",
        image: "../Assets/genres/Kwaito.webp"
    },
    {
        name: "Bubblegum",
        category: "township",
        description: "Bright, bold and impossible to forget, South African Bubblegum brought colourful pop melodies and irresistible dance rhythms into homes and onto dance floors during the 1980s. Its catchy hooks and larger-than-life performers created a sound that still sparks nostalgia.",
        image: "../Assets/genres/Bubblegum.webp"
    },
    {
        name: "South African Jazz",
        category: "jazz",
        description: "South African Jazz is a powerful conversation between African musical traditions and global jazz influences. Through improvisation, rich harmonies and fearless experimentation, musicians have used the genre to express identity, resistance, memory and creative freedom.",
        image: "../Assets/genres/jazz.jpeg"
    },
    {
        name: "Gospel",
        category: "gospel",
        description: "Rooted in faith and collective expression, South African Gospel brings together soaring vocals, uplifting harmonies and African rhythms. From intimate spiritual moments to powerful choir performances, its music celebrates hope, resilience, worship and community.",
        image: "../Assets/genres/Gospel.jpeg"
    },
    {
        name: "Motswako",
        category: "hip-hop",
        description: "Motswako reshaped South African hip-hop by bringing Setswana and English together with local slang, sharp lyricism and confident storytelling. Proudly rooted in local identity, it gave artists a platform to speak in their own voices and define their own sound.",
        image: "../Assets/genres/Motswako.jpeg"
    },
    {
        name: "Amapiano",
        category: "dance",
        description: "From South African townships to dance floors around the world, Amapiano has become a global movement. Its signature log drums, deep basslines, soulful keys and laid-back grooves create a sound that is instantly recognisable and endlessly danceable.",
        image: "../Assets/genres/Amapiano.jpeg"
    },
    {
        name: "South African House",
        category: "dance",
        description: "South African House takes the pulse of global house music and gives it a distinctly local identity. Layered percussion, soulful vocals and African-inspired rhythms create immersive grooves that have carried South African DJs and producers onto international stages.",
        image: "../assets/genres/SA house.jpeg"
    },
    {
        name: "Bacardi",
        category: "dance",
        description: "Born in Pretoria's vibrant dance culture, Bacardi is driven by rapid-fire rhythms, energetic percussion and unmistakable street-party spirit. Its infectious beats and expressive dance style have made it a defining sound of the capital's musical identity.",
        image: "../Assets/genres/Barcadi.jpeg"
    },
    {
        name: "Afro-pop",
        category: "pop",
        description: "Afro-pop brings African musical influences into contemporary popular music through memorable melodies, expressive vocals and modern production. Moving between soulful ballads and upbeat anthems, it reflects the changing sounds, stories and experiences of South African life.",
        image: "../Assets/genres/Afro-pop.jpeg"
    }
];



/* =========================================================
   2. SHARED ELEMENTS
   ========================================================= */

const genreGrid = document.getElementById("genreGrid");
const genreSearch = document.getElementById("genreSearch");
const genreCount = document.getElementById("genreCount");

const genreNameElement = document.getElementById("genreName");
const genreDescriptionElement = document.getElementById("genreDescription");
const genreEraElement = document.getElementById("genreEra");
const genreOverviewElement = document.getElementById("genreOverview");
const genreTracksElement = document.getElementById("genreTracks");

const genreAudio = document.getElementById("genreAudio");

const genreVinyl = document.getElementById("genreVinyl");
const playGenreButton = document.getElementById("playGenreButton");
const vinylPlayButton = document.getElementById("vinylPlayButton");
const playGenreIcon = document.getElementById("playGenreIcon");
const playGenreText = document.getElementById("playGenreText");
const vinylCover = document.getElementById("vinylCover");

const PREVIEW_DURATION = 30;

let activeTrackUrl = null;


/* =========================================================
   8. ITUNES MUSIC SEARCH
   ========================================================= */

const southAfricanGenreArtists = {
    "Maskandi": [
        "Phuzekhemisi",
        "Bhekumuzi Luthuli",
        "Khuzani",
        "Mthandeni SK",
        "Mtshengiseni Gcwensa"
    ],

    "Lekompo": [
        "Shebeshxt",
        "Shandesh",
        "Kharishma",
        "Makhadzi",
        "King Monada"
    ],

    "Gqom": [
        "DJ Lag",
        "Babes Wodumo",
        "Distruction Boyz",
        "Dladla Mshunqisi",
        "Rudeboyz"
    ],

    "Isicathamiya": [
        "Ladysmith Black Mambazo",
        "Thee Legacy",
        "Amadodana Ase Wesile"
    ],

    "Marabi": [
        "Dolly Rathebe",
        "Miriam Makeba",
        "Mackay Davashe",
        "The Manhattan Brothers"
    ],

    "Mbaqanga": [
        "Mahotella Queens",
        "Mahlathini",
        "The Soul Brothers",
        "Stimela",
        "West Nkosi"
    ],

    "Kwela": [
        "Spokes Mashiyane",
        "Lemmy Mabaso",
        "Casper Temba"
    ],

    "Reggae": [
        "Lucky Dube",
        "Colbert Mukwevho",
        "Carlos Djedje",
        "O'Yaba",
        "Nkulee Dube"
    ],

    "Kwaito": [
        "TKZee",
        "Mandoza",
        "Bongo Maffin",
        "Boom Shaka",
        "Arthur Mafokate",
        "Zola",
        "Trompies"
    ],

    "Bubblegum": [
        "Brenda Fassie",
        "Yvonne Chaka Chaka",
        "Sipho Hotstix Mabuse",
        "Penny Penny",
        "Dan Tshanda"
    ],

    "South African Jazz": [
        "Hugh Masekela",
        "Abdullah Ibrahim",
        "Bheki Mseleku",
        "Zim Ngqawana",
        "Jonas Gwangwa"
    ],

    "Gospel": [
        "Rebecca Malope",
        "Joyous Celebration",
        "Benjamin Dube",
        "Lundi Tyamara",
        "Khaya Mthethwa"
    ],

    "Motswako": [
        "HHP",
        "Khuli Chana",
        "Tuks Senganga",
        "Mo'Molemi"
    ],

    "Amapiano": [
        "Kabza De Small",
        "Kelvin Momo",
        "MFR Souls",
        "DBN Gogo",
        "De Mthuda",
        "Mas Musiq",
        "Busta 929",
        "Sam Deep"
    ],

    "South African House": [
        "Black Coffee",
        "Oskido",
        "Culoe De Song",
        "DJ Zinhle",
        "Da Capo",
        "Liquideep",
        "Shimza"
    ],

    "Barcadi": [
        "Pcee",
        "Mr JazziQ",
        "Tman Xpress",
        "Reece Madlisa",
        "Zuma",
        "Vigro Deep"
    ],

    "Afro-pop": [
        "Mafikizolo",
        "Zahara",
        "Lira",
        "Amanda Black",
        "Vusi Nova",
        "Kelly Khumalo"
    ]
};

/* =========================================================
   3. SAFE TEXT / HTML HELPERS
   ========================================================= */

function escapeTrackText(text) {

    return String(text || "").replace(/[&<>"']/g, character => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"

    })[character]);

}


/* Format seconds as minutes and seconds */

function formatPlaybackTime(seconds) {

    const safeSeconds = Math.max(0, Math.floor(seconds));

    const minutes = Math.floor(safeSeconds / 60);

    const remainingSeconds = safeSeconds % 60;

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;

}


/* =========================================================
   4. DISPLAY GENRE CARDS
   ========================================================= */


function displayGenres(genreList) {

    if (!genreGrid) return;

    // Update the genre count
    if (genreCount) {
        genreCount.textContent = `${genreList.length} GENRES`;
    }


    //
    const loadingStatus = document.getElementById("genreLoading");

if (loadingStatus) {
    loadingStatus.style.display = "none";
}

const emptyState = document.getElementById("genreEmpty");

if (emptyState) {
    emptyState.hidden = genreList.length !== 0;
}

    if (genreList.length === 0) {

        genreGrid.innerHTML = `
            <p class="no-genres">
                No genres found. Try another filter.
            </p>
        `;

        return;
    }

    genreGrid.innerHTML = genreList.map(genre => `

        <a
            href="genre-details.html?genre=${encodeURIComponent(genre.name)}"
            class="genre-card"
            data-category="${escapeTrackText(genre.category)}"
        >

            <div class="genre-card-image">

                <img
                    src="${escapeTrackText(genre.image)}"
                    alt="${escapeTrackText(genre.name)} music"
                    loading="lazy"
                    onerror="this.style.display='none';"
                >

            </div>

            <div class="genre-card-content">

              <h3>${escapeTrackText(genre.name)}</h3>

                 <span class="genre-card-arrow" aria-hidden="true">
                 ↗
              </span>

            </div>

        </a>

    `).join("");

  animateGenreCards(); 
}

function animateGenreCards() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);
//
    ScrollTrigger.getAll().forEach(trigger => {
        if (genreGrid.contains(trigger.trigger)) {
            trigger.kill();
        }
    });

    const cards = gsap.utils.toArray(
        genreGrid.querySelectorAll(".genre-card")
    );

    gsap.set(cards, {
        opacity: 0,
        y: 35
    });

    ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: batch => {
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out",
                overwrite: true
            });
        }
    });

    ScrollTrigger.refresh();
}
/* =========================================================
   5. INITIALISE GENRE CARDS
   ========================================================= */

if (genreGrid) {

    displayGenres(genres);

}
/* =========================================================
   GENRE SEARCH
========================================================= */

let searchScrollTimeout;

if (genreSearch && genreGrid) {
    genreSearch.addEventListener("input", event => {
        clearTimeout(searchScrollTimeout);

        if (event.target.value.trim().length > 0) {
            searchScrollTimeout = setTimeout(() => {
                genreGrid.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 500);
        }
    });
}

/* =========================================================
   6. GENRE CATEGORY FILTERS
   ========================================================= */

const filterButtons = document.querySelectorAll(".genre-buttons button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const searchTerm = genreSearch?.value.trim().toLowerCase() || "";

const filteredGenres = genres.filter(genre => {

    const matchesSearch =
        genre.name.toLowerCase().includes(searchTerm) ||
        genre.description.toLowerCase().includes(searchTerm);

    const matchesCategory =
        selectedCategory === "all" ||
        genre.category === selectedCategory;

    return matchesSearch && matchesCategory;

});

displayGenres(filteredGenres);

    });

});


/* =========================================================
   7. GENRE DETAILS PAGE
   ========================================================= */

if (genreNameElement && !genreGrid) {

    const params = new URLSearchParams(window.location.search);

    const selectedGenreName = params.get("genre");

    const selectedGenre = genres.find(
        genre => genre.name.toLowerCase() ===
        (selectedGenreName || "").toLowerCase()
    );

    if (selectedGenre) {

        document.title = `${selectedGenre.name} | Echoes of the South`;

        genreNameElement.textContent = selectedGenre.name;

        if (vinylCover) {
    vinylCover.src = selectedGenre.image;
    vinylCover.alt = `${selectedGenre.name} genre artwork`;
}

        if (genreDescriptionElement) {
            genreDescriptionElement.textContent = selectedGenre.description;
        }

        if (genreEraElement) {
            genreEraElement.textContent = "SOUTH AFRICAN MUSIC";
        }

        if (genreOverviewElement) {


        }

        loadGenreTracks(selectedGenre.name);

    } else {

        genreNameElement.textContent = "Genre not found";

        if (genreDescriptionElement) {

            genreDescriptionElement.textContent =
                "Please return to the genres page and select a genre.";

        }

        if (genreTracksElement) {
            genreTracksElement.innerHTML = "";
        }

    }

}


//

function searchITunes(params) {
    return new Promise((resolve, reject) => {
        const callbackName =
            "itunesCallback_" + Date.now() + "_" +
            Math.random().toString(36).slice(2);

        const script = document.createElement("script");
        const url = new URL("https://itunes.apple.com/search");

        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });

        url.searchParams.set("callback", callbackName);

        const timeout = setTimeout(() => {
            cleanup();
            reject(new Error("iTunes request timed out"));
        }, 12000);

        function cleanup() {
            clearTimeout(timeout);
            delete window[callbackName];
            script.remove();
        }

        window[callbackName] = (data) => {
            cleanup();
            resolve(data);
        };

        script.onerror = () => {
            cleanup();
            reject(new Error("Could not load iTunes results"));
        };

        script.src = url.toString();
        document.body.appendChild(script);
    });
}


async function loadGenreTracks(genreName) {
    if (!genreTracksElement) return;

    genreTracksElement.innerHTML = "<p>Finding songs...</p>";

    // Match the selected genre to its recognised South African artists.
    const genreKey = genreName === "Bacardi" ? "Barcadi" : genreName;
    const artists = southAfricanGenreArtists[genreKey] || [];

    if (!artists.length) {
        genreTracksElement.innerHTML =
            "<p>No artists are currently listed for this genre.</p>";
        return;
    }

    // Normalise names to make artist matching more reliable.
    const normaliseArtist = name =>
        String(name || "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

    try {
        // Search iTunes separately for each artist.
        const results = await Promise.allSettled(
            artists.map(async artist => {
                const data = await searchITunes({
    term: artist,
    country: "ZA",
    media: "music",
    entity: "song",
    limit: "20"
});
            
const expectedArtist = normaliseArtist(artist);

return (data.results || []).filter(track => {
    if (
        !track.previewUrl ||
        !track.trackId ||
        !track.artistName
    ) {
        return false;
    }

    // Separate individual artists in collaborations.
    const artistNames = track.artistName.split(
        /\s+(?:feat\.?|featuring|ft\.?|with|x|vs\.?)\s+|[,/&;]/i
    );

    // Only accept a complete artist-name match.
    return artistNames.some(
        name => normaliseArtist(name.trim()) === expectedArtist
    );
});

            })
        );

        
// Collect songs separately for each artist.
const tracksByArtist = results.map(result => {
    if (result.status !== "fulfilled") return [];

    return result.value;
});

// Mix songs from different artists.
const uniqueTracks = [];
const seenTrackIds = new Set();

const maxSongsPerArtist = 2;
const maxTracks = 5;

for (let round = 0; round < maxSongsPerArtist; round++) {
    for (const artistTracks of tracksByArtist) {
        const track = artistTracks[round];

        if (!track || seenTrackIds.has(track.trackId)) continue;

        seenTrackIds.add(track.trackId);
        uniqueTracks.push(track);

        if (uniqueTracks.length >= maxTracks) break;
    }

    if (uniqueTracks.length >= maxTracks) break;
}

const tracks = uniqueTracks;


        if (!tracks.length) {
            genreTracksElement.innerHTML =
                "<p>No playable songs were found for this genre.</p>";
            return;
        }

        const waveformHeights = [
            8, 15, 22, 12, 28,
            18, 32, 14, 24, 36,
            20, 30, 16, 26, 12,
            34, 19, 28, 14, 22,
            10, 30, 17, 25, 13,
            32, 18, 24, 11, 20,
            27, 13, 31, 17, 23,
            10, 29, 16, 25, 12,
            34, 19, 27, 14, 22
        ];

        genreTracksElement.innerHTML = tracks.map((track, index) => {
            const fullTrackUrl = track.trackViewUrl ||
                `https://music.apple.com/za/search?term=${encodeURIComponent(
                    track.trackName + " " + track.artistName
                )}`;

            return `
                <article
                    class="track-card"
                    data-audio="${escapeTrackText(track.previewUrl)}"
                    data-track-id="${track.trackId}"
                    data-full-url="${escapeTrackText(fullTrackUrl)}"
                >
                    <span class="track-number">
                        ${String(index + 1).padStart(2, "0")}
                    </span>

                    <img
                        class="track-artwork"
                        src="${escapeTrackText(track.artworkUrl100 || "")}"
                        alt="${escapeTrackText(track.trackName)} artwork"
                        loading="lazy"
                    >

                    <div class="track-info">
                        <h3>${escapeTrackText(track.trackName)}</h3>

                        <p class="track-artist">
                            ${escapeTrackText(track.artistName)}
                        </p>

                        <span class="preview-duration">
                            30 SECOND PREVIEW
                        </span>
                    </div>

                    <div class="track-player">
                        <button
                            class="track-play-button"
                            type="button"
                            aria-label="Play song"
                        >
                            ▶
                        </button>

                        <span class="current-time">0:00</span>

                        <div
                            class="track-waveform"
                            aria-label="Song playback progress"
                        >
                            ${waveformHeights.map(height => `
                                <span style="--bar-height: ${height}px"></span>
                            `).join("")}
                        </div>

                        <span class="remaining-time">-0:30</span>

                        <a
                            class="apple-music-link"
                            href="${escapeTrackText(fullTrackUrl)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Listen on Apple Music"
                            title="Listen on Apple Music"
                        >
                            <img
                               src="https://cdn.simpleicons.org/applemusic/FFFFFF"
                               alt=""
                               class="apple-music-logo"
                              >
                             <span>Music</span>
                                <path
                                    fill="currentColor"
                                    d="M36 15c-7-1-13 4-17 4s-9-4-15-3C-4 18-9 25-9 35c0 13 10 29 19 29 5 0 8-3 13-3s8 3 13 3c9 0 18-15 20-25-12-5-14-20-2-27-5-7-12-8-18-7zm-2-9c4-5 4-10 4-12-5 1-11 4-14 9-3 4-4 9-3 12 5 1 10-3 13-9z"
                                    transform="translate(12 7) scale(1.15)"
                                />
                                <text
                                    x="65"
                                    y="53"
                                    fill="currentColor"
                                    font-family="Arial, Helvetica, sans-serif"
                                    font-size="53"
                                    font-weight="700"
                                    letter-spacing="1"
                                >MUSIC</text>
                            </svg>
                        </a>
                    </div>
                </article>
            `;
        }).join("");
        animateGenreCards();

        //  player functionality.
        genreTracksElement.querySelectorAll(".track-card").forEach(card => {
            const playButton = card.querySelector(".track-play-button");

            playButton.addEventListener("click", () => {
                playTrack(card);
            });
        });

        updateTrackButtons();
        updateTrackProgress();

    } catch (error) {
        console.error("Error loading genre music:", error);

        genreTracksElement.innerHTML = `
            <p class="error-message">
                Music could not load. Please check your internet connection and try again.
            </p>
        `;
    }
}

// FULL SONG POPUP
function showFullSongPopup(card) {
    if (!card || card.dataset.popupShown === "true") return;

    const title = card.querySelector(".track-info h3")?.textContent || "This song";
    const artist = card.querySelector(".track-artist")?.textContent || "";
    const artwork = card.querySelector(".track-artwork")?.src || "";
    const fullUrl = card.dataset.fullUrl;

    if (!fullUrl) return;

    card.dataset.popupShown = "true";

    document.querySelector(".full-song-popup")?.remove();

    const popup = document.createElement("div");
    popup.className = "full-song-popup";

    popup.innerHTML = `
        <div class="full-song-popup-content">

            <button class="full-song-popup-close" type="button" aria-label="Close">
                &times;
            </button>

            <img src="${escapeTrackText(artwork)}" alt="" class="full-song-popup-artwork">

            <span class="full-song-popup-label">ENJOYED THE PREVIEW?</span>

            <h2>Keep the music going.</h2>

            <p class="full-song-popup-track">${escapeTrackText(title)}</p>
            <p class="full-song-popup-artist">${escapeTrackText(artist)}</p>

            <a
                href="${escapeTrackText(fullUrl)}"
                target="_blank"
                rel="noopener noreferrer"
                class="full-song-popup-button"
            >
                Listen to the full song
                <span aria-hidden="true">↗</span>
            </a>

            <button class="full-song-popup-dismiss" type="button">
                Maybe later
            </button>

        </div>
    `;

    document.body.appendChild(popup);

    const closePopup = () => popup.remove();

    popup.querySelector(".full-song-popup-close")
        .addEventListener("click", closePopup);

    popup.querySelector(".full-song-popup-dismiss")
        .addEventListener("click", closePopup);

    popup.addEventListener("click", event => {
        if (event.target === popup) closePopup();
    });
}
/* =========================================================
   9. TRACK PLAYBACK
   ========================================================= */

async function playTrack(card) {

    if (!genreAudio || !card) return;

    const audioUrl = card.dataset.audio;

    const trackImage = card.querySelector(".track-artwork");

    if (!audioUrl) return;
// Scroll back to the vinyl player when a song is selected.
genreVinyl?.scrollIntoView({
    behavior: "smooth",
    block: "center"
});

    try {

        // Same track: pause or resume

        if (activeTrackUrl === audioUrl) {

            if (!genreAudio.paused) {

                genreAudio.pause();

                return;

            }

            if (genreAudio.currentTime >= PREVIEW_DURATION) {

                genreAudio.currentTime = 0;

            }

            await genreAudio.play();

            return;

        }

        // Different track: load and play

        genreAudio.pause();

        activeTrackUrl = audioUrl;

        genreAudio.dataset.activeTrack = audioUrl;

        genreAudio.src = audioUrl;

        genreAudio.currentTime = 0;

        if (vinylCover && trackImage) {

            vinylCover.src = trackImage.src;

        }

        genreAudio.load();

        updateTrackProgress();

        await genreAudio.play();

    } catch (error) {

        console.error("Preview playback failed:", error);

    }

}


/* =========================================================
   10. UPDATE PLAY / PAUSE BUTTONS
   ========================================================= */

function updateTrackButtons() {

    if (!genreAudio) return;

    document.querySelectorAll(".track-card").forEach(card => {

        const button = card.querySelector(".track-play-button");

        const waveform = card.querySelector(".track-waveform");

        if (!button) return;

        const isCurrentTrack =
            activeTrackUrl === card.dataset.audio;

        const isPlaying =
            isCurrentTrack &&
            !genreAudio.paused &&
            !genreAudio.ended;

        button.textContent = isPlaying ? "Ⅱ" : "▶";

        button.setAttribute(
            "aria-label",
            isPlaying ? "Pause song" : "Play song"
        );

        waveform?.classList.toggle("active", isPlaying);

        card.classList.toggle("playing", isPlaying);

    });

}


/* =========================================================
   11. UPDATE TRACK TIME AND WAVEFORM
   ========================================================= */

function updateTrackProgress() {

    if (!genreAudio) return;

    const currentTime = Math.min(
        genreAudio.currentTime || 0,
        PREVIEW_DURATION
    );

    const remainingTime = Math.max(
        0,
        PREVIEW_DURATION - currentTime
    );

    const progress = currentTime / PREVIEW_DURATION;

    document.querySelectorAll(".track-card").forEach(card => {

        const currentLabel = card.querySelector(".current-time");

        const remainingLabel = card.querySelector(".remaining-time");

        const waveform = card.querySelector(".track-waveform");

        if (!currentLabel || !remainingLabel || !waveform) return;

        const isCurrentTrack =
            activeTrackUrl === card.dataset.audio;

        if (!isCurrentTrack) {

            currentLabel.textContent = "0:00";

            remainingLabel.textContent = "-0:30";

            waveform.querySelectorAll("span").forEach(bar => {

                bar.classList.remove("played");

            });

            return;

        }

        currentLabel.textContent =
            formatPlaybackTime(currentTime);

        remainingLabel.textContent =
            `-${formatPlaybackTime(remainingTime)}`;

        const bars = waveform.querySelectorAll("span");

        const playedBars = Math.floor(progress * bars.length);

        bars.forEach((bar, index) => {

            bar.classList.toggle(
                "played",
                index < playedBars
            );

        });

    });

}


/* =========================================================
   12. AUDIO EVENT LISTENERS
   REGISTERED ONLY ONCE
   ========================================================= */

if (genreAudio) {

    genreAudio.addEventListener("play", () => {

        updateTrackButtons();

    });

    genreAudio.addEventListener("pause", () => {

        updateTrackButtons();

    });

    genreAudio.addEventListener("ended", () => {

        updateTrackButtons();

        updateTrackProgress();

    });

genreAudio.addEventListener("timeupdate", () => {

    if (genreAudio.currentTime >= PREVIEW_DURATION) {

        genreAudio.currentTime = PREVIEW_DURATION;

        const currentCard = [...document.querySelectorAll(".track-card")]
            .find(card => card.dataset.audio === activeTrackUrl);

        genreAudio.pause();

        updateTrackProgress();
        updateTrackButtons();

        showFullSongPopup(currentCard);

        return;
    }

    updateTrackProgress();

});


    genreAudio.addEventListener("loadedmetadata", () => {

        updateTrackProgress();

    });

}


/* =========================================================
   13. VINYL PLAYER
   ========================================================= */

async function toggleGenreMusic() {

    if (!genreAudio || !genreVinyl) return;

    // Pause currently playing music

    if (!genreAudio.paused) {

        genreAudio.pause();

        return;

    }

    // If no track is selected, play the first track

    if (!activeTrackUrl) {

        const firstTrack =
            genreTracksElement?.querySelector(".track-card");

        if (!firstTrack) {

            alert("No music preview is available for this genre yet.");

            return;

        }

        activeTrackUrl = firstTrack.dataset.audio;

        genreAudio.dataset.activeTrack = activeTrackUrl;

        genreAudio.src = activeTrackUrl;

        genreAudio.currentTime = 0;

        const trackImage = firstTrack.querySelector(".track-artwork");

        if (vinylCover && trackImage) {

            vinylCover.src = trackImage.src;

        }

        genreAudio.load();

    }

    // Restart if the preview has finished

    if (genreAudio.currentTime >= PREVIEW_DURATION) {

        genreAudio.currentTime = 0;

    }

    try {

        await genreAudio.play();

    } catch (error) {

        console.error("Could not play the music preview:", error);

    }

}


playGenreButton?.addEventListener("click", toggleGenreMusic);

vinylPlayButton?.addEventListener("click", toggleGenreMusic);


/* =========================================================
   14. SYNCHRONISE VINYL WITH AUDIO
   ========================================================= */

if (genreAudio) {

    genreAudio.addEventListener("play", () => {

        genreVinyl?.classList.add("is-playing");

        if (playGenreIcon) {
            playGenreIcon.textContent = "Ⅱ";
        }

        if (playGenreText) {
            playGenreText.textContent = "Pause music";
        }

        if (vinylPlayButton) {
            vinylPlayButton.textContent = "Ⅱ";
        }

    });

    genreAudio.addEventListener("pause", () => {

        genreVinyl?.classList.remove("is-playing");

        if (playGenreIcon) {
            playGenreIcon.textContent = "▶";
        }

        if (playGenreText) {
            playGenreText.textContent = "Listen to the sound";
        }

        if (vinylPlayButton) {
            vinylPlayButton.textContent = "▶";
        }

    });

    genreAudio.addEventListener("ended", () => {

        genreVinyl?.classList.remove("is-playing");

        if (playGenreIcon) {
            playGenreIcon.textContent = "▶";
        }

        if (playGenreText) {
            playGenreText.textContent = "Listen to the sound";
        }

        if (vinylPlayButton) {
            vinylPlayButton.textContent = "▶";
        }

    });

}


/* =========================================================
   15. GENRE DETAILS NAVIGATION
   ========================================================= */

const genreDetailButtons = document.querySelectorAll(
    ".genre-details button"
);

const genreDetailSections = [

    "featured-tracks",
    "timeline",
    "genre-connections",
    "characteristics",
    "featured-artists"

];


genreDetailButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedSection = button.dataset.section;

        // Update active navigation button

        genreDetailButtons.forEach(btn => {

            btn.classList.remove("active");

            btn.setAttribute("aria-pressed", "false");

        });

        button.classList.add("active");

        button.setAttribute("aria-pressed", "true");

        // Show selected section

        genreDetailSections.forEach(sectionId => {

            const section = document.getElementById(sectionId);

            if (section) {

                section.hidden = sectionId !== selectedSection;

            }

        });

    });

});


