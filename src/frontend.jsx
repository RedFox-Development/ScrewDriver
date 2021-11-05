
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

  const tags = [
    {
      "id": "ef9d0e26ed52",
      "name": "ketturuuvi",
      "mode": "indoor"
    },
    {
      "id": "ea87ebd4181c",
      "name": "parveke-w",
      "mode": "outdoor-winter"
    },
    {
      "id": "ea87ebd4181c",
      "name": "parveke-s",
      "mode": "outdoor-summer"
    }

  ];


  let currentTemp = 5;

  return <section style={{display: 'flex',flexDirection: 'column'}}>
    <h1 style={{marginLeft: '1rem'}}>tagit - viimeisimmät mittaukset</h1>
    <section style={{display: 'inline-flex', justifyContent: 'space-around'}}>{tags.map(tag => <RuuviTag name={tag.name} id={tag.id} tagMode={tag.mode} driver={process.env.REACT_APP_DRIVER}/>)}</section>
  </section>;
};

export default Frontend;
