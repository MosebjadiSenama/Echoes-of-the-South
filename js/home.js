
/* GSAP GENRE CARDS ANIMATION */

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
