<template>
<section class="w-[100vw] flex gap-5 flex-col">
	<div class="w-full">
		<div class="flex gap-5 max-[1425px]:grid w-full max-[1425px]:grid-cols-2">
			<div class="w-full h-fit bg-[#f5f9fe] rounded-10 px-30 py-30 flex gap-5 ">
				<div class="flex justify-center items-center rounded-10 bg-[#9694ff] p-10 w-10 h-10 min-w-10 min-h-10">
					<img src="~/assets/icon/user.png" alt="" class=" object-contain">
				</div>
				<div class="flex flex-col">
					<div class="text-gray-400 font-medium">Người dùng</div>
					<div class="font-bold">{{ listUser?.length }}</div>
				</div>
			</div>

			<div class="w-full h-fit bg-[#f5f9fe] rounded-10 px-30 py-30 flex gap-5 ">
				<div class="flex justify-center items-center rounded-10 bg-[#57caeb] p-10 w-10 h-10 min-w-10 min-h-10">
					<img src="~/assets/icon/user.png" alt="" class="object-contain">
				</div>
				<div class="flex flex-col">
					<div class="text-gray-400 font-medium">Người dùng mới hôm nay</div>
					<div class="font-bold">{{ listCreatedToday?.length }}</div>
				</div>
			</div>

			<div class="w-full h-fit bg-[#f5f9fe] rounded-10 px-30 py-30 flex gap-5 ">
				<div class="flex justify-center items-center rounded-10 bg-[#5ddab4] p-10 w-10 h-10 min-w-10 min-h-10">
					<img src="~/assets/icon/post.png" alt="" class="object-contain">
				</div>
				<div class="flex flex-col">
					<div class="text-gray-400 font-medium">Số bài đăng</div>
					<div class="font-bold">{{ meta?.totalCount }}</div>
				</div>
			</div>

			<div class="w-full h-fit bg-[#f5f9fe] rounded-10 px-30 py-30 flex gap-5 ">
				<div class="flex justify-center items-center rounded-10 bg-[#ff7976] p-10 w-10 h-10 min-w-10 min-h-10">
					<img src="~/assets/icon/today.png" alt="" class="object-contain">
				</div>
				<div class="flex flex-col">
					<div class="text-gray-400 font-medium">Số bài đăng chờ duyệt</div>
					<div class="font-bold">{{ metaPending?.totalCount }}</div>
				</div>
			</div>
		</div>

		<div class="bg-[#f5f9fe] p-20 mt-20 rounded-20">
			<div class="flex gap-5">
				<p>Lượng người dùng</p>
				<img src="~/assets/icon/user.png" alt="" class="w-5 h-5">
			</div>
			<apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
		</div>
	</div>
	<!-- content right -->
	<div>
		<div class="bg-[#f5f9fe] p-20 rounded-20 max-w-[320px]">
			<p class="mb-20 font-medium">Người dùng mới đăng ký gần đây <i class="fi fi-rr-clock-three"></i></p>
			<div class="">
				<div class="flex gap-5 flex-col">
					<div class="flex gap-5 justify-between items-center border-b-1 pb-5" v-for="n in 5" :key="n" v-if="listCreatedToday[n-1]">
						<div class="flex bg-gray-50 rounded-5 border-2">
							<img :src='listCreatedToday[n-1]?.avatar' alt="" v-if="listCreatedToday[n-1]?.avatar" class="w-[30px] h-[30px] min-w-[30px] min-h-[30px] rounded-[50%]">
						<img src="~/assets/img/defaultavt.webp" 
						class="w-[30px] h-[30px] min-w-[30px] min-h-[30px] rounded-[50%]"
						alt="" v-else>
						</div>
						<div class="flex flex-col">
							<div class="font-bold">{{ listCreatedToday[n-1]?.name }}</div>
							<div class="text-gray-400 text-sm">{{ listCreatedToday[n-1]?.email }}</div>
						</div>
						<div class="flex flex-col">
							<!-- <div class="text-xs">Thời gian</div> -->
							<div class="text-[16px]  text-xs">{{ new Date(listCreatedToday[n-1]?.created_at).toLocaleTimeString() }}</div>
						</div>
					</div>
					
				</div>
				</div>
		</div>
	</div>
</section>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'

export default {
	layout: 'default',
	auth: 'login',
	components: {
		apexchart: VueApexCharts,
	},
	data(){
		return{
			listUser: [],
			listCreatedToday: [],
			listProduct: [],
			listPendingProduct: [],
			metaPending: {},
			meta: {},
			series: [{
            name: 'Người dùng mới',
            data: [31, 40, 28, 51, 42, 20, 12]
			},
			{
				name: 'Người dùng bị khóa',
				data: [11, 32, 45, 32, 34, 52, 20]
			} ],
			chartOptions: {
				chart: {
				height: 350,
				type: 'area'
				},
				dataLabels: {
				enabled: false
				},
				stroke: {
				curve: 'smooth'
				},
				xaxis: {
				categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				},
				tooltip: {
				x: {
					format: 'dd/MM/yy HH:mm'
				},
				},
			},
		}
	},
	mounted(){
		this.fetchUser();
		this.getListProduct();
		this.getListPendingProduct();
	},
	methods: {
		async getListPendingProduct(val = 1) {
			try {
				await this.$axios.$get('/admin/products/pending-products?page=1')
					.then(res => {
						this.listPendingProduct = res.data;
						this.metaPending = res.meta;
					})
			} catch (error) {
				console.log(error);
			}
		},
		async getListProduct(val = 1) {
			try {
				await this.$axios.$get('/products?page=' + val)
					.then(res => {
						this.listProduct = res.data;
						this.meta = res.meta;
					})
			} catch (error) {
				console.log(error);
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
		},
		fetchUser(){
			// this.$axios.get("https://635d4fb7cb6cf98e56b20ae8.mockapi.io/api/listpost/user").then(res=>{
			this.$axios.get("/admin/users").then(res=>{
				this.listUser = res.data.data;
				console.log(res);
				this.getlistCreatedToday();
			})
		}
	},
}
</script>