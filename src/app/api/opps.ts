import { OppDetails } from '../auth/createopp/page';
import { User } from '../components/Providers/AuthProvider';

function dataUrlToFile(dataUrl: string, filename: string): File | undefined {
  const arr = dataUrl.split(',');
  if (arr.length < 2) {
    return undefined;
  }
  const mimeArr = arr[0].match(/:(.*?);/);
  if (!mimeArr || mimeArr.length < 2) {
    return undefined;
  }
  const mime = mimeArr[1];
  const buff = Buffer.from(arr[1], 'base64');
  return new File([buff], filename, { type: mime });
}

export const getOpps = async () => {
  const resp1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getopps`, {
    cache: 'no-store',
    method: 'GET',
  });
  const resp2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/fetchmbtis`,
    {
      cache: 'no-store',
      method: 'GET',
    },
  );

  const resp1json = await resp1.json();
  const resp2json = await resp2.json();

  const combined = [];
  for (const resp of resp1json) {
    for (const mbti of Object.entries(resp2json)) {
      if (resp.OpportunityName === mbti[0]) {
        resp.opp_mbti = mbti[1];
        combined.push(resp);
      }
    }
    resp.OpportunityLogo = dataUrlToFile(
      resp.OpportunityLogo,
      resp.OpportunityName + '.png',
    );
  }

  if (resp1.status !== 200 || resp2.status !== 200) {
    throw new Error(resp1.statusText + '\n' + resp2.statusText);
  }

  return combined;
};
const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
export const addOpps = (user: User) => async (form: OppDetails) => {
  const parsedMBTI = Object.entries(form.opp_mbti)
    .map(([key, value]) => (value ? key : ''))
    .join('');
  const data = {
    username: user.username,
    oppname: form.opp_name,
    opplogo: ((await convertToBase64(form.opp_logo[0])) as string) || '',
    oppdesc: form.opp_desc,
    oppshortdesc: form.opp_short_desc,
  };
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/addopp`, {
    cache: 'no-store',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const data2 = {
    username: user.username,
    oppname: form.opp_name,
    mbtis: parsedMBTI,
  };
  const resp2 = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/assignmbtis`,
    {
      cache: 'no-store',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data2),
    },
  );
  return resp.status == 200 && resp2.status == 200;
};
