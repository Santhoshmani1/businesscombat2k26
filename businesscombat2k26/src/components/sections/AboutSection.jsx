import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, Brain, Users, Award } from 'lucide-react';
import { GlassCard } from '../ui';

const AboutSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Benefits data based on requirements
    const benefits = [
        {
            id: 1,
            title: "Market Exposure",
            description: "Real-world business scenarios and market insights",
            icon: TrendingUp,
            color: "text-neon-green",
            bgColor: "bg-neon-green/20"
        },
        {
            id: 2,
            title: "Decision Making & Strategy",
            description: "Develop critical thinking and strategic planning skills",
            icon: Brain,
            color: "text-cyber-purple",
            bgColor: "bg-cyber-purple/20"
        },
        {
            id: 3,
            title: "External Jury Feedback",
            description: "Professional evaluation and constructive feedback",
            icon: Users,
            color: "text-electric-cyan",
            bgColor: "bg-electric-cyan/20"
        },
        {
            id: 4,
            title: "Cash Prizes for Top 5 Teams",
            description: "Monetary rewards for outstanding performance",
            icon: Award,
            color: "text-sunset-orange",
            bgColor: "bg-sunset-orange/20"
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

        const section = document.getElementById('about');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

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
            id="about"
            className="py-20 lg:py-32 bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal relative overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/3 left-1/6 w-32 h-32 bg-core-orange/5 rounded-full blur-2xl" />
                <div className="absolute bottom-1/3 right-1/6 w-40 h-40 bg-electric-blue/5 rounded-full blur-2xl" />
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
                        Why Choose <span className="gradient-text-cyber text-shadow-blue-glow">Business Combat</span>?
                    </h2>
                    <p className="ui-text text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        Experience the ultimate business competition that combines strategy, innovation, and real-world challenges
                    </p>
                </motion.div>

                {/* Benefits Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {benefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;

                        return (
                            <motion.div
                                key={benefit.id}
                                variants={cardVariants}
                                custom={index}
                            >
                                <GlassCard
                                    className="p-6 h-full hover-lift group cursor-pointer"
                                    hoverEffect={true}
                                >
                                    {/* Icon */}
                                    <div className="mb-4">
                                        <div className={`inline-flex p-3 rounded-lg ${benefit.bgColor} border border-glass-border ${benefit.color}`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="ui-text-semibold text-lg text-white mb-3 group-hover:text-core-orange transition-colors duration-200">
                                        {benefit.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="ui-text text-gray-300 leading-relaxed">
                                        {benefit.description}
                                    </p>

                                    {/* Hover Effect Indicator */}
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <div className="w-8 h-0.5 bg-gradient-to-r from-core-orange to-electric-blue rounded-full" />
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <p className="ui-text-medium text-gray-400 max-w-2xl mx-auto">
                        Join hundreds of ambitious students in this premier business competition
                        and take your entrepreneurial skills to the next level.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;