import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HealthRecords from './HealthRecords';
import WorkoutsList from './WorkoutsList';

const PetProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPet();
    }, [id]);

    const fetchPet = async () => {
        try {
            const response = await axios.get(`/pets/${id}`);
            setPet(response.data);
        } catch (error) {
            console.error('Error fetching pet:', error);
            navigate('/pets');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading pet profile...</div>
            </div>
        );
    }

    if (!pet) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Pet not found</h3>
                <button
                    onClick={() => navigate('/pets')}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Back to Pets
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Pet Header */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            {pet.photo ? (
                                <img
                                    className="h-24 w-24 rounded-full object-cover"
                                    src={`/storage/${pet.photo}`}
                                    alt={pet.name}
                                />
                            ) : (
                                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-3xl">🐾</span>
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{pet.name}</h1>
                                <p className="text-gray-600">{pet.breed} • {pet.age} years old • {pet.gender}</p>
                                {pet.microchip_number && (
                                    <p className="text-sm text-gray-500">Microchip: {pet.microchip_number}</p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/pets')}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Back to Pets
                        </button>
                    </div>
                    {pet.notes && (
                        <div className="mt-4">
                            <p className="text-gray-700">{pet.notes}</p>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-200">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 py-4 px-6 text-center font-medium ${
                                activeTab === 'overview'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('health')}
                            className={`flex-1 py-4 px-6 text-center font-medium ${
                                activeTab === 'health'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Health Records
                        </button>
                        <button
                            onClick={() => setActiveTab('workouts')}
                            className={`flex-1 py-4 px-6 text-center font-medium ${
                                activeTab === 'workouts'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            Activities
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Health Summary</h3>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Health Records: {pet.health_records ? pet.health_records.length : 0}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Last Health Record: {
                                        pet.health_records && pet.health_records.length > 0
                                            ? new Date(pet.health_records[pet.health_records.length - 1].date).toLocaleDateString()
                                            : 'No records'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Summary</h3>
                            <div className="space-y-2">
                                <p className="text-sm text-gray-600">
                                    Total Activities: {pet.workouts ? pet.workouts.length : 0}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Last Activity: {
                                        pet.workouts && pet.workouts.length > 0
                                            ? new Date(pet.workouts[pet.workouts.length - 1].date).toLocaleDateString()
                                            : 'No activities'
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'health' && <HealthRecords petId={pet.id} />}
                {activeTab === 'workouts' && <WorkoutsList petId={pet.id} />}
            </div>
        </div>
    );
};

export default PetProfile; 