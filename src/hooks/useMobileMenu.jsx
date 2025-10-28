import { useState } from 'react';

export function useMobileMenu() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);
    const openMobileMenu = () => setMobileMenuOpen(true);

    return {
        mobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        openMobileMenu,
        setMobileMenuOpen
    };
}