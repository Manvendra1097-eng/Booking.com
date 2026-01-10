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

const AvatarDropDownMenu = () => {
  const { profile } = useAuth();

  const getNameInitials = () => {
    const { name } = profile;
    return name
      .split(' ')
      .map((word) => word[0])
      .join('');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-0 focus-visible:outline-0 cursor-pointer">
        <Avatar className="h-10 w-10">
          <AvatarImage src={profile.photo} alt="@shadcn" />
          <AvatarFallback>{getNameInitials()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropDownMenu;
