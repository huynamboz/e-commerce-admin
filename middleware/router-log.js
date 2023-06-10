import jwtDecode from "jwt-decode";
export default function ({ store, redirect, route }) {
	let token = store.$auth.strategy.token.get()
	if (token) {
		token = token.split(" ")[1];
		const decoded = jwtDecode(token);
		const role = decoded.role_id;
		if (role != '1') {
			console.log("NOT PERMISSION ACCESS", role);
			store.$auth.logout();
			return redirect("/login");
		}
	}
}
