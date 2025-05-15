import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PetForm from './PetForm';

const PetsList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPet, setEditingPet] = useState(null);

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        try {
            const response = await axios.get('/pets');
            setPets(response.data);
        } catch (error) {
            console.error('Error fetching pets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePetSubmit = async (petData) => {
        try {
            if (editingPet) {
                await axios.put(`/pets/${editingPet.id}`, petData);
            } else {
                await axios.post('/pets', petData);
            }
            setShowForm(false);
            setEditingPet(null);
            fetchPets();
        } catch (error) {
            console.error('Error saving pet:', error);
        }
    };

    const handleDeletePet = async (petId) => {
        if (confirm('Are you sure you want to delete this pet?')) {
            try {
                await axios.delete(`/pets/${petId}`);
                fetchPets();
            } catch (error) {
                console.error('Error deleting pet:', error);
            }
        }
    };

    const handleEditPet = (pet) => {
        setEditingPet(pet);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingPet(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading pets...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        My Pets
                    </h2>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <button
                        onClick={() => setShowForm(true)}
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add New Pet
                    </button>
                </div>
            </div>

            {pets.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {pets.map((pet) => (
                        <div key={pet.id} className="bg-white overflow-hidden shadow rounded-lg">
                            <Link to={`/pets/${pet.id}`}>
                                {pet.photo ? (
                                    <img
                                        className="h-48 w-full object-cover"
                                        src={`/storage/${pet.photo}`}
                                        alt={pet.name}
                                    />
                                ) : (
                                    <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-6xl">🐾</span>
                                    </div>
                                )}
                            </Link>
                            <div className="p-4">
                                <Link to={`/pets/${pet.id}`}>
                                    <h4 className="text-lg font-medium text-gray-900 hover:text-blue-600">
                                        {pet.name}
                                    </h4>
                                </Link>
                                <p className="text-sm text-gray-600">
                                    {pet.breed} • {pet.age} years old • {pet.gender}
                                </p>
                                {pet.microchip_number && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Microchip: {pet.microchip_number}
                                    </p>
                                )}
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        onClick={() => handleEditPet(pet)}
                                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeletePet(pet.id)}
                                        className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="mt-8 text-center">
                    <span className="text-6xl">🐾</span>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No pets</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding your first pet.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Add Pet
                        </button>
                    </div>
                </div>
            )}

            {showForm && (
                <PetForm
                    pet={editingPet}
                    onSubmit={handlePetSubmit}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
};

export default PetsList; 