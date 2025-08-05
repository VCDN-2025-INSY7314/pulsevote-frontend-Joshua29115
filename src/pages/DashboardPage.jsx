import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage({ token, role }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (token && role === 'admin') {
      axios.get('https://localhost:5001/api/protected', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setData(res.data))
        .catch(err => console.error(err));
    }
  }, [token, role]);

  return (
    <div>
      <h2>Dashboard</h2>
      {role === 'admin' && data ? <p>{data.message}</p> : <p>No access to protected data or loading...</p>}
    </div>
  );
}

export default DashboardPage;