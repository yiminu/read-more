<script lang="ts">
	import { goto } from '$app/navigation';

	import type { Collection, Entry } from '@prisma/client';

	export let data: {
		collections: Collection[];
	};

	const newEntry: Partial<Entry> & {
		collectionTitle: string;
	} = {
		title: '',
		description: '',
		url: '',
		transcription: '',
		collectionId: '',
		collectionTitle: ''
	};

	const handleSubmit = async () => {
		const res = await fetch('/api/entries', {
			method: 'POST',
			body: JSON.stringify(newEntry),
			headers: {
				'content-type': 'application/json'
			}
		});
		if (res.ok) {
			const createdEntry = (await res.json()) as Entry;
			goto(`/entries/${createdEntry.id}`);
		}
	};
</script>

<svelte:head>
	<title>New Entry</title>
</svelte:head>

<div>
	<h1>New Entry</h1>
</div>
<div>
	<form on:submit|preventDefault="{handleSubmit}">
		<div>
			<label for="title">title:</label>
			<input id="title" type="text" bind:value="{newEntry.title}" />
		</div>
		<div>
			<label for="description">description:</label>
			<input id="description" type="text" bind:value="{newEntry.description}" />
		</div>
		<div>
			<label for="url">url:</label>
			<input id="url" type="text" bind:value="{newEntry.url}" />
		</div>
		<div>
			<label for="transcription">transcription:</label>
			<textarea id="transcription" bind:value="{newEntry.transcription}"></textarea>
		</div>
		<div>
			<label for="collection">existing collection:</label>
			<select id="collection" bind:value="{newEntry.collectionId}">
				<option value="" selected>-</option>
				{#each data.collections as collection (collection.id)}
					<option value="{collection.id}">{collection.title}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="new-collection">new collection:</label>
			<input id="new-collection" type="text" bind:value="{newEntry.collectionTitle}" />
		</div>
		<div>
			<button type="submit">Create Entry</button>
		</div>
	</form>
</div>
