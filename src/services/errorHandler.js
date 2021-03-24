const handleError = (response) => {
	if (!response.ok) {
		switch (response.status) {
			case 409:
				throw new Error('שם המשתמש תפוס');
			default:
				throw new Error('שגיאה בעת ניסיון רישום');
		}
	}
};

export { handleError };