<script lang="ts">
	import { goto } from '$app/navigation';

	import type { Collection, Entry } from '@prisma/client';

	export let data: Collection & { entries: Entry[] };

	const deleteCollection = async () => {
		if (!confirm(`Do you really want to delete ${data.title} collection?`)) return;
		const res = await fetch(`/api/collections/${data.id}`, {
			method: 'DELETE'
		});
		if (res.ok) {
			goto('/');
		}
	};
</script>

<svelte:head>
	<title>{data.title}</title>
</svelte:head>

<div>
	<h1>{data.title}</h1>
	<button on:click|preventDefault="{deleteCollection}">Delete Collection</button>
	<p>{data.description}</p>
</div>
<hr />
<div>
	<ul>
		{#each data.entries as entry (entry.id)}
			<li>
				<a href="/entries/{entry.id}">{entry.title}</a>
			</li>
		{/each}
	</ul>
</div>
