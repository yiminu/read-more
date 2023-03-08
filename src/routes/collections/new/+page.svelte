<script lang="ts">
	import { goto } from '$app/navigation';

	import type { Collection } from '@prisma/client';

	const newCollection: Partial<Collection> = {
		title: '',
		description: '',
		url: ''
	};

	const handleSubmit = async () => {
		const res = await fetch('/api/collections', {
			method: 'POST',
			body: JSON.stringify(newCollection),
			headers: {
				'content-type': 'application/json'
			}
		});
		if (res.ok) {
			const createdCollection = (await res.json()) as Collection;
			goto(`/collections/${createdCollection.id}`);
		}
	};
</script>

<svelte:head>
	<title>New Collection</title>
</svelte:head>

<div>
	<h1>New Collection</h1>
</div>
<div>
	<form on:submit|preventDefault="{handleSubmit}">
		<div>
			<label for="title">title:</label>
			<input id="title" type="text" bind:value="{newCollection.title}" />
		</div>
		<div>
			<label for="description">description:</label>
			<input type="text" bind:value="{newCollection.description}" />
		</div>
		<div>
			<label for="url">url:</label>
			<input id="url" type="text" bind:value="{newCollection.url}" />
		</div>
		<div>
			<button type="submit">Create Collection</button>
		</div>
	</form>
</div>
