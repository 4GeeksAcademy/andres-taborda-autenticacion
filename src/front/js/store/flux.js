const getState = ({ getStore, getActions, setStore }) => {
	const baseUrl = process.env.BACKEND_URL
	return {
		store: {
			accsessToken: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			isLogin: () => {

			},
			register: async ( user ) => {
				const response = await fetch(`${baseUrl}/api/signup`,{
					method: 'POST',
					headers: {
						"Content-Type": 'aplication/json'
					},
					body: JSON.stringify(user)
				})
			},
			login: async ( user ) => {
				
				
				try {
					const response = await fetch(`${baseUrl}/api/login`,{
						method: 'POST',
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(user)
					})

					if (!response.ok) {
						throw new Error("Error al iniciar sesión");						
					}

					const data = await response.json()
					setStore({"accsessToken": data.access_token})
					sessionStorage.setItem("accsessToken", data.access_token)

				} catch (error) {
					throw(error)
				}
			}
		}
	};
};

export default getState;
