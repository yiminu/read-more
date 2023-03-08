import type { Collection, Entry } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params: { id } }) => {
	const data = await fetch(`/api/collections/${id}`);
	const collectionData = (await data.json()) as Collection & { entries: Entry[] };
	return collectionData;
}) satisfies PageServerLoad;
