import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
            <div className='modal'>
                <div className='modal-content'>
                    <div className="modal-title">{this.props.text}</div>
                    <div>
                        <div className="modal-label">
                            <div>Content: </div>
                            <div className="modal-input-value">{this.props.message}</div>
                        </div>
                    </div>
                    <button className="modal-btn" onClick={this.props.closeModal}>Close</button>
                </div>
            </div>
        );
    }
};

export default Modal;