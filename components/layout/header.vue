<template>
	<header class="container bg-[#ffffff] sticky h-[70px] max-w-[100vw]  w-[100%] top-0 border-b-1 border-[#cdcdcd] 
	flex items-center">
		<div class="content flex justify-between w-[100%] m-auto px-20">
			<div class="content-left ">
				<h1>DASHBOARD</h1>
			</div>
			<div class="content-right cursor-pointer relative">
				<h1 @click="openPopup = !openPopup"><i class="fi fi-rr-user"></i>ADMIN</h1>
				<div v-if="openPopup" class="bg-white flex flex-col items-center h-[80px] w-[130px] absolute top-full shadow-lg rounded-5 right-3 border-[1px]">
					<p class="hover:bg-rose-300 hover:text-white w-full text-center py-5 mt-5">Đổi mật khẩu</p>
					<p @click="logout()" class="hover:bg-rose-300 hover:text-white w-full text-center py-5">Đăng xuất</p>
				</div>
			</div>

		</div>
	</header>
</template>
<script>
export default {
	data() {
		return {
			openPopup: false
		}
	},
	methods: {
		logout() {
			this.$auth.logout();
			this.$router.push('/login');
		}
	}
}
</script>