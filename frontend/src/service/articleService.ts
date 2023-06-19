import { type } from "os";
import ArticlesDTO from "../DTO/ArticlesDTO/ArticlesDTO";
import APIArticlesDTO from "../DTO/ArticlesDTO/APIArticlesDTO";

class Articles{

    getAll = async () => {
        try {
					const requestOptions: RequestInit = {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json'
						}
					}
					const response = await fetch('http://localhost:4000/api/articles', requestOptions);
					const data = await response;
					return data.json();
					} catch (error) {
					console.error('Failed to fetch articles:', error);
					throw error;
					}
    };

	create = async (createData:  ArticlesDTO) => {
        try {
            const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createData),
            };
            const response = await fetch('http://localhost:4000/api/articles', requestOptions);
            const data = await response;
            return data.json();
        } catch (err) {
            //Handle error
            throw new Error('Failed to create an article: ' + err);
        }
    };

	updateById = async (id: number, updateData: ArticlesDTO) => {
		try {
		  const requestOptions: RequestInit = {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateData), // Convert the update data to JSON string
		  };
		  await fetch(`http://localhost:4000/api/articles/${id}`, requestOptions);
		} catch (error) {
		  // Handle error
		  throw new Error('Failed to update article: ' + error);
		}
	};
}


  export default Articles;
