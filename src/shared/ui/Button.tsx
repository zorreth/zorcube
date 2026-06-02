import clsx from 'clsx';
import classes from './Button.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  return <button className={clsx(classes.button, className)} {...props} />;
}
