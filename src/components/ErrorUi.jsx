import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Link } from 'react-router';

const ErrorUi = ({ className }) => {
  return (
    <div
      className={cn(
        'h-[80vh] flex flex-col gap-2 justify-center items-center',
        className
      )}
    >
      <p className="text-sm font-semibold text-muted-foreground leading-relaxed">
        Oops! something went wrong
      </p>
      <Button asChild variant="outline">
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};

export default ErrorUi;
