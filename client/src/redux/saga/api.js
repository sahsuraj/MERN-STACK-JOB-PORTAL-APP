export const getFetchApi = async (userId) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

export const getFetchApiAll = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
};
