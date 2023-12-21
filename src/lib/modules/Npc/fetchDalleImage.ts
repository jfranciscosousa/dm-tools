import { OPENAI_KEY } from "$env/static/private";

type DalleRequest = {
  model: string;
  prompt: string;
  n: number;
  size: string;
};

type DalleResponse = {
  created: number;
  data: { revised_prompt: string; url: string }[];
};

export async function fetchDalleImage(requestData: DalleRequest): Promise<DalleResponse> {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`
    },
    body: JSON.stringify(requestData)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
