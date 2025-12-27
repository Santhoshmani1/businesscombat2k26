import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const CTAButton = forwardRef(({
    variant = 'primary',
    size = 'medium',
    onClick,
    children,
    disabled = false,
    loading = false,
    className = '',
    ...props
}, ref) => {
    // Size configurations with touch-friendly targets
    const sizeClasses = {
        small: 'px-4 py-2 text-sm min-h-[44px]', // Minimum touch target
        medium: 'px-6 py-3 text-base min-h-[48px]',
        large: 'px-8 py-4 text-lg min-h-[52px]'
    };

    // Variant configurations based on design requirements
    const variantClasses = {
        primary: `
      bg-core-orange 
      text-white 
      border-core-orange
      font-ui-semibold
      btn-glow
      shadow-neon-orange
      hover:shadow-hover-glow
    `,
        secondary: `
      bg-transparent 
      text-core-orange 
      border-core-orange
      font-ui-semibold
      hover:bg-[rgba(255,122,24,0.1)]
      hover:shadow-[0_0_20px_rgba(255,122,24,0.25)]
    `,
        ghost: `
      bg-transparent 
      text-white 
      border-glass-border
      font-ui-medium
      hover:bg-[rgba(255,255,255,0.05)]
      hover:border-[rgba(255,255,255,0.3)]
    `
    };

    // Base classes with proper design system integration
    const baseClasses = `
    relative
    inline-flex
    items-center
    justify-center
    border
    rounded-lg
    transition-all
    duration-200
    ease-out
    focus:outline-none
    focus:ring-2
    focus:ring-core-orange
    focus:ring-opacity-50
    touch-target
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

    // Enhanced animation variants with glow effects
    const buttonVariants = {
        initial: {
            scale: 1,
            y: 0
        },
        hover: {
            scale: 1.02,
            y: -2, // Subtle lift effect
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        tap: {
            scale: 0.98,
            y: 0,
            transition: { duration: 0.1 }
        }
    };

    const handleClick = (e) => {
        if (disabled || loading) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    return (
        <motion.button
            ref={ref}
            className={baseClasses}
            variants={buttonVariants}
            initial="initial"
            whileHover={!disabled && !loading ? "hover" : "initial"}
            whileTap={!disabled && !loading ? "tap" : "initial"}
            onClick={handleClick}
            disabled={disabled || loading}
            {...props}
        >
            {/* Glow effect overlay for primary buttons */}
            {variant === 'primary' && !disabled && !loading && (
                <div className="absolute inset-0 transition-opacity duration-200 rounded-lg opacity-80 bg-gradient-to-r from-transparent via-white/15 to-transparent hover:opacity-100" />
            )}

            {loading && (
                <svg
                    className="w-4 h-4 mr-2 -ml-1 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
});

CTAButton.displayName = 'CTAButton';

export default CTAButton;