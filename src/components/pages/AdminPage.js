import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { fetchOrganizationsNames } from '../../services/server';

function AdminPage(props) {
	const [adminState, setAdminState] = useState({organizations: []});

	async function getOrganizationsNames() {
		const response = await fetchOrganizationsNames();
		return await response.json();
	}

	async function onClick() {
		let organizations = await getOrganizationsNames();

		organizations = organizations.map((dic) => {
			return {value: dic.organizationName, label: dic.organizationName};
		});
		console.log(organizations);
		setAdminState({organizations: organizations});

	}

	useEffect(() => {
		if (adminState.organizations.length !== 0) {
			console.log(adminState.organizations);
			props.history.push('/admin/register-responsible', adminState.organizations);
		}
	});

	return (
		<div className="page">
			<Navbar history={props.history} organizationName={'Admin'}/>
			<div className="buttons-section">
				<button
					className="sb-btn"
					type="button"
					onClick={() => props.history.push('/admin/register-organization')}>
					צור ארגון חדש
				</button>
				<button
					className="sb-btn"
					type="button"
					onClick={onClick}>
					צור אחראי חדש
				</button>
			</div>
		</div>
	);
}

export default AdminPage;