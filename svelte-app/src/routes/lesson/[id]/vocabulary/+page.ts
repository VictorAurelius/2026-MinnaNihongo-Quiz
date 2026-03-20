/**
 * Redirect /lesson/[id]/vocabulary to /course/n5/lesson/[id]/vocabulary
 * Maintains backward compatibility with old URLs
 */

import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  throw redirect(301, `${base}/course/n5/lesson/${params.id}/vocabulary`);
};
