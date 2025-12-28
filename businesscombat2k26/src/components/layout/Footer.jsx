import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // Quick links
    const quickLinks = [
        { name: 'About', href: '#about' },
        { name: 'Rounds', href: '#rounds' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Coordinators', href: '#coordinators' },
    ];

    // Contact info
    const contactInfo = [
        {
            icon: Phone,
            label: 'Phone',
            value: '+91 90595 68044',
            href: 'tel:+919059568044'
        },
        {
            icon: Mail,
            label: 'Email',
            value: 'businesscombatvsp@gmail.com',
            href: 'mailto:businesscombatvsp@gmail.com'
        },
        {
            icon: MapPin,
            label: 'Location',
            value: 'Department of ECE, College Campus',
            href: null
        }
    ];

    // Handle link clicks
    const handleLinkClick = (href) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }  else {
            window.open(href, '_blank');
        }
    };

    return (
        <footer className="border-t bg-gradient-to-t from-base-black to-deep-charcoal border-glass-border">
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="mb-4 text-2xl font-display text-core-orange">
                                BUSINESS COMBAT
                            </h3>
                            <p className="max-w-md mb-4 leading-relaxed text-gray-300 font-ui">
                                The most prestigious business battlefield of ELEKTRA 2K26.
                                Where innovation meets competition and ideas transform into reality.
                            </p>
                            <div className="flex items-center text-sm text-gray-400">
                                <span>Organized by</span>
                                <span className="mx-2 text-electric-blue">•</span>
                                <span className="font-ui-semibold text-electric-blue">Department of ECE</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="mb-4 text-lg text-white font-ui-bold">Quick Links</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => handleLinkClick(link.href)}
                                            className="flex items-center text-gray-300 transition-colors duration-200 font-ui hover:text-core-orange group"
                                        >
                                            <span>{link.name}</span>
                                            <ExternalLink className="w-3 h-3 ml-1 transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="mb-4 text-lg text-white font-ui-bold">Contact</h4>
                            <ul className="space-y-3">
                                {contactInfo.map((contact, index) => {
                                    const IconComponent = contact.icon;
                                    return (
                                        <li key={index}>
                                            {contact.href ? (
                                                <button
                                                    onClick={() => handleLinkClick(contact.href)}
                                                    className="flex items-start text-gray-300 transition-colors duration-200 font-ui hover:text-core-orange group"
                                                >
                                                    <IconComponent className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <div className="text-sm">{contact.value}</div>
                                                    </div>
                                                </button>
                                            ) : (
                                                <div className="flex items-start text-gray-300 font-ui">
                                                    <IconComponent className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                                    <div>
                                                        <div className="text-sm">{contact.value}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;