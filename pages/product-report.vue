<template>
	<div class="">
		<!-- detail -->
		<vs-dialog full-screen height="100%" v-model="openDetail">
			<template #header class="flex flex-col">
				<div class="flex justify-between items-center">
					<p class="text-center font-bold text-2xl">Báo cáo sản phẩm</p>
					<vs-button @click="openDetail = false" class="p-0" color="danger" icon="icon-close"></vs-button>
				</div>
			</template>
				<div class="flex gap-10">
					<div class="flex flex-col gap-3">
						<div>
							<img :src="currentImage ? currentImage : ProductChoosed?.thumbnails?.[0]" class="w-[350px] h-[350px] object-cover" alt="">
						</div>
						<div class="flex gap-3 max-w-[350px] cursor-pointer overflow-x-scroll">
							<div class="flex gap-3" @click="currentImage = thumb" v-for="thumb in ProductChoosed.thumbnails">
								<img :src="thumb" alt="" class="w-[100px] h-[100px] min-w-[100px] min-h-[100px] object-cover">
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-5">
						<p class="text-2xl font-semibold">{{ ProductChoosed?.name }}</p>
						<div>
							<p>Mô tả : </p>
							<pre class="max-h-[300px] overflow-y-scroll">{{ JSON.parse(ProductChoosed?.description ? ProductChoosed?.description : '"a"') }}</pre>
						</div>
						<div>
							<p>Giá : <span class="text-2xl text-red-500 font-semibold">{{ ProductChoosed?.price }}đ</span></p>
						</div>
					</div>
				</div>
				<template #footer></template>
		</vs-dialog>
		<!-- end detail -->
		<p class="text-lg font-medium mb-5">BÁO CÁO SẢN PHẨM</p>
		<table class="bg-white w-full">
			<tr class="bg-[#f9fafb]">
				<th>ID</th>
				<th>Người đăng</th>
				<th>Tên sản phẩm</th>
				<th>Giá</th>
				<th>Ngày đăng</th>
				<th>Nơi bán</th>
				<th>Hành động</th>
			</tr>
			<tr v-for="(product, index) in listReport" :key="product?.id" class=" cursor-pointer hover:bg-[#f9fafb]">
				<td>{{ product?.id }}</td>
				<td>
					<div class="flex gap-[5px] items-center">
						<img :src='product?.user.avatar' alt="" v-if="product.user.avatar" class="w-[30px] h-[30px] rounded-[50%]">
						<img src="~/assets/img/defaultavt.webp" class="w-[30px] h-[30px] rounded-[50%]" alt="" v-else>
						{{ product?.user.name }}
					</div>
				</td>
				<td  @click="openDetail = true; ProductChoosed = product" class=" text-blue-600 font-medium">{{ product?.name }}</td>
				<td>{{ product?.price }}</td>
				<td>
					<!-- tolocalstring -->
					{{ new Date(product?.created_at).toLocaleDateString() }}
				</td>
				<td>{{ product?.user.location }}</td>
				<td class="flex gap-3">
					<div 
					class="text-white bg-green-500 min-w-[100px] text-sm rounded-[3px] py-[7px] px-10 cursor-pointer"
					@click="confirmDeletePrompt = true; ProductChoosed = product; actionName = 'chấp nhận'">
						Chấp nhận
					</div>
					<div 
					class="text-white bg-rose-500 min-w-[70px] text-sm rounded-[3px] py-[7px] px-10 cursor-pointer"
					@click="confirmDeletePrompt = true; ProductChoosed = product; actionName = 'từ chối'">
						Từ chối
					</div>
						
				</td>
			</tr>
		</table>
		<vs-dialog width="300px" :loading="isDeleting" not-close not-center v-model="confirmDeletePrompt">
			<template #header>
			<p class="text-center font-bold text-2xl">XÁC NHẬN</p>
			</template>
			<h4 class="not-margin text-center" :class="{'text-rose-700': actionName == 'từ chối', 'text-green-700': actionName == 'chấp nhận'}">
				Bạn có chắc chắn muốn {{ actionName }} bài đăng <b>{{ ProductChoosed.name }}</b>
			</h4>
			<template #footer>
			<div class="con-footer flex">
				<vs-button @click="changeStatus()" transparent>
				{{ actionName }}
				</vs-button>
				<vs-button @click="confirmDeletePrompt=false" dark transparent>
				HỦY
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
			ProductChoosed: {},
			isLoading: [],
			listReport: [],
			meta: {},
			page: 1,
			actionName: '',
			openDetail: false,
			isDeleting: false,
			currentImage: ''
		}
	},
	watch: {
		page: function (val) {
			this.getListProduct(val);
		}
	},
	methods: {
		changeStatus(){
			this.isDeleting = true;
			if (this.actionName == 'chấp nhận') {
				this.$axios.patch("/admin/products/"+this.ProductChoosed.id + "/accept").then(res=>{
					this.$toast.success("Đã chấp nhận bài đăng");
					this.confirmDeletePrompt = false;
					this.isDeleting = false;
					this.getListProduct();
				}).catch(err=>{
					console.log(err);
					this.$toast.error("Có lỗi xảy ra");
					this.isDeleting = false;
					return
				})
			}
			else {
				this.isDeleting = true;
				this.$forceUpdate()
				this.$axios.delete("/admin/products/"+this.ProductChoosed.id).then(res=>{
					this.$toast.success("Xóa thành công");
					this.confirmDeletePrompt = false;
					this.getListProduct();
					this.isDeleting = false;
				}).catch(err=>{
					console.log(err);
					this.$toast.error("Có lỗi xảy ra");
					this.isDeleting = false;
					return
				})
				this.$forceUpdate()
			}
		},
		openArticle(product) {
			let url = 'https://superbad.store/products/' + product.id ;
			window.open(url, '_blank');
		},
		async getListProduct(val = 1) {
			try {
				await this.$axios.$get('/admin/reports?page='+this.page)
					.then(res => {
						this.listReport = res.data;
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
			await this.$axios.$delete(`/api/user/${this.ProductChoosed.id}`);
			this.getListUser();
		}
	},
	async mounted() {
		await this.getListProduct();
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