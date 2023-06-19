import UsersDTO from "../DTO/UsersDTO/UsersDTO"
import APIUsersDTO from "../DTO/UsersDTO/APIUsersDTO";

class UserService {
    create = async (userData:  UsersDTO) => {
        try {
            const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            };
            const response = await fetch('http://localhost:4000/api/users', requestOptions);
            const data = await response;
            return data.json();
        } catch (err) {
            //Handle error
            throw new Error('Failed to create a user: ' + err);
        }
    };

    getAll = async () => {
        try {
                const requestOptions: RequestInit = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const response = await fetch('http://localhost:4000/api/users', requestOptions);
                const data = await response;
                return data.json();
			} catch (error) {
			    console.error('Failed to fetch users:', error);
			    throw error;
			}
    };

    getById = async (id: number) => {
        try {
            const requestOptions: RequestInit = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(`http://localhost:4000/api/users/${id}`, requestOptions);
            const data = await response;
            return data.json();
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    }

    login = async (userData: UsersDTO) => {
        try{
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData),
            }
            const response = await fetch('http://localhost:4000/api/login', requestOptions);
            const data = await response;
            return data.json();
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    };
}

export default UserService;