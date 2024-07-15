export class ApiIntegration {
	static async getPosts() {
		const response = await fetch('http://localhost:3001/posts');
		return response.json();
	}
	
	static async getPostById(id: string) {
		const response = await fetch(`http://localhost:3001/posts/${id}`);
		return response.json();
	}

	static async getProfilePosts() {
		const response = await fetch('http://localhost:3001/profile/posts');
		return response.json();
	}

	static async getProfile() {
		const response = await fetch('http://localhost:3001/profile');
		return response.json();
	}
}