<template>
	<div>
		<div class="w-full flex justify-center mb-20">
			<header class="bg-white flex gap-[1px] w-fit rounded-10 p-[5px] border-slate-300 items-center cursor-pointer">
				<div :class="{'bg-rose-400 rounded-10 text-white':!pageParams}" class="p-[8px] hover:bg-rose-400 hover:rounded-10 hover:text-white" @click="$router.push('/user-management')">Danh sách tài khoản</div>
				<div :class="{'bg-rose-400 rounded-10 text-white':pageParams == 'report'}" class="p-[8px] hover:bg-rose-400 hover:rounded-10 hover:text-white" @click="$router.push('?page=report')">Tài khoản bị khóa</div>
			</header>
		</div>
		<div class="flex flex-col gap-5 w-full">
		<div class="table w-full" v-show="!pageParams">
			<div class="flex gap-5 items-center mb-20">
				<p class="mb-5 text-lg font-medium">Danh sách tài khoản</p>
				<input
				class=" bg-[#f5f9fe] p-5 rounded-[6px] w-[300px]"
				type="text" v-model="keySearch" @input="Search('ALL')" state="danger" placeholder="Tên, email, số điện thoại">
			</div>
			



			<table class="bg-white w-full">
				<tr class="bg-[#f9fafb] text-gray-500">
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>SDT</th>
					<th>Tham gia</th>
					<th>Trạng thái</th>
					<th>Hành động</th>
				</tr>
				<tr v-for="(user,index) in listUser" :key="user.id" class="hover:bg-[#f9fafb]" v-if="user.delete_at == null">
					<td>{{ user.id }}</td>
					<td>
						<div class="flex gap-[5px] items-center">
							<img :src='user.avatar' alt="" v-if="user.avatar" class="w-[30px] h-[30px] rounded-[50%]">
						<img src="~/assets/img/defaultavt.webp" 
						class="w-[30px] h-[30px] rounded-[50%]"
						alt="" v-else>
						{{user.name}}
						</div>
					</td>
					<td>{{user.email}}</td>
					<td>{{ user.phone_number ? user.phone_number : 'Chưa có'  }}</td>
					<td>
						<!-- tolocalstring -->
						{{ new Date(user.created_at).toLocaleDateString() }}
					</td>
					<td class="flex gap-3">
						<div class="bg-[#5ddab4] min-w-[80px] block text-white p-[5px] rounded-[25px] text-xs" v-if="user.active_status">Đã kích hoạt</div>
						<div class="bg-[#ee2624] min-w-[96px] block text-white p-[5px] rounded-[25px] text-xs" v-else>Chưa kích hoạt</div>
					</td>
					<td>
						<img src="~/assets/icon/del.png" alt="" class="w-6 h-6 cursor-pointer" @click="confirmDeletePrompt = true;UserDelete= user">
					</td>
				</tr>
				<tr v-show="listUser.length == 0">
					<td colspan="7" class="text-center">Không có dữ liệu</td>
				</tr>
			</table>
		</div>
		<vs-dialog width="300px" :loading="isLoading" not-center v-model="confirmDeletePrompt">
			<template #header>
			<h4 class="not-margin text-rose-700">
				Bạn có chắc chắn muốn xóa tài khoản <b>{{ UserDelete.name }}</b>
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

		<div class="table w-full mt-30" v-show="!pageParams">
			<p class="mb-5 text-lg font-medium">Tài khoản mới tạo hôm nay ({{ listCreatedToday.length }})</p>
			<table class="bg-white w-full">
				<tr class="bg-[#f9fafb]  text-gray-500">
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>SDT</th>
					<th>Tham gia</th>
					<th>Đăng ký lúc</th>
				</tr>
				<tr v-for="(user,index) in listCreatedToday" :key="user.id" class="hover:bg-[#f9fafb]" v-if="user.delete_at == null">
					<td>{{ user.id }}</td>
					<td>
						<div class="flex gap-[5px] items-center">
							<img :src='user.avatar' alt="" v-if="user.avatar" class="w-[30px] h-[30px] rounded-[50%]">
						<img src="~/assets/img/defaultavt.webp" 
						class="w-[30px] h-[30px] rounded-[50%]"
						alt="" v-else>
						{{user.name}}
						</div>
					</td>
					<td>{{user.email}}</td>
					<td>{{ user.phone_number ? user.phone_number : 'Chưa có'  }}</td>
					<td>
						<!-- tolocalstring -->
						{{ new Date(user.created_at).toLocaleDateString() }}
					</td>
					<td>
						<!-- <div class="flex items-center">
							<div :class="{'bg-[#ff4131]': user.active_status, 'bg-[#d8d8d8]': !user.active_status}" class=" w-[45px] h-[23px] rounded-20 relative cursor-pointer"  @click="changeStatus(user,index)">
							<div class="icon-check bg-[#ffffff] w-[18px] h-[18px] rounded-[50%] top-[2px] absolute " :class="{'right-[2px]':user.active_status , 'left-[2px]':!user.active_status}"></div>
						</div>
						<mini-loading v-show="isLoading[index]" />
						</div> -->
						{{ new Date(user.created_at).toLocaleTimeString() }}
					</td>
				</tr>
				<tr v-show="listCreatedToday.length == 0">
					<td colspan="6" class="text-center">Không có dữ liệu</td>
				</tr>
			</table>
		</div>



		<div class="table w-full" v-show="pageParams == 'report'">
			<p class="mb-5 text-lg font-medium block">Tài khoản cần được xem xét</p>

			<table class="bg-white w-full">
				<tr class="bg-[#f9fafb] text-gray-500">
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>SDT</th>
					<th>Tham gia</th>
					<th>Số lượng báo cáo</th>
				</tr>
				<tr v-for="(user,index) in listUser" :key="user.id" class="hover:bg-[#f9fafb]"  v-if="user.delete_at == null && user.report_count != 0">
					<td>{{ user.id }}</td>
					<td>
						<div class="flex gap-[5px] items-center">
							<img :src='user.avatar' alt="" v-if="user.avatar" class="w-[30px] h-[30px] rounded-[50%]">
						<img src="~/assets/img/defaultavt.webp" 
						class="w-[30px] h-[30px] rounded-[50%]"
						alt="" v-else>
						{{user.name}}
						</div>
					</td>
					<td>{{user.email}}</td>
					<td>{{ user.phone_number ? user.phone_number : 'Chưa có'  }}</td>
					<td>
						<!-- tolocalstring -->
						{{ new Date(user.created_at).toLocaleDateString() }}
					</td>
					<td>
						{{ user.report_count }}
					</td>
				</tr>
			</table>
		</div>


		<div class="table w-full" v-show="pageParams =='report'">
			<p class="mb-5 text-lg font-medium">Tài khoản đã xóa</p>

			<table class="bg-white w-full">
				<tr class="bg-[#f9fafb] text-gray-500">
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>SDT</th>
					<th>Tham gia</th>
					<th>Ngày xóa</th>
					<th>Khôi phục</th>
				</tr>
				<tr v-for="(user,index) in listUser" :key="user.id" class="hover:bg-[#f9fafb]"  v-if="user.delete_at != null">
					<td>{{ user.id }}</td>
					<td>
						<div class="flex gap-[5px] items-center">
							<img :src='user.avatar' alt="" v-if="user.avatar" class="w-[30px] h-[30px] rounded-[50%]">
						<img src="~/assets/img/defaultavt.webp" 
						class="w-[30px] h-[30px] rounded-[50%]"
						alt="" v-else>
						{{user.name}}
						</div>
					</td>
					<td>{{user.email}}</td>
					<td>{{ user.phone_number ? user.phone_number : 'Chưa có'  }}</td>
					<td>
						<!-- tolocalstring -->
						{{ new Date(user.created_at).toLocaleDateString() }}
					</td>
					<td>
						{{ user.delete_at ? new Date(user.delete_at).toLocaleDateString() : '' }}
					</td>
					<td>
						<img src="~/assets/icon/restore.png" @click="openRestore = true; userRestore = user" alt="" class="w-[30px] h-[30px] cursor-pointer" style="border:unset; box-shadow: unset;">
					</td>
				</tr>
					<vs-dialog :loading="isLoading" v-model="openRestore">
						<template #header>
						<h4 class="not-margin">
							<b class="text-rose-400 text-xl">XÁC NHẬN</b>
						</h4>
						</template>
						<p> Bạn có chắc chăn muốn khôi phục người dùng {{ userRestore.name }} không ?</p>
						<div class="con-footer flex">
							<vs-button @click="restoreUser()" transparent>
							Đồng ý
							</vs-button>
							<vs-button @click="openRestore=false" dark transparent>
							Cancel
							</vs-button>
						</div>
					</vs-dialog>
			</table>
		</div>


	</div>
	</div>
</template>
<script>
import miniLoading from '~/components/loading/mini-loading.vue'
export default{
	layout: 'default',
	auth: 'login',
	components: {
		miniLoading
	},
	data(){
		return{
			page: 1,
			max: 3,
			listUser: [],
			checked: false,
			isLoading: false,
			pagePara: '',
			listCreatedToday: [],
			confirmDeletePrompt: false,
			isDeleteUser: false,
			UserDelete: {},
			keySearch: '',
			listInit: [],
			openRestore: false,
			userRestore: {},
			isDeleting: false,
		}
	},
	computed:{
		pageParams(){
			return this.$route.query.page;
		}
	},
	watch:{
		pageParams(){
			this.pagePara = this.pageParams;
		}
	},
	mounted(){
		this.fetchUser();
		this.pagePara = this.pageParams;
	},
	methods:{
		async restoreUser(){
			this.isLoading = true;
			await this.$axios.patch(`/admin/users/${this.userRestore.id}`)
			.then((res) => {
				this.isLoading = false;
				this.openRestore = false;
				this.fetchUser();
				this.$toast.success("Khôi phục người dùng thành công");
				this.userRestore = {};
			}).catch((err) => {
				this.isLoading = false;
				this.openRestore = false;
				this.userRestore = {};
				this.$toast.error("Khôi phục người dùng thất bại");
			})
		},
		Search(type){
			switch(type){
				case 'createdToday':
					this.getlistCreatedToday();
					break;
				case 'ALL':
					if(this.keySearch == '') this.listUser = this.listInit;
					const results = [];
					for (let i = 0; i < this.listUser.length; i++) {
						if (
							this.listUser[i].name.toLowerCase().includes(this.keySearch.toLowerCase()) ||
							this.listUser[i].phone_number?.toLowerCase().includes(this.keySearch.toLowerCase()) ||
							this.listUser[i].email?.toLowerCase().includes(this.keySearch.toLowerCase())
							) {
							results.push(this.listUser[i]);
						}
					}
					this.listUser = results;
					break;
			}
		},
		// getlistCreatedToday(){
		// 	this.listCreatedToday = this.listUser.filter(user=>{
		// 		return new Date(user.created_at).toLocaleDateString() == new Date().toLocaleDateString();
		// 	})
		// },
		getlistCreatedToday() {
		const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 giờ trong milliseconds

		this.listCreatedToday = this.listUser.filter(user => {
			const createdAt = new Date(user.created_at);
			const currentTime = new Date();

			// Kiểm tra chênh lệch thời gian giữa currentTime và createdAt
			const timeDifference = currentTime - createdAt;
			console.log(timeDifference);
			return timeDifference <= twentyFourHoursInMilliseconds;
		});
		}
		,
		changeStatus(){
				this.$forceUpdate()
				this.isLoading = true;
				this.UserDelete.active_status = !this.UserDelete.active_status;
				this.$axios.delete("/admin/users/"+this.UserDelete.id).then(res=>{
					this.$toast.success("Thay đổi trạng thái thành công");
					this.confirmDeletePrompt = false;
					this.isLoading = false;
					this.fetchUser();
				}).catch(err=>{
					this.$toast.error("Có lỗi xảy ra");
					this.isLoading = false;
					this.UserDelete.active_status = !this.UserDelete.active_status;
					return
				})
				this.$forceUpdate()
		},
		fetchUser(){
			// this.$axios.get("https://635d4fb7cb6cf98e56b20ae8.mockapi.io/api/listpost/user").then(res=>{
			this.$axios.get("/admin/users").then(res=>{
				this.listUser = res.data.data;
				this.listInit = res.data.data;
				this.getlistCreatedToday();
			})
		}
	}
}
</script>
<style lang="scss" scoped>
table,img{
	box-shadow: 1px 8px 20px 1px rgb(175 173 173 / 15%);
	border-collapse: collapse;
    border-style: hidden;
	// border: 1px solid #e5e7eb;
}
img{
	border: 1px solid #e5e7eb;
}
th,td{
	padding: 10px 15px;
}

th{
	text-align: left;
}
</style>