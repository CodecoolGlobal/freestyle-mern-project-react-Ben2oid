import { useEffect, useState } from "react";

export const useFetchData = (runOnLoad, url, httpMethod, dataToSend = null) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = (url, httpMethod, dataToSend) => {
    setLoading(true);
    fetch(url, {
      method: httpMethod,
      headers: { "Content-Type": "application/json" },
      body: dataToSend,
    })
      .then((response) => response.json())
      .then((jsonData) => {
        console.log("recieved:", jsonData);
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => setError(error));
  };

  useEffect(() => {
    if (runOnLoad) {
      fetchData(url, httpMethod, dataToSend);
    } else {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, error, fetchData };
};
