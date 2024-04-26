export default async function myFetch({ url, method, params, headers }: { url: string, method: 'GET' | 'POST', params?: any; headers?: any; }) {
  const res = await fetch(url, {
    method,
    headers,
  });

  if (!res.ok) {
    return Promise.reject({ ok: res.ok, data: null, message: '', error: true });
  }

  const json = await res.json();

  return { ok: res.ok, data: json }
}

