
import React, { useState, useEffect } from 'react';
import RuuviTag from './components/ruuvitag';

/*
 *{
  "trusted_tags": [
    {
      "id": "ef9d0e26ed52",
      "name": "ketturuuvi"
    },
    {
      "id": "ea87ebd4181c",
      "name": "parveke"
    }
  ]
}
 * */

const Frontend = () => {


  let currentTemp = 5;

  return <section>
    <p>current</p>
    <RuuviTag name='ketturuuvi' id='ef9d0e26ed52' type='indoor' />
  </section>;
};

export default Frontend;
