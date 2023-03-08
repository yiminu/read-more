import type { Collection, Entry } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params: { id } }) => {
	const data = await fetch(`/api/entries/${id}`);
	const entryData = (await data.json()) as Entry & { collection: Collection };
	return entryData;
}) satisfies PageServerLoad;
