import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUp, CircleArrowOutUpRight, MessageCircle, Sparkles, Trophy } from 'lucide-react';
import { CTAButton, GlassCard } from '../ui';

const FinalCTASection = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer for scroll-triggered animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById('final-cta');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Handle CTA actions
    const handleRegisterNow = () => {
        const url = 'https://forms.gle/6sWcLoYBgmKHCPhe8';
        window.open(url, '_blank');
    };


    // Animation variants
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

    const itemVariants = {
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
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section
            id="final-cta"
            className="relative py-20 overflow-hidden lg:py-32 bg-gradient-to-br from-base-black via-deep-charcoal to-base-black"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Animated Background Elements */}
                <motion.div
                    className="absolute w-32 h-32 rounded-full top-1/4 left-1/4 bg-core-orange/10 blur-2xl"
                    variants={floatingVariants}
                    animate="animate"
                />
                <motion.div
                    className="absolute w-48 h-48 rounded-full bottom-1/3 right-1/3 bg-electric-blue/10 blur-2xl"
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '2s' }}
                />
                <motion.div
                    className="absolute w-24 h-24 rounded-full top-1/2 right-1/4 bg-purple-500/10 blur-xl"
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '4s' }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-base-black/50 via-transparent to-base-black/50" />
            </div>

            <div className="relative z-10 max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {/* Decorative Element */}
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center mb-8"
                    >
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-6 h-6 text-core-orange" />
                            <div className="w-16 h-0.5 bg-linear-to-r from-core-orange to-electric-blue rounded-full" />
                            <Trophy className="w-6 h-6 text-electric-blue" />
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-8"
                    >
                        <h2 className="mb-6 text-3xl leading-normal tracking-tighter text-white font-hero sm:text-4xl lg:text-6xl xl:text-7xl font-hero-bold">
                            <span className="block">Not everyone gets a chance</span>
                            <span className="block">to do things</span>
                            <span className="block text-core-orange text-shadow-orange-glow">
                                better than before.
                            </span>
                            <span className="block font-display text-electric-blue text-shadow-cyber">
                                You do.
                            </span>
                        </h2>
                    </motion.div>

                    {/* Subtext */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-12"
                    >
                        <p className="max-w-4xl mx-auto text-lg leading-relaxed text-gray-300 font-ui sm:text-xl lg:text-2xl">
                            Join the most prestigious business competition of ELEKTRA 2K26.
                            Transform your ideas into reality, compete with the best minds,
                            and win recognition that lasts a lifetime.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-16"
                    >
                        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                            <CTAButton
                                variant="primary"
                                size="large"
                                onClick={handleRegisterNow}
                                className="flex items-center justify-center w-full text-lg sm:w-auto min-w-55 font-ui-bold"
                            >
                                <span>Register Now</span>
                                <CircleArrowOutUpRight className="inline w-5 h-5 ml-2" />
                            </CTAButton>

                        </div>
                    </motion.div>

                    {/* Stats/Features Grid */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {[
                            { number: "3", label: "Competition Rounds", icon: "🎯" },
                            { number: "₹400", label: "Maximum Team Fee", icon: "💰" },
                            { number: "5", label: "Cash Prize Winners", icon: "🏆" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <GlassCard className="p-6 text-center hover-lift">
                                    <div className="mb-2 text-3xl">{stat.icon}</div>
                                    <div className="mb-1 text-2xl font-display text-core-orange">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-300 font-ui">
                                        {stat.label}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Final Message */}
                    <motion.div
                        variants={itemVariants}
                        className="max-w-3xl mx-auto"
                    >
                        <GlassCard className="p-8 bg-linear-to-r from-glass-bg to-core-orange/5 border-core-orange/20">
                            <p className="mb-4 text-lg leading-relaxed text-gray-300 font-ui">
                                <span className="text-core-orange font-ui-semibold">Business Combat</span> isn't just a competition—
                                it's your gateway to the business world. Network with industry experts,
                                gain invaluable feedback, and showcase your entrepreneurial spirit.
                            </p>
                            <p className="text-sm tracking-wide uppercase font-cyber text-electric-blue">
                                The battlefield awaits. Are you ready?
                            </p>
                        </GlassCard>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTASection;