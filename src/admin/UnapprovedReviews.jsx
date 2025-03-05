import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5656"; // Adjust if needed

function UnapprovedReviews() {
    const [unapprovedReviews, setUnapprovedReviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch unapproved reviews (including project title)
                const response = await axios.get(`${API_BASE_URL}/api/unapproved-reviews`);
                setUnapprovedReviews(response.data.reviews || []);
            } catch (error) {
                console.error("Error fetching unapproved reviews:", error);
            }
        }

        fetchData();
    }, []);

    const handleApprove = async (reviewId) => {
        try {
            await axios.put(`${API_BASE_URL}/api/unapproved-reviews/${reviewId}/approve`);
            setUnapprovedReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
        } catch (error) {
            console.error("Error approving review:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Unapproved Reviews</h1>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-4 px-5 text-left text-sm font-semibold text-gray-700">User</th>
                            <th className="py-4 px-5 text-left text-sm font-semibold text-gray-700">Rating</th>
                            <th className="py-4 px-5 text-left text-sm font-semibold text-gray-700">Review</th>
                            <th className="py-4 px-5 text-left text-sm font-semibold text-gray-700">Project</th>
                            <th className="py-4 px-5 text-left text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unapprovedReviews.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-6 text-center text-gray-500">
                                    No unapproved reviews available.
                                </td>
                            </tr>
                        ) : (
                            unapprovedReviews.map((review) => (
                                <tr key={review.id} className="border-b hover:bg-gray-100 transition-all">
                                    {/* User Info */}
                                    <td className="py-4 px-5 flex items-center gap-3">
                                        <img
                                            className="w-12 h-12 rounded-full object-cover"
                                            src={review.image ? `${API_BASE_URL}/${review.image}` : "https://i.pravatar.cc/150?img=3"}
                                            alt={review.name}
                                        />
                                        <div>
                                            <p className="text-sm font-medium">{review.name}</p>
                                        </div>
                                    </td>

                                    {/* Rating (Fixed Alignment) */}
                                    <td className="py-4 px-5 text-sm text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, starIndex) => (
                                                <FaStar
                                                    key={starIndex}
                                                    className={`text-lg ${
                                                        starIndex < review.rating ? "text-yellow-500" : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </td>

                                    {/* Review */}
                                    <td className="py-4 px-5 text-sm text-gray-600 truncate max-w-[250px]">
                                        “{review.quote}”
                                    </td>

                                    {/* Project Title */}
                                    <td className="py-4 px-5 text-sm text-gray-600">
                                        {review.project ? review.project.title : "Loading..."}
                                    </td>

                                    {/* Action Button */}
                                    <td className="py-4 px-5">
                                        <button
                                            onClick={() => handleApprove(review.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                                        >
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UnapprovedReviews;
