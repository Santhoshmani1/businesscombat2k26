import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle, Users, MessageCircle, CreditCard, AlertTriangle } from 'lucide-react';
import { GlassCard, CTAButton } from '../ui';

const InstructionsSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Registration instructions based on requirements
    const instructions = [
        {
            id: 1,
            icon: Users,
            title: "One Person Per Team Registers",
            description: "Only one team member should complete the registration process for the entire team",
            color: "text-core-orange",
            bgColor: "bg-core-orange/20"
        },
        {
            id: 2,
            icon: CheckCircle,
            title: "Team Size: 1-4 Members",
            description: "Choose your team size during registration. Teams can have 1 to 4 members maximum",
            color: "text-electric-blue",
            bgColor: "bg-electric-blue/20"
        },
        {
            id: 3,
            icon: CreditCard,
            title: "Complete Payment",
            description: "Secure online payment through the registration form. Instant confirmation provided",
            color: "text-green-400",
            bgColor: "bg-green-400/20"
        },
        {
            id: 4,
            icon: MessageCircle,
            title: "Join WhatsApp Group",
            description: "After registration, join the official WhatsApp group for updates and communication",
            color: "text-purple-400",
            bgColor: "bg-purple-400/20"
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

        const section = document.getElementById('instructions');
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

    const handleRegisterClick = () => {
        // Open registration form
        const url = 'https://forms.gle/6sWcLoYBgmKHCPhe8';
        window.open(url, '_blank');
    };


    return (
        <section
            id="instructions"
            className="relative py-20 overflow-hidden lg:py-32 bg-gradient-to-br from-base-black via-deep-charcoal to-base-black"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute w-40 h-40 rounded-full top-1/3 right-1/4 bg-core-orange/5 blur-3xl" />
                <div className="absolute w-56 h-56 rounded-full bottom-1/4 left-1/4 bg-electric-blue/5 blur-3xl" />
            </div>

            <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.div
                    className="mb-16 text-center"
                    variants={titleVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    <h2 className="mb-6 text-3xl text-white hero-text sm:text-4xl lg:text-5xl">
                        Registration <span className="text-core-orange text-shadow-orange-glow">Instructions</span>
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-gray-300 ui-text sm:text-xl">
                        Follow these simple steps to secure your spot in Business Combat 2K26
                    </p>
                </motion.div>

                {/* Instructions Grid */}
                <motion.div
                    className="grid grid-cols-1 gap-6 mb-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    {instructions.map((instruction, index) => {
                        const IconComponent = instruction.icon;

                        return (
                            <motion.div
                                key={instruction.id}
                                variants={cardVariants}
                                custom={index}
                            >
                                <GlassCard className="h-full p-6 text-center hover-lift group">
                                    {/* Step Number */}
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="relative">
                                            <div className={`w-16 h-16 rounded-full ${instruction.bgColor} flex items-center justify-center`}>
                                                <IconComponent className={`w-8 h-8 ${instruction.color}`} />
                                            </div>
                                            <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white rounded-full -top-2 -right-2 bg-core-orange">
                                                {instruction.id}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-3 text-lg text-white transition-colors duration-200 ui-text-semibold group-hover:text-core-orange">
                                        {instruction.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm leading-relaxed text-gray-300 ui-text">
                                        {instruction.description}
                                    </p>

                                    {/* Hover Effect Indicator */}
                                    <div className="mt-4 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                                        <div className={`w-8 h-0.5 mx-auto rounded-full ${instruction.color.replace('text-', 'bg-')}`} />
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </motion.div>


                {/* CTA Section */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                >
                    <GlassCard className="inline-block p-8">
                        <h3 className="mb-4 text-2xl text-white hero-text">
                            Ready to Get Started?
                        </h3>
                        <p className="max-w-md mb-6 text-gray-300 ui-text">
                            Choose your team size and complete your registration to join the competition
                        </p>

                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <CTAButton
                                variant="primary"
                                size="large"
                                onClick={handleRegisterClick}
                                className="min-w-[200px]"
                            >
                                Start Registration
                            </CTAButton>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
};

export default InstructionsSection;