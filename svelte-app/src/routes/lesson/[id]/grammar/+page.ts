/**
 * Redirect /lesson/[id]/grammar to /course/n5/lesson/[id]/grammar
 * Maintains backward compatibility with old URLs
 */

import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  throw redirect(301, `${base}/course/n5/lesson/${params.id}/grammar`);
};
