
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
  const cold_months = [0, 1, 2, 3, 9, 10, 11];
  const tags = [
    {
      "id": "ef9d0e26ed52",
      "name": "ketturuuvi",
      "mode": "indoor"
    },
    {
      "id": "ea87ebd4181c",
      "name": "parveke",
      "mode": "outdoor"
    }
  ];

  function isWinterUsable(mode) {
    const currentDate = new Date();
    return mode === 'outdoor' && cold_months.includes(currentDate.getMonth());
  }

  return <section style={{display: 'flex',flexDirection: 'column', alignItems: 'center'}}>
    <h1 style={{marginLeft: '1rem'}}>tagit - viimeisimmät mittaukset</h1>
    <section style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
      {tags.map(tag => {
        if (isWinterUsable(tag.mode)) {
	  return <RuuviTag name={tag.name} id={tag.id} tagMode={`${tag.mode}-winter`} driver={process.env.REACT_APP_DRIVER}/>;
	} else {
	  return <RuuviTag name={tag.name} id={tag.id} tagMode={tag.mode} driver={process.env.REACT_APP_DRIVER}/>;
	}
      })}
    </section>
  </section>;
};

export default Frontend;
