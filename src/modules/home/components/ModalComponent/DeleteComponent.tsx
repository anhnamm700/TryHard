import { Modal, Button } from 'react-bootstrap';

interface Props {
    show: boolean,
    onClose: () => void,
    onConfirm?: () => void
}


const ModalComponent = (props: Props) => {
    const { show, onClose, onConfirm } = props;

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn xóa hàng này không ?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={onConfirm}>
                    Xác nhận
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalComponent;