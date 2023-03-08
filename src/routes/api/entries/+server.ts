import prisma from '$lib/prisma';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	const { title, description, url, transcription, collectionId, collectionTitle } = await request.json();

	const entryRequirement = title.length > 0 && transcription.length > 0;
	const collectionRequirement = collectionId.length > 0 ? true : collectionTitle.length > 0 ? true : false;

	if (!(entryRequirement && collectionRequirement)) {
		throw error(422, {
			message: 'wrong input'
		});
	}

	const createdEntry = await prisma.entry.create({
		data: {
			title,
			description,
			url,
			transcription,
			collection: {
				connectOrCreate: {
					where: {
						id: collectionId
					},
					create: {
						title: collectionTitle
					}
				}
			}
		},
		include: {
			collection: true
		}
	});
	return json(createdEntry);
}) satisfies RequestHandler;
