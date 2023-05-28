import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import styles from './styles.module.scss';

interface AccordianProps {
  details: any;
}
function Accordian({ details }: AccordianProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={styles.infos__accordian}>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        className={styles.accordian}
      >
        <AccordionSummary
          className={styles.accordian__summary}
          expandIcon={<AiFillCaretDown />}
          aria-controls='panel1d-content'
          id='panel1d-header'
        >
          디테일
        </AccordionSummary>
        <AccordionDetails className='scrollbar'>
          {details.slice(1, details.length).map(info => (
            <div className={styles.infos__accordian_grid}>
              <span>{info.name}:</span>
              <span>{info.value}</span>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Accordian;
