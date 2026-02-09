import { Link, Outlet, useLocation } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Home, Shirt } from 'lucide-react';
import { Toaster } from '@/app/components/ui/sonner';

export default function Root() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="size-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Shirt className="size-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Tủ Đồ Thông Minh
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button
                  variant={location.pathname === '/' ? 'default' : 'ghost'}
                  className={location.pathname === '/' ? 'gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'gap-2'}
                >
                  <Home className="size-4" />
                  <span className="hidden sm:inline">Trang chủ</span>
                </Button>
              </Link>
              <Link to="/wardrobe">
                <Button
                  variant={location.pathname === '/wardrobe' ? 'default' : 'ghost'}
                  className={location.pathname === '/wardrobe' ? 'gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : 'gap-2'}
                >
                  <Shirt className="size-4" />
                  <span className="hidden sm:inline">Tủ đồ</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <Outlet />

      {/* Toast Notifications */}
      <Toaster position="top-center" />
    </div>
  );
}
