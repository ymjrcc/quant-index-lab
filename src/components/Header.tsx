'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-800 to-gray-600 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <svg 
              className="h-8 w-8 text-blue-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            <span className="ml-2 text-xl font-bold text-white">
              指数量化实验室
            </span>
          </div>

          <nav className="flex space-x-8">
            <Link 
              href="/"
              className={`${pathname === '/' ? 'text-white' : 'text-gray-400'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              首页
            </Link>
            <Link 
              href="/quant"
              className={`${pathname === '/quant' ? 'text-white' : 'text-gray-400'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              量化策略
            </Link>
            <Link 
              href="/about"
              className={`${pathname === '/about' ? 'text-white' : 'text-gray-400'} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              关于
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
