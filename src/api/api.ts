import db from "../mock/db.json";

type DbType = typeof db;

export async function apiRequest(endpoint: string) {
  const [path, queryString] = endpoint.split("?");

  const resourceName = path.replace("/", "") as keyof DbType;
  const resource = db[resourceName];

  if (!resource) {
    throw new Error(`Resource not found: ${resourceName}`);
  }

  let data = Array.isArray(resource) ? [...resource] : resource;

  if (queryString && Array.isArray(data)) {
    const params = new URLSearchParams(queryString);

    data = data.filter((item: any) => {
      for (const [key, value] of params.entries()) {
        if (String(item[key]) !== value) {
          return false;
        }
      }

      return true;
    });
  }

  return Promise.resolve(data);
}
