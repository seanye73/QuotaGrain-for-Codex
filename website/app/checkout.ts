import { supporterURL } from './product-links';

// Checkout lives on the website, never inside the signed Mac app.
// The public fallback points to the same GitHub support entry as the app.
// Test and Live remain explicit hosted-checkout build options.
const mode = process.env.NEXT_PUBLIC_QG_CHECKOUT_MODE ?? 'contact';
if (!['contact', 'test', 'live'].includes(mode)) throw new Error('Unknown checkout mode.');
if (mode === 'test' && process.env.QG_SEARCH_INDEXABLE === '1') {
  throw new Error('An indexable public website cannot use Test checkout.');
}
const testURL = 'https://pancake.waffo.ai/store/x73-sean-g4egu1yo/product/PROD_6LLeD2gqABEfgjJfl3vG8j?type=onetime&currency=USD&test=true';
function verifiedLiveURL(): string {
  const value = process.env.NEXT_PUBLIC_QG_LIVE_CHECKOUT_URL;
  if (!value) throw new Error('Live mode requires the verified Live product URL.');
  const url = new URL(value);
  if (url.origin !== 'https://pancake.waffo.ai' || url.username || url.password || url.hash ||
      !url.pathname.startsWith('/store/x73-sean-g4egu1yo/product/') ||
      url.searchParams.get('type') !== 'onetime' || url.searchParams.get('currency') !== 'USD' ||
      [...url.searchParams.keys()].some(key => !['type', 'currency'].includes(key))) {
    throw new Error('Live checkout must use the verified Waffo USD one-time product URL without Test or session parameters.');
  }
  return url.href;
}
export const checkoutAvailable = mode !== 'contact';
export const checkoutURL = mode === 'live' ? verifiedLiveURL()
  : mode === 'test' ? testURL : supporterURL;
