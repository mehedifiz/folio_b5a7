const fetchApi = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}${url}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    credentials: "include", 
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data?.message || `Error ${res.status}`);
  }

  return data;
};

export default fetchApi;
