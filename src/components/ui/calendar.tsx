
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { pickersLayoutClasses } from '@mui/x-date-pickers/PickersLayout';
import { PickersActionBarProps } from '@mui/x-date-pickers/PickersActionBar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { esES } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/es';
import { Dayjs } from 'dayjs';



interface CalendarProps {
  label: number;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

function ActionList(props: PickersActionBarProps) {
  const { onAccept, onClear, onCancel, onSetToday, className } = props;
  const actions = [
    { text: 'Aceptar', method: onAccept },
    { text: 'Limpiar', method: onClear },
    { text: 'Cancelar', method: onCancel },
    { text: 'Hoy', method: onSetToday },
  ];
  return (
    // Propagate the className such that CSS selectors can be applied
    <List className={className}>
      {actions.map(({ text, method }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={method}>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default function Calendar({ value, onChange, label }: CalendarProps) {

  return (
    <LocalizationProvider 
      dateAdapter={AdapterDayjs}
      adapterLocale='es'
      localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
      >
      <DatePicker
        label={`Tiene ${label} años`}
        value={value} 
        onChange={ onChange }
        slotProps={{
          layout: {
            sx: {
              [`.${pickersLayoutClasses.actionBar}`]: {
                gridColumn: 3,
                gridRow: 2,
              },
            },
          },
        }}
        slots={{
          actionBar: ActionList,
        }}
      />  
    </LocalizationProvider>    
  );
}