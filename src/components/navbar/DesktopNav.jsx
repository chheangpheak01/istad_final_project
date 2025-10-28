import { NavLink } from "react-router-dom";
import {
    HomeIcon,
    FireIcon,
    CalendarDaysIcon,
    StarIcon,
    PlayCircleIcon,
    EllipsisHorizontalIcon
} from "@heroicons/react/24/solid";

export function DesktopNav() {
    const navLinkStyle = ({ isActive }) =>
        isActive ? "text-sky-400" : "hover:text-sky-400";

    return (
        <ul className='hidden md:flex gap-x-6 items-center'>
            <li><NavLink to="/" className={navLinkStyle}><HomeIcon className="w-5 h-5 inline mr-1" />Home</NavLink></li>
            <li><NavLink to="/popular" className={navLinkStyle}><FireIcon className="w-5 h-5 inline mr-1" />Popular</NavLink></li>
            <li><NavLink to="/upcoming" className={navLinkStyle}><CalendarDaysIcon className="w-5 h-5 inline mr-1" />Upcoming</NavLink></li>
            <li><NavLink to="/top-rated" className={navLinkStyle}><StarIcon className="w-5 h-5 inline mr-1" />Top Rated</NavLink></li>
            <li className='hidden lg:block'><NavLink to="/now-playing" className={navLinkStyle}><PlayCircleIcon className="w-5 h-5 inline mr-1" />Now Playing</NavLink></li>
            <li className='hidden xl:block'><NavLink to="/more" className={navLinkStyle}><EllipsisHorizontalIcon className="w-5 h-5 inline mr-1" />More</NavLink></li>
        </ul>
    );
}