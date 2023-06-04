<template>
	<div class="position-relative">
		<header-top />
		<nuxt id="body" />
	</div>
</template>
<script>
import headerTop from '~/components/layout/header.vue'
export default {
	components: {
		headerTop,
	},
}
</script>