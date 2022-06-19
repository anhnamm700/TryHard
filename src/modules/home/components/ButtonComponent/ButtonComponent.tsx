import './style.scss';

interface Props {
    className: string,
    title: string,
    icon: string,
    children?: any,
    disabled?: boolean,
    onClick?: (e: any) => void
}

const ButtonComponent = (props: Props) => {
    const { className, title, icon, children, disabled, onClick } = props;

    

    return (
        <div>
            <button className={`${className} button`} onClick={onClick} disabled={disabled}>
                {title || children}
            </button>

            <span>{icon}</span>
        </div>
    );
}

export default ButtonComponent;