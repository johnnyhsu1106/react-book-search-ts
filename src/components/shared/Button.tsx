import { ReactNode } from 'react';

interface ButtonProps {
  className: string;
  children: ReactNode;
  onClick: () => void;
};


const Button = ({
  className='',
  onClick= () => {},
  children
}: ButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button;
