import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

export function NavActions({
    onToggleSearch,
    onToggleMobileMenu,
    showMobileButton = true,
    isMobileMenuOpen = false
}) {
    return (
        <section className='flex items-center gap-x-4 relative'>
            <button onClick={onToggleSearch} type="button">
                <MagnifyingGlassIcon className="w-5 h-5 text-white cursor-pointer hover:text-sky-400 transition-colors duration-300" />
            </button>

            <NavLink to="/sign-in">
                <button className="bg-sky-800 text-white px-4 py-2 rounded-md hover:bg-sky-900 transition-colors duration-300 cursor-pointer">
                    Sign In
                </button>
            </NavLink>

            {showMobileButton && (
                <div className="md:hidden">
                    <button onClick={onToggleMobileMenu}>
                        {isMobileMenuOpen ? (
                            <XMarkIcon className="w-6 h-6 text-white cursor-pointer hover:text-sky-400 transition-colors duration-300" />
                        ) : (
                            <Bars3Icon className="w-6 h-6 text-white cursor-pointer hover:text-sky-400 transition-colors duration-300" />
                        )}
                    </button>
                </div>
            )}
        </section>
    );
}