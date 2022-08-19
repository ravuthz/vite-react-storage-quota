import { useEffect, useState } from 'react';

import './App.css';

const ONE_MEG = 1000000;

function formatToMB(val) {
  const opts = {
    maximumFractionDigits: 0,
  };
  let result;
  try {
    result = new Intl.NumberFormat('en-us', opts).format(val / ONE_MEG);
  } catch (ex) {
    result = Math.round(val / ONE_MEG);
  }
  return `${result} MB`;
}


function App() {

  const { quota, setQuota } = useState();
  const { used, setUsed } = useState();
  const { remained, setRemained } = useState();

  const updateQuota = () => {
    navigator.storage.estimate().then(({quota, usage }) => {
      const remaining = quota - usage;
      setQuota(quota);
      setUsed(usage);
      setRemained(remaining);
      // elemQuota.textContent = formatToMB(storage.quota);
      // elemUsed.textContent = formatToMB(storage.usage);
      // elemRemaining.textContent = formatToMB(remaining);
    }).catch((err) => {
      console.error('Unable to update quota ', err);
    });
  }

  useEffect(() => {
    setTimeout(updateQuota(), 500);
  }, []);

  return (
    <div className="App">
      <p>Quota: {formatToMB(quota)}</p>
      <p>Used: {formatToMB(used)}</p>
      <p>Remaining: {formatToMB(remained)}</p>
    </div>
  )
}

export default App
