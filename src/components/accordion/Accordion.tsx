import { PropsWithChildren, useState } from "react";
import './Accordion.css';
interface AccordionProps {
  title: string;
}

export const Accordion = ({title, children}: PropsWithChildren<AccordionProps>): JSX.Element | null => {
  
  let currentTitle = title;
  const [open, setOpen] = useState(false);
  
  const onClickHandler = (): void => {
    setOpen(!open);
  };

  const classes: string[] = ['accordion'];
  if (open) {
    currentTitle = 'Click to close the panel';
    classes.push('active');
  }

  return (
    <div className={classes.join(' ')}>
      <h2 className="accordion-title cursor-pointer" onClick={onClickHandler}>{currentTitle}</h2>
      <div className="accordion-child">
        {children}
      </div>
    </div>
  );
}