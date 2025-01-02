import querystring from 'node:querystring';

const storeAPIOrigin = 'https://store.steampowered.com';

/**
 * Doc: https://partner.steamgames.com/doc/store/getreviews
 *
 * @returns {Promise<any>}
 */
export async function getReviews({ appid, ...params }) {
  const path = `/appreviews/${appid}`;
  const resp  = await fetch(`${storeAPIOrigin}${path}?${querystring.stringify({...params, json: '1'})}`);
  return await resp.json();
}