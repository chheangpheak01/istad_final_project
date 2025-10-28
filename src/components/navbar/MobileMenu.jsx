import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    FireIcon,
    CalendarDaysIcon,
    StarIcon,
    PlayCircleIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/solid";

export function MobileMenu({ isOpen, onClose }) {
    if (!isOpen) return null;

    const navLinkStyle = ({ isActive }) =>
        isActive ? "text-sky-400 bg-sky-900" : "hover:text-sky-400 hover:bg-sky-600";

    return (
        <ul className='flex flex-col gap-y-4 items-center bg-slate-700 p-4 md:hidden'>
            <li className="w-full">
                <NavLink to="/" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center gap-2 w-full text-center py-2 px-4 rounded transition-colors duration-300">
                        <HomeIcon className="w-5 h-5" />Home
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/popular" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center gap-2 w-full text-center py-2 px-4 rounded transition-colors duration-300">
                        <FireIcon className="w-5 h-5" />Popular
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/upcoming" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center gap-2 w-full text-center py-2 px-4 rounded transition-colors duration-300">
                        <CalendarDaysIcon className="w-5 h-5" />Upcoming
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/top-rated" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center gap-2 w-full text-center py-2 px-4 rounded transition-colors duration-300">
                        <StarIcon className="w-5 h-5" />Top Rated
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/now-playing" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center gap-2 w-full text-center py-2 px-4 rounded transition-colors duration-300">
                        <PlayCircleIcon className="w-5 h-5" />Now Playing
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/more" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center gap-2 w-full text-center py-2 px-4 rounded transition-colors duration-300">
                        <EllipsisHorizontalIcon className="w-5 h-5" />More
                    </span>
                </NavLink>
            </li>
        </ul>
    );
}