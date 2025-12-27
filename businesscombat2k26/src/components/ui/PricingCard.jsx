import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { GlassCard, CTAButton } from './';

const PricingCard = ({
    teamSize,
    memberCount,
    price,
    currency = '₹',
    isBestValue = false,
    features = [],
    onSelect,
    className = '',
    ...props
}) => {
    // Animation variants
    const cardVariants = {
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

    const badgeVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: -10
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                delay: 0.3,
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    // Default features based on team size
    const defaultFeatures = [
        'Full competition access',
        'All round participation',
        'External jury feedback',
        'Certificate of participation',
        'Networking opportunities'
    ];

    const cardFeatures = features.length > 0 ? features : defaultFeatures;

    return (
        <motion.div
            variants={cardVariants}
            className={`relative ${className}`}
            {...props}
        >
            {/* Best Value Badge */}
            {isBestValue && (
                <motion.div
                    variants={badgeVariants}
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                >
                    <div className="bg-gradient-to-r from-core-orange to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1 shadow-lg">
                        <Star className="w-4 h-4" />
                        Best Value
                    </div>
                </motion.div>
            )}

            <GlassCard
                className={`p-6 h-full hover-lift group relative overflow-hidden ${isBestValue ? 'border-core-orange/50 shadow-[0_0_30px_rgba(255,122,24,0.2)]' : ''
                    }`}
                hoverEffect={true}
            >
                {/* Background Gradient for Best Value */}
                {isBestValue && (
                    <div className="absolute inset-0 bg-gradient-to-br from-core-orange/5 to-transparent opacity-50" />
                )}

                <div className="relative z-10">
                    {/* Team Size */}
                    <div className="text-center mb-6">
                        <h3 className="ui-text-semibold text-xl text-white mb-2 group-hover:text-core-orange transition-colors duration-200">
                            {teamSize}
                        </h3>
                        <p className="ui-text text-sm text-gray-400">
                            {memberCount === 1 ? '1 Member' : `${memberCount} Members`}
                        </p>
                    </div>

                    {/* Price */}
                    <div className="text-center mb-8">
                        <div className="flex items-baseline justify-center">
                            <span className="ui-text text-sm text-gray-400 mr-1">{currency}</span>
                            <span className={`hero-text text-4xl ${isBestValue ? 'text-core-orange' : 'text-white'
                                } group-hover:text-core-orange transition-colors duration-200`}>
                                {price}
                            </span>
                        </div>
                        
                    </div>

                    {/* Features */}
                    {/* <div className="mb-8">
                        <ul className="space-y-3">
                            {cardFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                    <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${isBestValue
                                            ? 'bg-core-orange/20 text-core-orange'
                                            : 'bg-electric-blue/20 text-electric-blue'
                                        }`}>
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="ui-text text-sm text-gray-300">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div> */}


                    {/* Hover Effect Indicator */}
                    <div className="absolute bottom-4 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className={`h-0.5 rounded-full ${isBestValue
                                ? 'bg-gradient-to-r from-core-orange to-yellow-500'
                                : 'bg-gradient-to-r from-electric-blue to-cyan-500'
                            }`} />
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
};

export default PricingCard;