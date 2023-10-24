import { ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

const Container = ({
  className='', 
  children,
  onClick= () => {}
}: ContainerProps) => {
  return (
    <div 
      className={className}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Container;
