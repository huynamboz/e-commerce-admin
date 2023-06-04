<template>
	<div class="position-relative">
		<header-top />
		<div class="main flex gap-[20px] p-20">
			<tab-left /> 
			<nuxt class="mt-20 w-full ml-[320px]" id="body" />
		</div>

	</div>
</template>
<script>
import headerTop from '~/components/layout/header.vue'
import TabLeft from '~/components/layout/TabLeft.vue'
export default {
	components: {
		headerTop,
		TabLeft,
	},
}
</script>