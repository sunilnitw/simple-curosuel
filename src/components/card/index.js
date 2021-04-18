import './style.css';
function Card({data}) {
    return (<div className={`card`}>
        <div>
            <img src={`http://localhost:3000/assets/${data.img}`}  alt="image" />
        </div>
       {data.name}
       <p>Price: {data.price}</p>
       <p>Category: {data.category}</p>
    </div>)
}
export default Card;