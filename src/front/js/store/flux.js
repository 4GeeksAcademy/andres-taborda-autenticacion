import { jwtDecode } from "jwt-decode";

const getState = ({ getStore, getActions, setStore }) => {
	const baseUrl = process.env.BACKEND_URL
	return {
		store: {
			accsessToken: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			isLogin: () => {
				const token = sessionStorage.getItem('accsessToken') || null
				let isValid = false
				if (token) {
					const decodedToken = jwtDecode(token); 
					const currentTime = Math.floor(Date.now() / 1000); 
				
					isValid = decodedToken.exp > currentTime; 
				}
				isValid ? setStore({'accsessToken': token}) : sessionStorage.removeItem('accsessToken')
			},
			register: async ( user ) => {
				try{
					const response = await fetch(`${baseUrl}signup`,{
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(user)
					})

					if (!response.ok) {
						const data = await response.json()
						throw new Error(data.error);						
					}
									
				} catch(error){
					throw(error)
				}

			},
			login: async ( user ) => {
				
				try {
					const response = await fetch(`${baseUrl}login`,{
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(user)
					})

					if (!response.ok) {
						throw new Error("Invalid credentials");						
					}

					const data = await response.json()
					setStore({"accsessToken": data.access_token})
					sessionStorage.setItem("accsessToken", data.access_token)

				} catch (error) {
					throw(error)
				}
			},
			logout: () => {
				setStore({'accsessToken': null})
				sessionStorage.removeItem('accsessToken')
			}
		}
	};
};

export default getState;
