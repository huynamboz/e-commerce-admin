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
					:class="{ 'bg-[#ff4444] text-white rounded-5': page == 'product-management'}"><i class="fi fi-rr-blog-text"></i> Quản lý bài đăng</div>

					<!-- <div class="flex  pl-20 py-10 gap-[10px] hover:bg-[#ff4444] hover:text-white hover:rounded-5 cursor-pointer" @click="$router.push('/product-report')"
					:class="{ 'bg-[#ff4444] text-white rounded-5': page == 'product-report'}"><i class="fi fi-rr-blog-text"></i> Báo cáo</div> -->

				<div class="flex group  pl-20 py-10 gap-[10px] hover:bg-[#ff4444] hover:text-white hover:rounded-5 cursor-pointer" @click="$router.push('/product-pending')"
				:class="{ 'bg-[#ff4444] text-white rounded-5': page == 'product-pending'}"><i class="fi fi-rr-blog-text"></i> Bài đăng chờ duyệt
					<div class="group-hover:bg-white group-hover:text-rose-700 rounded-[50%] w-[25px] flex justify-center items-center h-[25px]" :class="{ 'bg-[#ff4444] text-xs text-white rounded-[50%] w-[25px] flex justify-center items-center h-[25px]': page != 'product-pending', 'bg-white text-rose-700 text-xs': page == 'product-pending'}">
						{{ meta.totalCount < 10 ? meta.totalCount : '10+' }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			page: this.$route.name,
			listPendingProduct: [],
			meta: {},
		}
	},
	watch: {
		'$route.name': function (val) {
			this.page = val
		}
	},
	mounted() {
		this.getListPendingProduct();
	},
	methods: {
		async getListPendingProduct(val = 1) {
			try {
				await this.$axios.$get('/admin/products/pending-products?page=1')
					.then(res => {
						this.listPendingProduct = res.data;
						this.meta = res.meta;
					})
			} catch (error) {
				console.log(error);
			}
		},
	}
}
</script>