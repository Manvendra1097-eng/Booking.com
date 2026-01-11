import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '@/context/authContext';
import Text from './ui/Text';
import { LogOut } from 'lucide-react';
import { useLogout } from '@/hooks/useLogout';

const AvatarDropDownMenu = () => {
  const { profile } = useAuth();
  const { logout, isPending } = useLogout();

  const getNameInitials = () => {
    const { name } = profile;
    return name
      ?.split(' ')
      .map((word) => word[0])
      .join('');
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className="focus-visible:ring-0 focus-visible:outline-0 cursor-pointer"
      >
        <Avatar className="h-10 w-10">
          <AvatarImage src={profile.photo} alt="@shadcn" />
          <AvatarFallback>{getNameInitials()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          <div className="px-2">
            <Text variant="smh">{profile.name}</Text>
            <Text variant="sml">{profile.email}</Text>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem
          onClick={logout}
          disabled={isPending}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isPending ? 'Logging out...' : 'Logout'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropDownMenu;
