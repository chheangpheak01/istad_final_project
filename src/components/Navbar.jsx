import { useState } from 'react';
import { NavLink, Link } from "react-router-dom";
import logo from '../utilities/assets/logo.png';
import { MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { useScrollToTop } from '../hooks/useScrollToTop';

export function Navbar() {

    useScrollToTop();

    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleSearch = () => setSearchOpen(!searchOpen);
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    const navLinkStyle = ({ isActive }) =>
        isActive ? "text-sky-400" : "hover:text-sky-400";

    return (
        <header className='bg-blue-950 text-white fixed top-0 left-0 right-0 w-full z-50'>
            <nav className='container flex justify-between items-center p-3 mx-auto'>

                <section className='flex items-center gap-2'>
                    <Link to={"/"}><img src={logo} alt="Movie Logo" className="w-12 h-12 object-cover rounded-full" /></Link>
                    <span className='text-2xl font-semibold'>Istad Movie</span>
                </section>

                <ul className='hidden md:flex gap-x-4 items-center'>
                    <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
                    <li><NavLink to="/popular" className={navLinkStyle}>Popular</NavLink></li>
                    <li><NavLink to="/upcoming" className={navLinkStyle}>Upcoming</NavLink></li>
                    <li><NavLink to="/top-rated" className={navLinkStyle}>Top Rated</NavLink></li>
                    <li><NavLink to="/now-playing" className={navLinkStyle}>Now Playing</NavLink></li>
                    <li><NavLink to="/more" className={navLinkStyle}>More</NavLink></li>
                </ul>

                <section className='flex items-center gap-x-4 relative'>

                    <button onClick={toggleSearch}>
                        <MagnifyingGlassIcon className="w-5 h-5 text-white cursor-pointer hover:text-sky-400 transition-colors duration-300" />
                    </button>

                    <NavLink to="/sign-in">
                        <button className="bg-sky-800 text-white px-4 py-2 rounded-md hover:bg-sky-900 transition-colors duration-300 cursor-pointer">
                            Sign In
                        </button>
                    </NavLink>

                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu}>
                            <Bars3Icon className="w-6 h-6 text-white cursor-pointer" />
                        </button>
                    </div>
                </section>
            </nav>

            {searchOpen && (
                <form className="w-full bg-slate-800 p-3">
                    <input
                        type="text"
                        autoFocus
                        placeholder="Search for movies..."
                        className="w-full rounded-md py-2 px-3 text-white bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all duration-300"
                        onBlur={() => setSearchOpen(false)}
                    />
                </form>
            )}
            {mobileMenuOpen && (
                <ul className='flex flex-col gap-y-4 items-center bg-slate-700 p-4 md:hidden'>
                    <li><NavLink to="/" className="block w-full text-center py-2 px-4 rounded hover:bg-sky-600 transition-colors duration-300">Home</NavLink></li>
                    <li><NavLink to="/popular" className="block w-full text-center py-2 px-4 rounded hover:bg-sky-600 transition-colors duration-300">Popular</NavLink></li>
                    <li><NavLink to="/upcoming" className="block w-full text-center py-2 px-4 rounded hover:bg-sky-600 transition-colors duration-300">Upcoming</NavLink></li>
                    <li><NavLink to="/top-rated" className="block w-full text-center py-2 px-4 rounded hover:bg-sky-600 transition-colors duration-300">Top Rated</NavLink></li>
                    <li><NavLink to="/now-playing" className="block w-full text-center py-2 px-4 rounded hover:bg-sky-600 transition-colors duration-300">Now Playing</NavLink></li>
                    <li><NavLink to="/more" className="block w-full text-center py-2 px-4 rounded hover:bg-sky-600 transition-colors duration-300">More</NavLink></li>
                </ul>
            )}
        </header>
    );
};