import { Link } from "react-router-dom";
import logo from '../../utilities/assets/logo.png';

export function Logo() {
    return (
        <section className='flex items-center gap-2'>
            <Link to={"/"}>
                <img src={logo} alt="Movie Logo" className="w-12 h-12 object-cover rounded-full" />
            </Link>
            <span className='text-2xl font-semibold'>Istad Movie</span>
        </section>
    );
}