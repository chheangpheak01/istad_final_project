import { useState, useRef, useEffect } from 'react';

export function useNavbarSearch() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef(null);

    const toggleSearch = () => setSearchOpen(!searchOpen);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return {
        searchOpen,
        searchQuery,
        searchRef,
        setSearchQuery,
        setSearchOpen,
        toggleSearch
    };
}