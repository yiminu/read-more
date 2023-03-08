<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';

	import type { Collection, Entry } from '@prisma/client';

	export let data: Entry & { collection: Collection };

	let showActions = false;

	const deleteEntry = async () => {
		if (!confirm(`Do you really want to delete ${data.title} entry?`)) return;
		const res = await fetch(`/api/entries/${data.id}`, {
			method: 'DELETE'
		});
		if (res.ok) {
			goto(`/collections/${data.collectionId}`);
		}
	};

	const cloneEntry = (): Entry => {
		return {
			...data
		};
	};
	type ViewerMode = 'view' | 'edit';
	let currentMode: ViewerMode = 'view';
	let editedEntry: Entry;
	editedEntry = cloneEntry();
	const saveEntry = async () => {
		const res = await fetch(`/api/entries/${editedEntry.id}`, {
			method: 'PUT',
			body: JSON.stringify(editedEntry),
			headers: {
				'content-type': 'application/json'
			}
		});
		if (res.ok) {
			await invalidateAll();
			currentMode = 'view';
		}
	};
	const discardChanges = async () => {
		editedEntry = cloneEntry();
		currentMode = 'view';
	};
</script>

<svelte:head>
	<title>{data.title} - {data.collection.title}</title>
</svelte:head>

<div>
	{#if currentMode === 'view'}
		<div>
			{#if showActions}
				<div>
					<button on:click|preventDefault="{deleteEntry}">Delete Entry</button>
					<button on:click|preventDefault="{() => (currentMode = 'edit')}">Edit Entry</button>
				</div>
			{/if}
			<div>
				<h1>{data.title} <input type="checkbox" bind:checked="{showActions}" /></h1>
			</div>
			<div>
				<a href="/collections/{data.collectionId}">{data.collection.title}</a>
			</div>
			{#if data.description.length > 0}
				<div>
					<p>Description: {data.description}</p>
				</div>
			{/if}
			<div>
				<p>
					{@html data.transcription.replaceAll('\n\n', '</p><p>').replaceAll(`\n`, '<br/ >')}
				</p>
			</div>
		</div>
	{:else if currentMode === 'edit'}
		<div>
			<div>
				<label for="title">Title:</label>
				<input id="title" type="text" bind:value="{editedEntry.title}" />
			</div>
			<div>
				Collection: {data.collection.title}
			</div>
			<div>
				<label>
					<label for="description">Description:</label>
					<input id="description" type="text" bind:value="{editedEntry.description}" />
				</label>
			</div>
			<div>
				<label for="transcription">Transcription:</label>
				<textarea bind:value="{editedEntry.transcription}"></textarea>
			</div>
			<div>
				<button on:click|preventDefault="{discardChanges}">Discard Changes</button>
				<button on:click|preventDefault="{saveEntry}">Save Entry</button>
			</div>
		</div>
	{/if}
</div>
