import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { getUser } from "../../utilities/users-service";
import Review from "../../components/Review";
import Rating from "react-rating-stars-component";

export default function CardDetails({ cardsDetails, updateFirstSearch }) {
  const [user, setUser] = useState(getUser);
  const { cardId } = useParams();
  console.log(cardId);
  console.log(cardsDetails);
  const card = cardsDetails.find((card) => card.id === cardId);
  const image = card.images.large;
  const reviewArray = [1, 2, 3];
  const navigate = useNavigate();

  function handleSearch(searchInput) {
    updateFirstSearch(searchInput);
    navigate(`/search?q=${searchInput}`);
  }

  return (
    <>
      <NavBar user={user} setUser={setUser} handleSearch={handleSearch} />
      <div className="card-details-container flex flex-row m-5">
        <div className="card-image w-6/12">
          <img src={image} alt={card.name} />
        </div>
        <div className="more-details w-6/12 flex flex-col items-center justify-items-center">
          <div className="price-options flex flex-row m-4 text-white">
            <p className="mx-2">No. in stock at $1.99</p>
            <p className="mx-2">Dropdown qty</p>
            <button className="btn btn-sm bg-indigo-700 mx-2 text-white">
              Add to Cart
            </button>
          </div>
          <Rating count={5} size={24} value={5} edit={false} />
          <div className="review-container m-5">
            {reviewArray.map((review, index) => (
              <Review key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
