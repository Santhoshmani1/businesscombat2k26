import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const GlassCard = forwardRef(({
    children,
    className = '',
    blurLevel = 'medium',
    hoverEffect = true,
    ...props
}, ref) => {
    // Define blur levels based on design requirements
    const blurLevels = {
        light: 'backdrop-blur-sm', // 4px
        medium: 'backdrop-blur-md', // 12px - close to design spec of 14px
        heavy: 'backdrop-blur-xl' // 24px
    };

    // Base glass card styles from design requirements
    const baseClasses = `
    relative
    bg-[rgba(15,20,30,0.6)]
    border
    border-[rgba(255,255,255,0.12)]
    rounded-lg
    ${blurLevels[blurLevel]}
    ${className}
  `;

    // Hover animation variants
    const hoverVariants = {
        initial: { y: 0 },
        hover: {
            y: -6, // -6px Y translation as per design requirements
            transition: {
                duration: 0.2,
                ease: "easeOut" // 200ms ease-out transition
            }
        }
    };

    if (hoverEffect) {
        return (
            <motion.div
                ref={ref}
                className={baseClasses}
                variants={hoverVariants}
                initial="initial"
                whileHover="hover"
                {...props}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <div
            ref={ref}
            className={baseClasses}
            {...props}
        >
            {children}
        </div>
    );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;