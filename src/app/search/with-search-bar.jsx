import { Outlet } from 'react-router';
import Search from '../feature/search';

function WithSearchBar() {
  return (
    <div>
      <Search className="-mt-4" />
      <Outlet />
    </div>
  );
}

export default WithSearchBar;
