import { useNavigate } from "react-router-dom";
import { useNavbarSearch } from '../hooks/useNavbarSearch';
import { useMobileMenu } from '../hooks/useMobileMenu';
import { Logo } from './navbar/Logo';
import { DesktopNav } from './navbar/DesktopNav';
import { NavActions } from './navbar/NavActions';
import { MobileMenu } from './navbar/MobileMenu';
import { SearchBar } from './navbar/SearchBar';

export function Navbar() {
    const navigate = useNavigate();

    const {
        searchOpen,
        searchQuery,
        searchRef,
        setSearchQuery,
        setSearchOpen,
        toggleSearch
    } = useNavbarSearch();

    const {
        mobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu
    } = useMobileMenu();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setSearchOpen(false);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <header className='bg-blue-950 text-white fixed top-0 left-0 right-0 w-full z-50'>
            <nav className='container flex justify-between items-center p-3 mx-auto'>
                <Logo />
                <DesktopNav />
                <NavActions
                    onToggleSearch={toggleSearch}
                    onToggleMobileMenu={toggleMobileMenu}
                    isMobileMenuOpen={mobileMenuOpen} />
            </nav>

            <SearchBar
                searchOpen={searchOpen}
                searchQuery={searchQuery}
                onSearchChange={handleSearchInputChange}
                onSearchSubmit={handleSearchSubmit}
                searchRef={searchRef} />

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={closeMobileMenu} />
        </header>
    );
}