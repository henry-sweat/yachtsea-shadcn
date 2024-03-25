import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { SignOut } from './auth-components';
import { GearIcon } from '@radix-ui/react-icons';

export default async function SettingsButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <GearIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-36' align='end' forceMount>
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
