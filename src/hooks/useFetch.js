import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const urL = url;
    const fetchData = async () => {
      try {
        const response = await axios.get(urL);
        setData(response.data);
        //console.log("result:", response.data)
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}
