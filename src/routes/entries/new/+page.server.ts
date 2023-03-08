import type { Collection } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const data = await fetch('/api/collections');
	const collectionsData = (await data.json()) as Collection[];
	return {
		collections: collectionsData
	};
}) satisfies PageServerLoad;
