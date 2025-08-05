import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from 'sweetalert2';
import useCart from "../hooks/useCart";
import axios from 'axios';
import Modal from 'react-modal';

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;

  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = item => {
    if (user && user.email) {
      const cartItem = { menuItemId: _id, name, quantity: 1, image, price, email: user.email };

      axios.post('http://localhost:6001/carts', cartItem)
        .then((response) => {
          console.log(response);
          if (response) {
            refetch(); // refetch cart
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Food added to the cart.',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    } else {
      Swal.fire({
        title: 'Please login to order the food',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login now!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <figure onClick={handleImageClick} className="cursor-pointer">
        <img src={item.image} alt="Item" className="hover:scale-105 transition-all duration-300 md:h-72" />
      </figure>
      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}!</h2>
        </Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span> {item.price}
          </h5>
          <button onClick={() => handleAddToCart(item)} className="btn bg-green text-white">Add to Cart</button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Image Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={handleCloseModal} className="modal-close">X</button>
        <img src={item.image} alt={item.name} className="modal-image" />
      </Modal>
    </div>
  );
};

export default Cards;
