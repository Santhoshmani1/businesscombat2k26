import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Phone, MessageCircle, Mail, User, Users } from 'lucide-react';
import { GlassCard } from '../ui';

const CoordinatorsSection = () => {
    // Show content by default to avoid hidden-render issues
    const [isVisible, setIsVisible] = useState(true);

    // Updated coordinators and volunteers data provided by event team
    const coordinatorsData = {
        studentCoordinators: [
            { id: 1, name: 'Maneesh Kumar Seepana', role: 'Coordinator', phone: '+919059568044' },
            { id: 2, name: 'Santhosh Mani Pidaka', role: 'Coordinator', phone: '+918978428968' },
            { id: 3, name: 'Pavan Kumar Karupothi', role: 'Coordinator', phone: '+919441265897' },
            { id: 4, name: 'Durga Praveen N', role: 'Coordinator', phone: '+919110351505' }
        ],
        studentVolunteers: [
            { id: 1, name: 'Revanth', role: 'Student Volunteer', phone: '+918919369133' },
            { id: 2, name: 'Srivalli', role: 'Student Volunteer', phone: '+919441463214' },
            { id: 3, name: 'Kiran Surya', role: 'Student Volunteer', phone: '+917981648321' },
            { id: 4, name: 'Mohammad Tahir', role: 'Student Volunteer', phone: '+917569993613' },
            { id: 5, name: 'Chindhu', role: 'Student Volunteer', phone: '+918555931854' },
            { id: 6, name: 'Lahari', role: 'Student Volunteer', phone: '+918688883409' }
        ]
    };

    // Intersection Observer for scroll-triggered animations
    useEffect(() => {
        // If IntersectionObserver is not available (SSR / test env), show content
        if (typeof IntersectionObserver === 'undefined') {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        const section = document.getElementById('coordinators');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
            observer.disconnect();
        };
    }, []);

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

    // Handle contact actions
    const handlePhoneClick = (phone) => {
        window.location.href = `tel:${phone}`;
    };


    // Coordinator Card Component
    const CoordinatorCard = ({ coordinator, index }) => (
        <motion.div
            variants={cardVariants}
            custom={index}
        >
            <GlassCard className="h-full p-6 hover-lift group">
                {/* Profile Section */}
                <div className="mb-6 text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-core-orange/20 to-electric-blue/20">
                        <User className="w-8 h-8 text-core-orange" />
                    </div>
                    <h3 className="mb-1 text-lg text-white transition-colors duration-200 ui-text-semibold group-hover:text-core-orange">
                        {coordinator.name}
                    </h3>
                    <p className="text-sm ui-text text-electric-blue">
                        {coordinator.role}
                    </p>
                </div>

                {/* Contact Options (centered phone, same size as name) */}
                <div className="mt-2">
                    <button
                        onClick={() => handlePhoneClick(coordinator.phone)}
                        className="flex items-center justify-center w-full p-3 transition-all duration-200 rounded-lg bg-glass-bg border-glass-border hover:border-core-orange hover:bg-core-orange/10"
                    >
                        <span className="text-lg text-center text-white ui-text-semibold">
                            {coordinator.phone}
                        </span>
                    </button>
                </div>

                {/* Hover Effect Indicator */}
                <div className="mt-4 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                    <div className="h-0.5 bg-gradient-to-r from-core-orange to-electric-blue rounded-full" />
                </div>
            </GlassCard>
        </motion.div>
    );

    return (
        <section
            id="coordinators"
            className="relative py-20 overflow-hidden lg:py-32 bg-gradient-to-br from-deep-charcoal via-base-black to-deep-charcoal"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute w-48 h-48 rounded-full top-1/4 left-1/4 bg-core-orange/5 blur-3xl" />
                <div className="absolute w-64 h-64 rounded-full bottom-1/3 right-1/3 bg-electric-blue/5 blur-3xl" />
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
                        Event <span className="text-core-orange text-shadow-orange-glow">Coordinators</span>
                    </h2>

                </motion.div>

                {/* Student Coordinators Section */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="flex items-center justify-center mb-8">
                        <Users className="w-6 h-6 mr-3 text-core-orange" />
                        <h3 className="text-2xl text-white hero-text">Student Coordinators</h3>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        {coordinatorsData.studentCoordinators.map((coordinator, index) => {
                            return (
                                <CoordinatorCard
                                    key={`student-coordinator-${coordinator.id}-${index}`}
                                    coordinator={coordinator}
                                    index={index}
                                />
                            )
                        })}
                    </motion.div>
                </motion.div>

                {/* Student Volunteers Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                >
                    <div className="flex items-center justify-center mb-8">
                        <User className="w-6 h-6 mr-3 text-electric-blue" />
                        <h3 className="text-2xl text-white hero-text">Student Volunteers</h3>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                    >
                        {coordinatorsData.studentVolunteers.map((volunteer, index) => (
                            <CoordinatorCard
                                key={`student-volunteer-${volunteer.id}-${index}`}
                                coordinator={volunteer}
                                index={index + coordinatorsData.studentCoordinators.length}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CoordinatorsSection;