import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Calendar, Clock, Users, Trophy, Zap, Target } from 'lucide-react';
import { GlassCard } from '../ui';
import HorizontalScrollCards from '../ui/HorizontalScrollCards';

const RoundsSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Rounds data based on requirements
    const roundsData = [
        {
            id: 1,
            number: "01",
            title: "QUIZ-TO-IN",
            type: "Online Quiz",
            description: "Tests IQ, response time, decision-making",
            details: "Online quiz format testing intellectual capabilities and quick decision-making skills",
            date: "05/01/2026",
            note: "Timings via WhatsApp group",
            icon: Zap,
            color: "from-core-orange to-yellow-500",
            features: [
                "IQ & Logic Testing",
                "Quick Response Time",
                "Decision Making Skills",
                "Online Format"
            ]
        },
        {
            id: 2,
            number: "02",
            title: "THE THINK TANK",
            type: "Surprise Round",
            description: "Team-based spontaneity & quick thinking",
            details: "Surprise challenges requiring immediate team coordination and creative problem-solving",
            icon: Users,
            color: "from-electric-blue to-cyan-500",
            features: [
                "Team Coordination",
                "Creative Problem Solving",
                "Spontaneous Challenges",
                "Quick Thinking"
            ]
        },
        {
            id: 3,
            number: "03",
            title: "PITCH-TO-WIN",
            type: "Final Round",
            description: "Pitch to external business jury",
            details: "Present your business solution to industry experts for feedback, evaluation, and cash prizes for top 5 teams",
            icon: Trophy,
            color: "from-purple-500 to-pink-500",
            features: [
                "External Business Jury",
                "Professional Feedback",
                "Cash Prizes for Top 5",
                "Industry Evaluation"
            ]
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

        const section = document.getElementById('rounds');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    // Create cards for horizontal scroll
    const roundCards = roundsData.map((round, index) => {
        const IconComponent = round.icon;

        return {
            id: round.id,
            content: (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                >
                    <GlassCard className="w-80 sm:w-96 md:w-80 lg:w-96 h-[500px] p-8 hover-lift group mx-auto md:mx-0">
                        {/* Round Number */}
                        <div className="flex items-center justify-between mb-6">
                            <div className={`text-6xl font-bold bg-gradient-to-r ${round.color} bg-clip-text text-transparent`}>
                                {round.number}
                            </div>
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${round.color} bg-opacity-20`}>
                                <IconComponent className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        {/* Title and Type */}
                        <div className="mb-6">
                            <h3 className="hero-text text-2xl text-white mb-2 group-hover:text-core-orange transition-colors duration-200">
                                {round.title}
                            </h3>
                            <p className="ui-text-medium text-electric-blue text-sm uppercase tracking-wider">
                                {round.type}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="ui-text text-gray-300 mb-6 leading-relaxed">
                            {round.details}
                        </p>

                        {/* Features */}
                        <div className="mb-6">
                            <h4 className="ui-text-semibold text-white text-sm mb-3 uppercase tracking-wide">
                                Key Features
                            </h4>
                            <ul className="space-y-2">
                                {round.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-sm text-gray-300">
                                        <div className="w-1.5 h-1.5 bg-core-orange rounded-full mr-3 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Date (if available) */}
                        {round.date && (
                            <div className="mt-auto pt-4 border-t border-glass-border">
                                <div className="flex items-center text-sm text-gray-400">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <span>{round.date}</span>
                                </div>
                                {round.note && (
                                    <p className="text-xs text-gray-500 mt-1">{round.note}</p>
                                )}
                            </div>
                        )}

                        {/* Hover Effect Indicator */}
                        <div className="absolute bottom-4 left-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className={`h-0.5 bg-gradient-to-r ${round.color} rounded-full`} />
                        </div>
                    </GlassCard>
                </motion.div>
            )
        };
    });

    return (
        <section
            id="rounds"
            className="py-20 lg:py-32 bg-gradient-to-br from-base-black via-deep-charcoal to-base-black relative overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-electric-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-core-orange/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="hero-text text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
                        Competition <span className="text-core-orange text-shadow-orange-glow">Rounds</span>
                    </h2>
                    <p className="ui-text text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        Three challenging rounds designed to test your business acumen, strategic thinking, and presentation skills
                    </p>
                </motion.div>

                {/* Horizontal Scroll Cards - Desktop / Vertical Stack - Mobile */}
                <div className="relative">
                    {/* Desktop: Horizontal Scroll */}
                    <div className="hidden md:block">
                        <HorizontalScrollCards
                            cards={roundCards}
                            scrollTrigger={false} // Use manual scroll for better control
                            className="mb-8"
                            cardClassName="flex-shrink-0"
                        />
                    </div>

                    {/* Mobile: Vertical Stack */}
                    <div className="block md:hidden">
                        <div className="space-y-6">
                            {roundCards.map((card, index) => (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    transition={{ delay: index * 0.2, duration: 0.6 }}
                                    className="w-full"
                                >
                                    {card.content}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="glass-card p-6 max-w-2xl mx-auto">
                        <div className="flex items-center justify-center mb-4">
                            <Trophy className="w-6 h-6 text-core-orange mr-2" />
                            <h3 className="ui-text-semibold text-lg text-white">Competition Timeline</h3>
                        </div>
                        <p className="ui-text text-gray-300 mb-4">
                            Progress through each round to reach the final pitch presentation.
                            Only the best teams advance to compete for cash prizes and recognition.
                        </p>
                        <div className="flex items-center justify-center text-sm text-gray-400">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>Detailed timings will be shared via WhatsApp group after registration</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default RoundsSection;