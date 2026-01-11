import Search from '@/app/feature/search';

const WithSearchLayout = ({ children }) => {
  return (
    <div >
      <Search />
      <>{children}</>
    </div>
  );
};

export default WithSearchLayout;
