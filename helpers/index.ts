export const fetchData = async <ResponseType>(API_URL: string) => {
  const response = await fetch(API_URL);
  return (await response.json()) as ResponseType;
};
