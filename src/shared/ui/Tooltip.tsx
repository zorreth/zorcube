import classes from './Tooltip.module.scss';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className={classes.wrapper}>
      {children}
      <span className={classes.tooltip}>{content}</span>
    </div>
  );
}
