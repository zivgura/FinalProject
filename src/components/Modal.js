import React, { Component } from 'react';

class Modal extends Component {
	render() {
		return (
			<div className="modal">
				<div className="modal-content">
					<div className="modal-title">שים לב</div>
					<div>
						<div className="modal-label">
							<div className="modal-input-value">{this.props.message}</div>
						</div>
					</div>
					<button className="modal-btn" onClick={this.props.closeModal}>סגור</button>
				</div>
			</div>
		);
	}
}

export default Modal;