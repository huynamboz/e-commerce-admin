<template>
	<div class="root container w-fit min-w-[300px] px-5 bg-[#ffffff] rounded-20 fixed pb-20 h-[100vh] border-[1px]">
		<div class="content pt-20 px-10">
			<h1 class="text-black font-[500]">Trang chủ <i class="fi fi-rr-house-chimney"></i></h1>
			<div class="flex flex-col mt-20 gap-[5px] text-[14px]">
				<div class="flex pl-20 py-10 gap-[10px] hover:bg-[#ff4444] hover:text-white hover:rounded-5 cursor-pointer" @click="$router.push('/')"
					:class="{ 'bg-[#ff4444] text-white rounded-5': page == 'index'}"><i class="fi fi-rr-stats"></i> Thống kê</div>

				<div class="flex  pl-20 py-10 gap-[10px] hover:bg-[#ff4444] hover:text-white hover:rounded-5 cursor-pointer" @click="$router.push('/user-management')"
					:class="{ 'bg-[#ff4444] text-white rounded-5': page == 'user-management'}"><i class="fi fi-rr-users-alt"></i> Quản lý người dùng</div>

				<div class="flex  pl-20 py-10 gap-[10px] hover:bg-[#ff4444] hover:text-white hover:rounded-5 cursor-pointer" @click="$router.push('/product-management')"
					:class="{ 'bg-[#ff4444] text-white rounded-5': page == 'product-management'}"><i class="fi fi-rr-blog-text"></i> Quản lý bài viết</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			page: this.$route.name
		}
	},
	watch: {
		'$route.name': function (val) {
			this.page = val
		}
	},
	mounted() {
		console.log(this.page)
	}
}
</script>