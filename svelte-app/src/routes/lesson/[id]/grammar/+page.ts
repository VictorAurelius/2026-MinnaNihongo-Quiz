/**
 * Redirect /lesson/[id]/grammar to /course/n5/lesson/[id]/grammar
 * Maintains backward compatibility with old URLs
 */

import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  throw redirect(301, `/course/n5/lesson/${params.id}/grammar`);
};
