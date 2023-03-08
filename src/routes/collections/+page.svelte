<script lang="ts">
	import type { Collection } from '@prisma/client';

	export let data: { collections: Collection[] };
</script>

<svelte:head>
	<title>Collections</title>
</svelte:head>

<div>
	<ul>
		{#each data.collections as collection (collection.id)}
			<li>
				<a href="/collections/{collection.id}">{collection.title}</a>
			</li>
		{/each}
	</ul>
</div>
