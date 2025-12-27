/**
 * Test utilities for Business Combat website
 */

// Mock viewport sizes for responsive testing
export const viewportSizes = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
}

// Mock scroll positions
export const scrollPositions = [0, 100, 500, 1000, 2000]

// Color palette validation
export const validColorClasses = [
    'bg-base-black',
    'bg-deep-charcoal',
    'bg-core-orange',
    'bg-electric-blue',
    'text-base-black',
    'text-deep-charcoal',
    'text-core-orange',
    'text-electric-blue',
    'border-glass-border'
]

// Font family validation
export const validFontClasses = [
    'font-hero',
    'font-ui',
    'hero-text',
    'hero-text-bold',
    'ui-text',
    'ui-text-medium',
    'ui-text-semibold'
]

// Helper to simulate viewport changes
export const setViewport = (width, height) => {
    Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: width,
    })
    Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: height,
    })
    window.dispatchEvent(new Event('resize'))
}

// Helper to check if element has valid color classes
export const hasValidColorClass = (element) => {
    const classList = Array.from(element.classList)
    return validColorClasses.some(colorClass =>
        classList.some(cls => cls.includes(colorClass.split('-')[1]))
    )
}

// Helper to check if element has valid font classes  
export const hasValidFontClass = (element) => {
    const classList = Array.from(element.classList)
    return validFontClasses.some(fontClass => classList.includes(fontClass))
}