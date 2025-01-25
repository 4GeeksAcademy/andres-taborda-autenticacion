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
				const response = await fetch(`${baseUrl}signup`,{
					method: 'POST',
					headers: {
						'Content-type': 'aplication/json'
					},
					body: JSON.stringify(user)
				})
			}
		}
	};
};

export default getState;
