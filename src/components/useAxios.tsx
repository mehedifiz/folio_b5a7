const stored = localStorage.getItem("auth");
const tokenObj = stored ? JSON.parse(stored) : null;
const token = tokenObj?.token ?? "";

const fetchApi = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`http://localhost:7000/api${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    // Throw with backend message if exists
    throw new Error(data?.message || `Error ${res.status}`);
  }

  return data;
};

export default fetchApi;
