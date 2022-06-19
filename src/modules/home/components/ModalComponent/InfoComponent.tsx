import { Modal, Button } from 'react-bootstrap';

interface Props {
    show: boolean,
    data: any,
    onClose: () => void
}

const InfoComponent = (props: Props) => {
    const { show, data, onClose } = props;

    const { id, status, client, createdAt, invoice, currentcy, total } = data;


    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                <Modal.Title>Thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>id: {id}</p>
                    <p>status: {status}</p>
                    <p>client: {client}</p>
                    <p>createdAt: {createdAt}</p>
                    <p>invoice: {invoice}</p>
                    <p>currentcy: {currentcy}</p>
                    <p>total: {total}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Đóng
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InfoComponent;