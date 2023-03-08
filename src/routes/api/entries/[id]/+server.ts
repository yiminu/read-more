import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ params }) => {
	const id = `${params.id}`;

	const entry = await prisma.entry.findUnique({
		where: { id: id },
		include: { collection: true }
	});
	return json(entry);
}) satisfies RequestHandler;

export const DELETE = (async ({ params }) => {
	const id = `${params.id}`;

	const deletedEntry = await prisma.entry.delete({
		where: { id: id }
	});
	return json(deletedEntry);
}) satisfies RequestHandler;

export const PUT = (async ({ params, request }) => {
	const id = `${params.id}`;

	const { title, description, url, transcription } = await request.json();

	const updatedEntry = await prisma.entry.update({
		where: {
			id: id
		},
		data: {
			title,
			description,
			url,
			transcription
		}
	});
	return json(updatedEntry);
}) satisfies RequestHandler;
