import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllreview } from '../../redux/productSlice';
// import { fetchReviews, deleteReview } from '../redux/reviewSlice';

function Feedback() {
  const [filterRating, setFilterRating] = useState('all');
  const dispatch = useDispatch();

  const review = useSelector((state) => state.product?.review) || [];
  console.log(review);


  useEffect(() => {
    dispatch(getAllreview());
  }, [dispatch]);



  const filteredReviews = review?.filter((review) => {
    return filterRating === 'all' ? true : review.rating === parseInt(filterRating)
  });



  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col">
          <h1 className="h3 mb-2 text-gray-800">Review Management</h1>
          <p className="mb-4">Manage customer feedback and ratings</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${filterRating === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilterRating('all')}
            >
              All Ratings
            </button>
            {[1, 2, 3, 4, 5].map(rating => (
              <button
                key={rating}
                type="button"
                className={`btn ${filterRating == rating ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilterRating(rating)}
              >
                {rating} Star
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>User</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredReviews?.map((review) => (
                  <tr key={review._id}>
                    <td>
                      <div className="fw-bold">{review.userId.username}</div>
                      <small className="text-muted">ID: {review.userId._id}</small>
                    </td>
                    <td>
                      <span className="badge">{review.rating} Stars</span>
                    </td>
                    <td>{review.comment}</td>
                    {/* <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(review._id)}>
                        Delete
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
