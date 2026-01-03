import { useAuth } from '@/context_provider/auth-context-provider';
import { Link, useNavigate } from 'react-router';
import { devLog } from '@/lib/utils';
import { PATH } from '@/config/app.path';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Calendar,
  Heart,
  Settings,
  LogOut,
  CreditCard,
  Bell,
  Shield,
} from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { da } from 'date-fns/locale';

function UserDropdown() {
  const {
    user: { data },
    isAuthenticated,
    logout,
  } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated || !data) {
    return (
      <Button asChild variant="ghost" size="sm">
        <Link to={PATH.SIGN_IN}>Sign In</Link>
      </Button>
    );
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (data.name) {
      return data.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return data.email?.[0]?.toUpperCase() || '?';
  };

  // Get user display name
  const getUserDisplayName = () => {
    return data.name || data.email?.split('@')[0] || 'User';
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();

      toast.success('Logged out successfully', {
        description: 'See you soon!',
      });

      // Navigate to home page after logout
      setTimeout(() => {
        navigate(PATH.HOME, { replace: true });
      }, 100);
    } catch (error) {
      devLog('error', 'Logout error:', error);

      toast.error('Logout failed', {
        description: 'Please try again',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={data.profilePicture}
              alt={data.name || data.email}
            />
            <AvatarFallback className="bg-blue-600 text-white font-semibold">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" forceMount>
        {/* User Info Section */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 p-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {getUserDisplayName()}
              </p>
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {data.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Account Section */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={PATH.PROFILE} className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to={PATH.BOOKINGS} className="cursor-pointer">
              <Calendar className="mr-2 h-4 w-4" />
              <span>My Bookings</span>
              {data.pendingBookings > 0 && (
                <Badge className="ml-auto" variant="secondary">
                  {data.pendingBookings}
                </Badge>
              )}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/trips" className="cursor-pointer">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Trips</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Preferences Section */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/favorites" className="cursor-pointer">
              <Heart className="mr-2 h-4 w-4" />
              <span>Favorites</span>
              {data.favoriteCount > 0 && (
                <Badge className="ml-auto" variant="secondary">
                  {data.favoriteCount}
                </Badge>
              )}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/notifications" className="cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              {data.unreadNotifications > 0 && (
                <Badge className="ml-auto" variant="destructive">
                  {data.unreadNotifications}
                </Badge>
              )}
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/payment-methods" className="cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Payment methods</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Business Section */}
        {data.isHost && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/host/dashboard" className="cursor-pointer">
                  <Shield className="mr-2 h-4 w-4" />
                  <span>Host Dashboard</span>
                  <Badge className="ml-auto" variant="outline">
                    Pro
                  </Badge>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="/host/listings" className="cursor-pointer">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>My Listings</span>
                  <Badge className="ml-auto" variant="secondary">
                    {data.listingCount || 0}
                  </Badge>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Settings & Logout */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
