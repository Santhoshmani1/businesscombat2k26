import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CTAButton } from '../ui';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Trigger animations on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Animation variants for staggered text reveals
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const buttonVariants = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: 0.8
            }
        }
    };

    // Handle CTA button clicks
    const handleRegisterClick = () => {
        const url = 'https://forms.gle/6sWcLoYBgmKHCPhe8';
        window.open(url, '_blank');
    };

    const handleViewRoundsClick = () => {
        // Scroll to rounds section
        const roundsSection = document.getElementById('rounds');
        if (roundsSection) {
            roundsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-base-black via-deep-charcoal to-base-black">
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-core-orange/5 via-transparent to-electric-blue/5" />

                {/* Animated Background Elements */}
                <div className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-core-orange/10 blur-3xl animate-pulse-slow" />
                <div className="absolute w-48 h-48 rounded-full bottom-1/4 right-1/4 bg-electric-blue/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
                <div className="absolute w-32 h-32 rounded-full top-1/2 right-1/3 bg-neon-green/10 blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
                <div className="absolute w-40 h-40 rounded-full bottom-1/3 left-1/3 bg-cyber-purple/10 blur-2xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 max-w-6xl px-4 mx-auto text-center sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                {/* Tagline */}
                <motion.div
                    variants={textVariants}
                    className="mb-6"
                >
                    <p className="text-sm tracking-wider uppercase ui-text-medium sm:text-base text-electric-blue">
                        ELEKTRA 2K26 · DEPARTMENT OF ECE
                    </p>
                </motion.div>

                {/* Main Headline */}
                <motion.div
                    variants={textVariants}
                    className="mb-8"
                >
                    <h1 className="text-4xl leading-none text-white hero-text-bold sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                        <span className="block gradient-text-cyber text-shadow-blue-glow">BUSINESS</span>
                        <span className="block gradient-text-sunset text-shadow-orange-glow">COMBAT</span>
                    </h1>
                </motion.div>

                {/* Sub-headline */}
                <motion.div
                    variants={textVariants}
                    className="mb-12"
                >
                    <p className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-300 ui-text-medium sm:text-xl md:text-2xl">
                        The most prestigious business battlefield of Elektra 2K26
                    </p>
                </motion.div>

                {/* Value Proposition */}
                <motion.div
                    variants={textVariants}
                    className="mb-12"
                >
                    <p className="max-w-3xl mx-auto text-base leading-relaxed text-gray-400 ui-text sm:text-lg">
                        Experience real market exposure, strategic decision-making, expert jury feedback,
                        and compete for cash prizes in the ultimate business competition.
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={buttonVariants}
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
                >
                    <CTAButton
                        variant="primary"
                        size="large"
                        onClick={handleRegisterClick}
                        glow={true}
                        className="w-full sm:w-auto min-w-50"
                    >
                        Register for Business Combat
                    </CTAButton>

                </motion.div>

            </motion.div>
        </section>
    );
};

export default HeroSection;