const Card = ({ children, variant }) => {
    return <div className={`card ${variant}`}>{children}</div>;
};

return Card;
