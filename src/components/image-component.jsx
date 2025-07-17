export const ImageComponent = ({ image, title }) => {
    return (
        <img src={image} alt={title} className="product-image" />
    )
}