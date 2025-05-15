import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        petsCount: 0,
        healthRecordsCount: 0,
        workoutsCount: 0
    });
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [statsResponse, petsResponse] = await Promise.all([
                axios.get('/dashboard/stats'),
                axios.get('/pets')
            ]);
            
            setStats(statsResponse.data);
            // Defensive: ensure pets is always an array
            const petsData = Array.isArray(petsResponse.data) ? petsResponse.data : [];
            setPets(petsData.slice(0, 3)); // Show only first 3 pets
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setPets([]); // fallback to empty array on error
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Dashboard
                    </h2>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">🐕</span>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        My Pets
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats.petsCount}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">🏥</span>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Health Records
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats.healthRecordsCount}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-2xl">🏃</span>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Activities
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        {stats.workoutsCount}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Pets */}
            <div className="mt-8">
                <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Your Pets
                        </h3>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link
                            to="/pets"
                            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            View All Pets
                        </Link>
                    </div>
                </div>

                {pets.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                                    <div className="p-4">
                                        <h4 className="text-lg font-medium text-gray-900">{pet.name}</h4>
                                        <p className="text-sm text-gray-600">{pet.breed} • {pet.age} years old</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-6 text-center">
                        <span className="text-6xl">🐾</span>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No pets</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by adding your first pet.</p>
                        <div className="mt-6">
                            <Link
                                to="/pets"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Add Pet
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard; 