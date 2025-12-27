import { useRef, useEffect, useState } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

function ScrollTriggeredCards({ containerRef, className, scrollTrigger, x, cards, cardClassName }) {
    return (
        <motion.div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{ height: '100vh' }}
        >
            <div className="sticky top-0 flex items-center h-screen">
                <motion.div
                    className="flex gap-6"
                    style={scrollTrigger ? { x } : {}}
                >
                    {cards.map((card, index) => (
                        <div
                            key={card.id || index}
                            className={`shrink-0 ${cardClassName}`}
                        >
                            {card.content}
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}

function ManualScrollCards({ className, cardClassName, canScrollLeft, canScrollRight, scrollTo, scrollProgress, handleTouchStart, handleTouchMove, handleTouchEnd, scrollRef, handleScroll, cards }) {
    return (
        <div className={`relative ${className}`}>
            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => scrollTo('left')}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded-lg border transition-all duration-200 ${canScrollLeft
                            ? 'border-glass-border bg-glass-bg hover:border-core-orange text-white'
                            : 'border-gray-600 bg-gray-800 text-gray-500 cursor-not-allowed'
                            }`}
                        aria-label="Scroll left"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => scrollTo('right')}
                        disabled={!canScrollRight}
                        className={`p-2 rounded-lg border transition-all duration-200 ${canScrollRight
                            ? 'border-glass-border bg-glass-bg hover:border-core-orange text-white'
                            : 'border-gray-600 bg-gray-800 text-gray-500 cursor-not-allowed'
                            }`}
                        aria-label="Scroll right"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

            </div>

            {/* Scrollable Cards Container */}
            <div
                ref={scrollRef}
                className="pb-4 horizontal-scroll"
                onScroll={handleScroll}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div className="flex gap-6">
                    {cards.map((card, index) => (
                        <div
                            key={card.id || index}
                            className={`horizontal-scroll-item ${cardClassName}`}
                        >
                            {card.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const HorizontalScrollCards = ({
    cards = [],
    scrollTrigger = true,
    className = '',
    cardClassName = '',
    children
}) => {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isClient, setIsClient] = useState(false);

    // Avoid passing an un-hydrated ref to `useScroll` during SSR/hydration.
    // Defer the client flag update to the next animation frame to avoid
    // synchronous setState inside an effect which can trigger cascading renders.
    useEffect(() => {
        const id = requestAnimationFrame(() => setIsClient(true));
        return () => cancelAnimationFrame(id);
    }, []);

    // Motion value for horizontal translation. We'll update this manually
    // on the client using a scroll listener to avoid passing refs into
    // `useScroll` (which can trigger hydration errors).
    const xMotion = useMotionValue(0);
    const x = useTransform(xMotion, [0, 1], [0, -1000]);

    // Client-only scroll handler to map vertical scroll progress to horizontal x.
    useEffect(() => {
        if (!scrollTrigger) return;
        if (!isClient) return;
        const el = containerRef.current;
        if (!el) return;

        let ticking = false;

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                // progress from 0 (start) to 1 (end) as the section scrolls through viewport
                const total = rect.height + viewportHeight;
                const progress = Math.min(Math.max((viewportHeight - rect.top) / total, 0), 1);
                xMotion.set(progress);
                ticking = false;
            });
        };

        // Initialize and subscribe
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [isClient, scrollTrigger, xMotion]);

    // Handle manual scroll for touch/mouse interactions
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const progress = scrollLeft / (scrollWidth - clientWidth);
            setScrollProgress(progress);
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    // Scroll to specific position
    const scrollTo = (direction) => {
        if (scrollRef.current) {
            const cardWidth = scrollRef.current.children[0]?.offsetWidth || 300;
            const scrollAmount = cardWidth + 24; // Card width + gap

            const currentScroll = scrollRef.current.scrollLeft;
            const targetScroll = direction === 'left'
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount;

            scrollRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    // Touch gesture handling for mobile
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const handleTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && canScrollRight) {
            scrollTo('right');
        }
        if (isRightSwipe && canScrollLeft) {
            scrollTo('left');
        }
    };

    // Initialize scroll state
    // Run handleScroll on the next animation frame to avoid setting state
    // synchronously during render/effect processing.
    useEffect(() => {
        const id = requestAnimationFrame(() => handleScroll());
        return () => cancelAnimationFrame(id);
    }, [cards]);

    // Scroll-triggered horizontal movement (Chrome.com style)

    // Render children if provided, otherwise render cards
    if (children) {
        return (
            <div className={className}>
                {children}
            </div>
        );
    }

    // Choose rendering mode based on scrollTrigger prop
    return scrollTrigger ? (
        <ScrollTriggeredCards
            containerRef={containerRef}
            className={className}
            scrollTrigger={scrollTrigger}
            x={x}
            cards={cards}
            cardClassName={cardClassName}
        />
    ) : (
        <ManualScrollCards
            className={className}
            cardClassName={cardClassName}
            canScrollLeft={canScrollLeft}
            canScrollRight={canScrollRight}
            scrollTo={scrollTo}
            scrollProgress={scrollProgress}
            handleTouchStart={handleTouchStart}
            handleTouchMove={handleTouchMove}
            handleTouchEnd={handleTouchEnd}
            scrollRef={scrollRef}
            handleScroll={handleScroll}
            cards={cards}
        />
    );
};

export default HorizontalScrollCards;