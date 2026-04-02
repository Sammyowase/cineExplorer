'use client';

import Link from 'next/link'
import { usePathname } from "next/navigation";
import { BiCameraMovie } from "react-icons/bi";

const Header = () => {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <header className="ticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-md">
            <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
                <Link
                    href='/'
                    className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
                        <BiCameraMovie className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-text-primary">
                        CineExplorer
                    </span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link
                        href='/'
                        className={`text-sm font-medium transition-colors ${isHome
                            ? 'text-brand'
                            : "text-text-secondary hover:text-text-primary"
                            }`}
                    >
                        Discover

                    </Link>
                </nav>

            </div>
        </header>
    );
}

export default Header;


