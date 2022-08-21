import React, { FC } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

type TPizza = {
  imageUrl?: string,
  title?: string,
  price?: number,
  rating?: number,
}

const PizzaPage: FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<TPizza>({});
  console.log(id)
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://62efe09657311485d12a2ac3.mockapi.io/items/${id} `
        );
        setPizza({...data});
      } catch (err) {
        alert("Пиццы не прогрузились!");
        navigate('/')
      }
    }

    fetchPizza();
  }, []);
  console.log(pizza)

  if (!pizza) {
    return (
      <div>
        <h1> Идет загрузка</h1>
      </div>
    );
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
      <p>{pizza.rating}</p>
      <Link to="/" className="button button--outline button--add go-back-btn">
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 13L1 6.93015L6.86175 1"
            stroke="#D3D3D3"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default PizzaPage;
