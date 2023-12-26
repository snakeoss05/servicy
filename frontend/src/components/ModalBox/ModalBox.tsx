/* eslint-disable @typescript-eslint/no-explicit-any */

import "./modalbox.scss";
type modalprops = {
  isOpen: boolean;
  onClose: any;
  children: any;
};
const Modal = ({ isOpen, onClose, children }: modalprops) => {
  if (!isOpen) return null;
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{children}</p>
      </div>
    </div>
  );
};
export default Modal;
