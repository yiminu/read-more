import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params }) => {
	const id = `${params.id}`;

	const collection = await prisma.collection.findUnique({
		where: { id: id },
		include: { entries: true }
	});
	return json(collection);
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	const id = `${params.id}`;

	const deletedCollection = await prisma.collection.delete({
		where: { id: id }
	});
	return json(deletedCollection);
}) satisfies RequestHandler;

export const PUT = (async ({ params, request }) => {
	const id = `${params.id}`;

	const { title, description, url } = await request.json();

	const updatedCollection = await prisma.collection.update({
		where: {
			id: id
		},
		data: {
			title,
			description,
			url
		}
	});
	return json(updatedCollection);
}) satisfies RequestHandler;
