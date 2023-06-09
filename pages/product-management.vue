<template>
	<div class="">
		<p class="text-lg font-medium mb-5">Quản lý bài đăng</p>
		<table class="bg-white w-full">
			<tr class="bg-[#f9fafb]">
				<th>ID</th>
				<th>Người đăng</th>
				<th>Tên sản phẩm</th>
				<th>Giá</th>
				<th>Ngày đăng</th>
				<th>Nơi bán</th>
				<th>Xóa</th>
			</tr>
			<tr v-for="(product, index) in listProduct" :key="product?.id" class=" cursor-pointer hover:bg-[#f9fafb]">
				<td>{{ product?.id }}</td>
				<td>
					<div class="flex gap-[5px] items-center">
						<img :src='product?.user.avatar' alt="" v-if="product.user.avatar" class="w-[30px] h-[30px] rounded-[50%]">
						<img src="~/assets/img/defaultavt.webp" class="w-[30px] h-[30px] rounded-[50%]" alt="" v-else>
						{{ product?.user.name }}
					</div>
				</td>
				<td  @click="openArticle(product)" class=" text-blue-600 font-medium">{{ product?.name }}</td>
				<td>{{ product?.price }}</td>
				<td>
					<!-- tolocalstring -->
					{{ new Date(product?.created_at).toLocaleDateString() }}
				</td>
				<td>{{ product?.user.location }}</td>
				<td class="flex gap-3">
					<img src="~/assets/icon/del.png" alt="" class="w-6 h-6 cursor-pointer"
						@click="confirmDeletePrompt = true; ProductDelete = product">
				</td>
			</tr>
		</table>
		<vs-dialog width="300px" not-center v-model="confirmDeletePrompt">
			<template #header>
			<h4 class="not-margin text-rose-700">
				Bạn có chắc chắn muốn xóa bài đăng<b>{{ ProductDelete.name }}</b>
			</h4>
			</template>

			<template #footer>
			<div class="con-footer flex">
				<vs-button @click="changeStatus()" transparent>
				Ok
				</vs-button>
				<vs-button @click="confirmDeletePrompt=false" dark transparent>
				Cancel
				</vs-button>
			</div>
			</template>
		</vs-dialog>
		<div class="center py-10">
		<vs-pagination v-model="page" :length="meta.totalPages ? meta.totalPages : 1" />
		</div>
	</div>
</template>
<script>
export default{
	data() {
		return {
			listUser: [],
			confirmDeletePrompt: false,
			ProductDelete: {},
			isLoading: [],
			listProduct: [],
			meta: {},
			page: 1
		}
	},
	watch: {
		page: function (val) {
			this.getListProduct(val);
		}
	},
	methods: {
		changeStatus(){
				this.$forceUpdate()
				this.$axios.delete("/admin/products/"+this.ProductDelete.id).then(res=>{
					console.log(res.data);
					this.$toast.success("Xóa thành công");
					this.confirmDeletePrompt = false;
					this.getListProduct();
				}).catch(err=>{
					console.log(err);
					this.$toast.error("Có lỗi xảy ra");
					return
				})
				this.$forceUpdate()
		},
		openArticle(product) {
			let url = 'https://superbad.store/products/' + product.id ;
			window.open(url, '_blank');
		},
		async getListProduct(val = 1) {
			try {
				await this.$axios.$get('/products?page=' + val)
					.then(res => {
						console.log(res.data);
						this.listProduct = res.data;
						this.meta = res.meta;
					})
			} catch (error) {
				console.log(error);
			}
		},
		async getListUser() {
			this.listUser = await this.$axios.$get('/api/user');
		},
		async deleteUser() {
			await this.$axios.$delete(`/api/user/${this.ProductDelete.id}`);
			this.getListUser();
		}
	},
	async mounted() {
		await this.getListProduct();
		console.log(this.listProduct);
	}
}
</script>
<style lang="scss" scoped>
table,img{
	border-radius: 10px;
	box-shadow: 1px 8px 20px 1px rgb(175 173 173 / 15%);
	border-collapse: collapse;
        border-style: hidden;
}
img{
	border: 1px solid #e5e7eb;
}
th,td{
	padding: 8px 15px;
}
input { 
  opacity: 0;
  width: 0;
  height: 0;
}
th{
	text-align: left;
}
</style>