// import { keysToSnakeCase } from "neetocist";
import { omit, pipe, toPairs } from "ramda";

export const buildUrl = (route, params) => {
  const placeHolders = [];
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeHolders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = pipe(omit(placeHolders))(params);

  const queryString = new URLSearchParams(queryParams).toString();

  return queryString ? `${route}?${queryString}` : route;
};
