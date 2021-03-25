const handleError = (response) => {
	if (!response.ok) {
		switch (response.status) {
			case 409:
				throw new Error('שם המשתמש תפוס');
			default:
				throw new Error('שגיאה כללית, נסה שנית');
		}
	}
};

export { handleError };