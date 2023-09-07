export const getOpps = async () => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getopps`, {
    cache: 'no-store',
    method: 'GET',
  });

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  return resp.body;
};

export const addOpps = async () => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/addopps`, {
    cache: 'no-store',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  return resp.status == 200;
};
