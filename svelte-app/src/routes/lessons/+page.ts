/**
 * Redirect /lessons to /course/n5
 * Maintains backward compatibility with old URLs
 */

import { redirect } from '@sveltejs/kit';

export function load() {
  throw redirect(301, '/course/n5');
}
