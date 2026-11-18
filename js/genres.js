

/* =========================================================
   1. SOUTH AFRICAN MUSIC GENRE DATA
   ========================================================= */

const genres = [

    {
        name: "Maskandi",
        category: "traditional",
        description: "Zulu folk music blending storytelling, rhythmic guitar and everyday life.",
        image: "../assets/genres/maskandi.webp",
        link: "genre-details.html"
    },

    {
        name: "Lekompo",
        category: "dance",
        description: "A Limpopo-born sound blending local influences with energetic electronic beats.",
        image: "../assets/genres/Lekompo.webp",
        link: "genre-details.html"
    },

    {
        name: "Gqom",
        category: "dance",
        description: "Durban-born dance music driven by heavy bass and stripped-back beats.",
        image: "../assets/genres/gqom.jpg",
        link: "genre-details.html"
    },

    {
        name: "Isicathamiya",
        category: "traditional",
        description: "Powerful choral singing rooted in South African vocal traditions.",
        image: "../assets/genres/Mbube.jpeg",
        link: "genre-details.html"
    },

    {
        name: "Marabi",
        category: "township",
        description: "Early urban dance music shaped by township life, jazz and African rhythms.",
        image: "../assets/genres/Marabi.jpeg",
        link: "genre-details.html"
    },

    {
        name: "Mbaqanga",
        category: "traditional",
        description: "A lively fusion of Zulu musical traditions and modern instrumentation.",
        image: "../assets/genres/Mbaqanga.jpeg",
        link: "genre-details.html"
    },

    {
        name: "Kwela",
        category: "township",
        description: "Upbeat pennywhistle music that brought township streets to life.",
        image: "../assets/genres/Kwela.jpg",
        link: "genre-details.html"
    },

    {
        name: "Reggae",
        category: "pop",
        description: "Music known for steady rhythms, deep bass and messages of love, unity and resistance.",
        image: "../assets/images/lucky dube.jpeg",
        link: "genre-details.html"
    },

    {
        name: "Kwaito",
        category: "township",
        description: "Post-apartheid township dance music blending house beats and local slang.",
        image: "../assets/genres/Kwaito.webp",
        link: "genre-details.html"
    },

    {
        name: "Bubblegum",
        category: "township",
        description: "Catchy 1980s South African pop with infectious melodies and dance rhythms.",
        image: "../assets/genres/Bubblegum.webp",
        link: "genre-details.html"
    },

    {
        name: "South African Jazz",
        category: "jazz",
        description: "A distinctive jazz tradition shaped by African rhythms and improvisation.",
        image: "../assets/genres/jazz.jpeg",
        link: "genre-details.html"
    },

    {
        name: "Gospel",
        category: "gospel",
        description: "Soulful Christian music blending powerful vocals, harmonies and African rhythms.",
        image: "../assets/genres/Gospel.jpeg",
        link: "genre-details.html"
    },

    {
        name: "Motswako",
        category: "hip-hop",
        description: "South African hip-hop blending Setswana and English lyrics.",
        image: "../assets/genres/Motswako.jpeg",
        link: "genre-details.html"
    },

    {
        name: "Amapiano",
        category: "dance",
        description: "A South African dance sound featuring deep bass, log drums and soulful keys.",
        image: "../assets/genres/Amapiano.jpeg",
        link: "genre-details.html"
    },

    {
        name: "South African House",
        category: "dance",
        description: "House music infused with African rhythms, soulful vocals and local influences.",
        image: "../assets/genres/SA house.jpeg",
        link: "genre-details.html"
    },

    {
        name: "Barcadi",
        category: "dance",
        description: "A Pretoria-born dance style known for energetic beats and distinctive rhythms.",
        image: "../assets/genres/Barcadi.jpeg",
        link: "genre-details.html"
    },

    {
        name: "Afro-pop",
        category: "pop",
        description: "South African pop blending contemporary production with African musical influences.",
        image: "../assets/genres/Afro-pop.jpeg",
        link: "genre-details.html"
    }

];


/* =========================================================
   2. SHARED ELEMENTS
   ========================================================= */

const genreGrid = document.getElementById("genreGrid");

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

                <p>${escapeTrackText(genre.description)}</p>

                <span class="genre-card-arrow" aria-hidden="true">
                    ↗
                </span>

            </div>

        </a>

    `).join("");

}


/* =========================================================
   5. INITIALISE GENRE CARDS
   ========================================================= */

if (genreGrid) {

    displayGenres(genres);

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

        const filteredGenres = selectedCategory === "all"
            ? genres
            : genres.filter(genre => genre.category === selectedCategory);

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

        if (genreDescriptionElement) {
            genreDescriptionElement.textContent = selectedGenre.description;
        }

        if (genreEraElement) {
            genreEraElement.textContent = "SOUTH AFRICAN MUSIC";
        }

        if (genreOverviewElement) {

            genreOverviewElement.textContent =
                `Explore the origins, cultural significance and musical identity of ${selectedGenre.name} in South African music.`;

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

async function loadGenreTracks(genreName) {

    if (!genreTracksElement) return;

    const searchTerms = {

        "Maskandi": "Maskandi South Africa",
        "Lekompo": "Lekompo South Africa",
        "Gqom": "Gqom South Africa",
        "Isicathamiya": "Isicathamiya South Africa",
        "Marabi": "Marabi South Africa",
        "Mbaqanga": "Mbaqanga South Africa",
        "Kwela": "Kwela South Africa",
        "Reggae": "Lucky Dube",
        "Kwaito": "Kwaito South Africa",
        "Bubblegum": "South African bubblegum music",
        "South African Jazz": "South African jazz",
        "Gospel": "South African gospel",
        "Motswako": "Motswako South Africa",
        "Amapiano": "Amapiano South Africa",
        "South African House": "South African house music",
        "Barcadi": "Barcadi South Africa",
        "Afro-pop": "South African Afro pop"

    };

    const term = searchTerms[genreName] || `${genreName} South Africa`;

    genreTracksElement.innerHTML = "<p>Loading tracks...</p>";

    try {

        const response = await fetch(
            `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=ZA&media=music&entity=song&limit=50`
        );

        if (!response.ok) {
            throw new Error("Music search failed");
        }

        const data = await response.json();

        const uniqueTracks = [];

        const seenTracks = new Set();

        data.results.forEach(track => {

            if (
                !track.previewUrl ||
                !track.trackId ||
                seenTracks.has(track.trackId)
            ) {
                return;
            }

            seenTracks.add(track.trackId);

            uniqueTracks.push(track);

        });

        const tracks = uniqueTracks.slice(0, 5);

        if (tracks.length === 0) {

            genreTracksElement.innerHTML =
                "<p>No playable songs were found for this genre.</p>";

            return;

        }

        genreTracksElement.innerHTML = tracks.map((track, index) => {

            const fullTrackUrl = track.trackViewUrl ||
                `https://music.apple.com/za/search?term=${encodeURIComponent(track.trackName + " " + track.artistName)}`;

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

            return `

                <article
                    class="track-card"
                    data-audio="${escapeTrackText(track.previewUrl)}"
                    data-track-id="${track.trackId}"
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
    <svg
        class="apple-music-logo"
        viewBox="0 0 220 65"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
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


        /* Attach play button events */

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


/* =========================================================
   9. TRACK PLAYBACK
   ========================================================= */

async function playTrack(card) {

    if (!genreAudio || !card) return;

    const audioUrl = card.dataset.audio;

    const trackImage = card.querySelector(".track-artwork");

    if (!audioUrl) return;

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

            genreAudio.pause();

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
