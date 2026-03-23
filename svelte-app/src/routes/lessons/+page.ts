/**
 * Redirect /lessons to /course/n5
 * Maintains backward compatibility with old URLs
 */

import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export function load() {
  throw redirect(301, `${base}/course/n5`);
}
