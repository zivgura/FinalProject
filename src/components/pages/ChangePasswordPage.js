import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Cookies from 'js-cookie';
import { tryLogin, updatePassword } from '../../services/server';
import Modal from '../Modal';

function ChangePasswordPage() {
	const [state, setState] = useState({message: '', modalisOpen: false});
	const newPassword = useRef('');
	const confirmNewPassword = useRef('');
	const {username, password} = useParams();

	const toggleModal = useCallback(
		() => {
			setState({modalisOpen: !state.modalisOpen});
		},[state.modalisOpen]);

	useEffect(() => {
		async function tryToLogin() {
			try {
				await tryLogin(username, password);
				Cookies.set('userName', username);
			}
			catch (error) {
				setState({message: 'שגיאה ברישום. לא ניתן להחליף סיסמה'});
				toggleModal();
			}
		}

		tryToLogin();
	}, [username, password, toggleModal]);

	const handleChange = useCallback(
		(e) => {
			setState({[e.target.name]: e.target.value});
		}, []);

	const bindThisToToggleModal = useCallback(
		() => {
			setState({modalisOpen: !state.modalisOpen});
		}, [state.modalisOpen]
	);

	const checkOnSubmit = useCallback(
		async () => {
			console.log('checkOnSubmit password');
			if (newPassword.current.value === confirmNewPassword.current.value) {
				console.log('same password');
				await updatePassword(username, newPassword.current.value);
				setState({message: 'הסיסמה שונתה בהצלחה'});

			}
			else {
				console.log('not the same');
				setState({message: 'הסיסמאות לא זהות'});
			}

			toggleModal();
		}, [newPassword,confirmNewPassword,username,toggleModal]);

	return (
		<div className="page">
			<div className="form">
				<div className="field">
					<label>
						סיסמה חדשה
						<input
							ref={newPassword}
							minLength={8}
							type="password"
							name="newPassword"
							onChange={(e) => handleChange(e)}/>
					</label>
				</div>

				<div className="field">
					<label>
						אשר סיסמה חדשה
						<input
							ref={confirmNewPassword}
							minLength={8}
							type="password"
							name="confirmNewPassword"
							onChange={(e) => handleChange(e)}/>
					</label>
				</div>

				<button className="sb-btn" type="button" onClick={checkOnSubmit}>אישור</button>
			</div>
			{state.modalisOpen ?
				<Modal
					{...state}
					closeModal={bindThisToToggleModal}
				/>
				: null
			}
		</div>
	);
}

export { ChangePasswordPage };