import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3001/penginapan');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setData(json);
                setLoading(false);
                setError(null);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                setData(null);
            }
        };

        if (url) {
            fetchData();
        }
    }, [url]); // Re-fetch jika URL berubah

    return { data, loading, error };
}

export default useFetch;
