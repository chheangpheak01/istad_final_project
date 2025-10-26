import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function MainLayout() {
    return (
        <main>
            <Navbar />
                <Outlet/>
           <Footer/>
        </main>
    )
};
