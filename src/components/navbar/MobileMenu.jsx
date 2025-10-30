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
                    <span className="flex items-center justify-start gap-3 text-center py-2 px-4 rounded transition-colors duration-300 w-48 mx-auto">
                        <HomeIcon className="w-5 h-5" />
                        <span>Home</span>
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/popular" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center justify-start gap-3 text-center py-2 px-4 rounded transition-colors duration-300 w-48 mx-auto">
                        <FireIcon className="w-5 h-5" />
                        <span>Popular</span>
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/upcoming" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center justify-start gap-3 text-center py-2 px-4 rounded transition-colors duration-300 w-48 mx-auto">
                        <CalendarDaysIcon className="w-5 h-5" />
                        <span>Upcoming</span>
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/top-rated" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center justify-start gap-3 text-center py-2 px-4 rounded transition-colors duration-300 w-48 mx-auto">
                        <StarIcon className="w-5 h-5" />
                        <span>Top Rated</span>
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/now-playing" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center justify-start gap-3 text-center py-2 px-4 rounded transition-colors duration-300 w-48 mx-auto">
                        <PlayCircleIcon className="w-5 h-5" />
                        <span>Now Playing</span>
                    </span>
                </NavLink>
            </li>
            <li className="w-full">
                <NavLink to="/more" onClick={onClose} className={navLinkStyle}>
                    <span className="flex items-center justify-start gap-3 text-center py-2 px-4 rounded transition-colors duration-300 w-48 mx-auto">
                        <EllipsisHorizontalIcon className="w-5 h-5" />
                        <span>More</span>
                    </span>
                </NavLink>
            </li>
        </ul>
    );
}