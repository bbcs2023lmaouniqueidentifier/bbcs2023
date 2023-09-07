export const getOpps = async () => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getopps`, {
    cache: 'no-store',
    method: 'GET',
  });

  if (resp.status !== 200) {
    throw new Error(resp.statusText);
  }

  return resp.json();
};

export const addOpps = (user: any) => async (form: any) => {
  const data = {
    'username': user.username,
    'oppname': form.title,
    'opplogo': Buffer.from(form.logo).toString('base64'),
    'oppdesc': form.description
  }
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/addopps`, {
    cache: 'no-store',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const data2 = {
    'username': user.username,
    'oppname': form.title,
    'mbtis': form.mbti
  }
  const resp2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assignmbtis`, {
    cache: 'no-store',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data2),
  });
  return resp.status == 200 && resp2.status == 200;
};
