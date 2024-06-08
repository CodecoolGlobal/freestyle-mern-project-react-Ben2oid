import { useEffect, useState } from "react";

export const useFetchData = (
  runOnLoad,
  url,
  httpMethod,
  dataToSend = null,
  authToken = null
) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  //TODO: Rewrite it so that it will only set data if response is ok
  const fetchData = (url, httpMethod, dataToSend) => {
    setLoading(true);
    fetch(url, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
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
