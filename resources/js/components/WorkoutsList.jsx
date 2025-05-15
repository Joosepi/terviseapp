import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkoutForm from './WorkoutForm';

const WorkoutsList = ({ petId }) => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingWorkout, setEditingWorkout] = useState(null);

    useEffect(() => {
        fetchWorkouts();
    }, [petId]);

    const fetchWorkouts = async () => {
        try {
            const response = await axios.get(`/pets/${petId}/workouts`);
            setWorkouts(response.data);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleWorkoutSubmit = async (workoutData) => {
        try {
            if (editingWorkout) {
                await axios.put(`/pets/${petId}/workouts/${editingWorkout.id}`, workoutData);
            } else {
                await axios.post(`/pets/${petId}/workouts`, workoutData);
            }
            setShowForm(false);
            setEditingWorkout(null);
            fetchWorkouts();
        } catch (error) {
            console.error('Error saving workout:', error);
        }
    };

    const handleDeleteWorkout = async (workoutId) => {
        if (confirm('Are you sure you want to delete this activity?')) {
            try {
                await axios.delete(`/pets/${petId}/workouts/${workoutId}`);
                fetchWorkouts();
            } catch (error) {
                console.error('Error deleting workout:', error);
            }
        }
    };

    const handleEditWorkout = (workout) => {
        setEditingWorkout(workout);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingWorkout(null);
    };

    const getActivityIcon = (type) => {
        const icons = {
            walk: '🚶',
            play: '🎾',
            training: '🎓'
        };
        return icons[type] || '🏃';
    };

    const getActivityColor = (type) => {
        const colors = {
            walk: 'bg-green-100 text-green-800',
            play: 'bg-purple-100 text-purple-800',
            training: 'bg-blue-100 text-blue-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading activities...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Activities</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Activity
                </button>
            </div>

            {workouts.length > 0 ? (
                <div className="space-y-4">
                    {workouts.map((workout) => (
                        <div key={workout.id} className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <span className="text-2xl">{getActivityIcon(workout.activity_type)}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="text-lg font-medium text-gray-900 capitalize">
                                                {workout.activity_type}
                                            </h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityColor(workout.activity_type)}`}>
                                                {workout.activity_type.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {new Date(workout.date).toLocaleDateString()}
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                            <div>
                                                <span className="font-medium">Duration:</span> {workout.duration} minutes
                                            </div>
                                            {workout.distance && (
                                                <div>
                                                    <span className="font-medium">Distance:</span> {workout.distance} km
                                                </div>
                                            )}
                                        </div>
                                        {workout.notes && (
                                            <p className="text-sm text-gray-500 mt-2">Notes: {workout.notes}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditWorkout(workout)}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteWorkout(workout.id)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <span className="text-6xl">🏃</span>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No activities</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding the first activity.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Add Activity
                        </button>
                    </div>
                </div>
            )}

            {showForm && (
                <WorkoutForm
                    petId={petId}
                    workout={editingWorkout}
                    onSubmit={handleWorkoutSubmit}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
};

export default WorkoutsList; 