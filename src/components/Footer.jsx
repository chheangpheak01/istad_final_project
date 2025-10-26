import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white w-full">
            <section className="max-w-full mx-auto px-10 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">

                <address className="space-y-4 not-italic">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Movie App
                    </h2>
                    <div className="space-y-2 text-gray-300">
                        <p className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-sm">
                                No. 24, Street 562, Sangkat Boeung Kak I,<br />
                                Khan Toul Kork, Phnom Penh, Cambodia
                            </span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-sm">
                                <strong className="font-medium text-white">Email:</strong> movieapp.istad@gmail.com
                            </span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-sm">
                                <strong className="font-medium text-white">Phone:</strong> (+855) 95-990-910, (+855) 93-990-910
                            </span>
                        </p>
                    </div>
                </address>

                <nav aria-label="Support links" className="space-y-4">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Support</h2>
                    <ul className="space-y-3" role="list">
                        <li>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                                <span className="w-2 h-0.5 bg-blue-400 mr-2 group-hover:w-4 transition-all duration-300"></span>
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                                <span className="w-2 h-0.5 bg-blue-400 mr-2 group-hover:w-4 transition-all duration-300"></span>
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group">
                                <span className="w-2 h-0.5 bg-blue-400 mr-2 group-hover:w-4 transition-all duration-300"></span>
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>

                <section aria-label="Social media links" className="space-y-4">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Follow Us</h2>
                    <nav aria-label="Social media platforms" className="grid grid-cols-2 gap-4">
                        <a href="#" className="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-300 group">
                            <span className="p-2 bg-blue-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <FaFacebookF size={16} className="text-white" />
                            </span>
                            <span className="text-xs mt-2 text-gray-300 group-hover:text-white">Facebook</span>
                        </a>

                        <a href="#" className="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-300 group">
                            <span className="p-2 bg-blue-400 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <FaTwitter size={16} className="text-white" />
                            </span>
                            <span className="text-xs mt-2 text-gray-300 group-hover:text-white">Twitter</span>
                        </a>

                        <a href="#" className="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-300 group">
                            <span className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <FaInstagram size={16} className="text-white" />
                            </span>
                            <span className="text-xs mt-2 text-gray-300 group-hover:text-white">Instagram</span>
                        </a>

                        <a href="#" className="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all duration-300 group">
                            <span className="p-2 bg-red-600 rounded-full group-hover:scale-110 transition-transform duration-300">
                                <FaYoutube size={16} className="text-white" />
                            </span>
                            <span className="text-xs mt-2 text-gray-300 group-hover:text-white">YouTube</span>
                        </a>
                    </nav>
                </section>
            </section>

            <div className="border-t border-gray-700/50 py-4 text-center">
                <p className="text-gray-400 text-sm">
                    &copy; 2025 <span className="font-semibold text-white">Movie App</span>. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};