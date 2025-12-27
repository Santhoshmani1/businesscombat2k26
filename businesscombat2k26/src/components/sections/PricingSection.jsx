import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Users, AlertCircle, ArrowRight } from 'lucide-react';
import { PricingCard, CTAButton, GlassCard } from '../ui';

const PricingSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedPricing, setSelectedPricing] = useState(null);

    // Pricing data based on requirements
    const pricingData = [
        {
            teamSize: "Solo",
            memberCount: 1,
            price: 150,
            currency: "₹",
            isBestValue: false
        },
        {
            teamSize: "2 Members",
            memberCount: 2,
            price: 200,
            currency: "₹",
            isBestValue: false
        },
        {
            teamSize: "3 Members",
            memberCount: 3,
            price: 300,
            currency: "₹",
            isBestValue: false
        },
        {
            teamSize: "4 Members",
            memberCount: 4,
            price: 400,
            currency: "₹",
            isBestValue: true
        }
    ];

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

        const section = document.getElementById('pricing');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Handle pricing selection
    const handlePricingSelect = (pricing) => {
        setSelectedPricing(pricing);
    };

    // Handle registration
    const handleProceedToRegistration = () => {
        // This will be connected to Google Form in later tasks
        console.log('Proceed to registration with:', selectedPricing);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
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

    const titleVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section
            id="pricing"
            className="py-20 lg:py-32 bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal relative overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-core-orange/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-electric-blue/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.div
                    className="text-center mb-16"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    <h2 className="hero-text text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                        Choose Your <span className="text-core-orange text-shadow-orange-glow">Team Size</span>
                    </h2>
                    <p className="ui-text text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Select the perfect team configuration for your Business Combat journey
                    </p>

                    {/* Important Notice */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <GlassCard className="inline-flex items-center px-6 py-3 bg-core-orange/10 border-core-orange/30">
                            <AlertCircle className="w-5 h-5 text-core-orange mr-3" />
                            <span className="ui-text-medium text-core-orange">
                                Only one person per team should register
                            </span>
                        </GlassCard>
                    </motion.div>
                </motion.div>

                {/* Pricing Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {pricingData.map((pricing, index) => (
                        <motion.div
                            key={pricing.teamSize}
                            variants={cardVariants}
                            custom={index}
                        >
                            <PricingCard
                                {...pricing}
                                onSelect={handlePricingSelect}
                                className={`transition-all duration-200 ${selectedPricing?.teamSize === pricing.teamSize
                                        ? 'ring-2 ring-core-orange ring-opacity-50'
                                        : ''
                                    }`}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Registration CTA Section */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;