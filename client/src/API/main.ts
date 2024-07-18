import axios from "axios";
export async function getUsers(email?: string, num?: string) {
  let urlQuery = [];

  if (email) urlQuery.push(`email=${email}`);
  if (num) urlQuery.push(`number=${num}`);

  const url = "http://localhost/api/users/?" + urlQuery.join("&");

  return await axios
    .get(url)
    .catch((error) => console.error(error.message))
    .then((res) => res?.data);
}
