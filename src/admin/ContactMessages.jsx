import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = 'http://localhost:5656'; // Adjust the base URL as needed

function ContactMessages() {
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 20;

    useEffect(() => {
        // Fetch contact messages
        axios.get(`${API_BASE_URL}/api/contact/messages`)
            .then(response => {
                setMessages(response.data.messages || []);
            })
            .catch(error => console.error("Error fetching contact messages:", error));
    }, []);

    // Calculate the current messages to display
    const indexOfLastMessage = currentPage * messagesPerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
    const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(messages.length / messagesPerPage);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Contact Messages</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="py-3 px-5 bg-gray-200 text-left text-sm font-semibold text-gray-700">Name</th>
                            <th className="py-3 px-5 bg-gray-200 text-left text-sm font-semibold text-gray-700">Company</th>
                            <th className="py-3 px-5 bg-gray-200 text-left text-sm font-semibold text-gray-700">Email</th>
                            <th className="py-3 px-5 bg-gray-200 text-left text-sm font-semibold text-gray-700">Phone</th>
                            <th className="py-3 px-5 bg-gray-200 text-left text-sm font-semibold text-gray-700">Message</th>
                            <th className="py-3 px-5 bg-gray-200 text-left text-sm font-semibold text-gray-700">Agreed</th>
                            <th className="py-3 px-5 bg-gray-200 text-left text-sm font-semibold text-gray-700">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMessages.map((msg) => (
                            <tr key={msg.id} className="border-b">
                                <td className="py-3 px-5 text-sm text-gray-600">{msg.firstName} {msg.lastName}</td>
                                <td className="py-3 px-5 text-sm text-gray-600">{msg.company || 'N/A'}</td>
                                <td className="py-3 px-5 text-sm text-gray-600">{msg.email}</td>
                                <td className="py-3 px-5 text-sm text-gray-600">{msg.phone || 'N/A'}</td>
                                <td className="py-3 px-5 text-sm text-gray-600">{msg.message}</td>
                                <td className="py-3 px-5 text-sm text-gray-600">{msg.agreed ? 'Yes' : 'No'}</td>
                                <td className="py-3 px-5 text-sm text-gray-600">{new Date(msg.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <nav>
                    <ul className="flex list-none">
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index} className="mx-1">
                                <button
                                    onClick={() => paginate(index + 1)}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default ContactMessages;