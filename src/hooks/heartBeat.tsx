import React, {useState, useEffect } from 'react';

export function useHeartBeat() {
  const [beat, setBeat] = useState(0);

  useEffect (() => {
    setTimeout(() => {
      setBeat((beat) => beat + 1);
    }, 1000);

    return () => clearTimeout(beat);
  });

  return {beat}
}