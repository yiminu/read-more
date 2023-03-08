import prisma from '$lib/prisma';
import { error, json } from '@sveltejs/kit';

import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async () => {
	const collection = await prisma.collection.findMany();
	return json(collection);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { title, description, url } = await request.json();

	if (!title) {
		throw error(422, {
			message: 'wrong input'
		});
	}

	const createdEntry = await prisma.collection.create({
		data: {
			title,
			description,
			url
		}
	});
	return json(createdEntry);
}) satisfies RequestHandler;
