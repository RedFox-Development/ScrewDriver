
const fi = {
  header: ['RuuviTagit', 'viimeisimmät mittaukset'],
  when: ['Mitattu', 'sitten'],
  driver_label: 'Ruuvipenkki',
  humidity_label: 'Suhteellinen ilmankosteus',
  humidity_label_alt: 'Ilmankosteus',
  pressure_label: 'Ilmanpaine',
  signal_label: 'Signaali',
  battery_label: 'Pariston jännite',
  battery_label_alt: 'Jännite'
};

const en = {
  header: ['RuuviTags', 'latest measurements'],
  when: ['Measured', 'ago'],
  driver_label: 'ScrewDriver',
  humidity_label: 'Relative humidity',
  humidity_label_alt: 'Humidity',
  pressure_label: 'Atmospheric pressure',
  pressure_label_alt: 'Pressure',
  signal_label: 'RSSI',
  signal_label_alt: 'Signal',
  battery_label: 'Battery voltage',
  battery_label_alt: 'Battery'
};

export const getTexts = (lang: string) => {
  return lang === 'fi' ? fi : en;
};
