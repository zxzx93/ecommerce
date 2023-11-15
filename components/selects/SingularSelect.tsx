import { Controller, useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ICategories } from 'interfaces/back/Categories.interface';

import styles from './styles.module.scss';

interface SingularSelectProps {
  parentCategories: ICategories[];
  name: string;
}

function SingularSelect({ parentCategories, name }: SingularSelectProps) {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext();

  return (
    <div style={{ marginBottom: '1rem' }}>
      <FormControl
        variant='outlined'
        className={`${styles.select} ${
          touchedFields.name && errors[name] && styles.error__select
        }`}
      >
        <InputLabel id='subCategory'>카테고리</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Select
              {...field}
              labelId='subCategory'
              id='subCategory'
              label='subCategory'
            >
              <MenuItem value=''>선택 안함</MenuItem>
              {parentCategories.map(option => (
                <MenuItem key={option._id} value={option._id || option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      {touchedFields.name && errors[name] && (
        <p className={styles.error__msg}>
          <ErrorMessage name={`${errors[name]}`} />
        </p>
      )}
    </div>
  );
}

export default SingularSelect;
