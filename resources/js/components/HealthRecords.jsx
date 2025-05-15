import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HealthRecordForm from './HealthRecordForm';

const HealthRecords = ({ petId }) => {
    const [healthRecords, setHealthRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        fetchHealthRecords();
    }, [petId]);

    const fetchHealthRecords = async () => {
        try {
            const response = await axios.get(`/pets/${petId}/health-records`);
            setHealthRecords(response.data);
        } catch (error) {
            console.error('Error fetching health records:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRecordSubmit = async (recordData) => {
        try {
            if (editingRecord) {
                await axios.put(`/pets/${petId}/health-records/${editingRecord.id}`, recordData);
            } else {
                await axios.post(`/pets/${petId}/health-records`, recordData);
            }
            setShowForm(false);
            setEditingRecord(null);
            fetchHealthRecords();
        } catch (error) {
            console.error('Error saving health record:', error);
        }
    };

    const handleDeleteRecord = async (recordId) => {
        if (confirm('Are you sure you want to delete this health record?')) {
            try {
                await axios.delete(`/pets/${petId}/health-records/${recordId}`);
                fetchHealthRecords();
            } catch (error) {
                console.error('Error deleting health record:', error);
            }
        }
    };

    const handleEditRecord = (record) => {
        setEditingRecord(record);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingRecord(null);
    };

    const getTypeColor = (type) => {
        const colors = {
            vaccination: 'bg-green-100 text-green-800',
            vet_visit: 'bg-blue-100 text-blue-800',
            medication: 'bg-yellow-100 text-yellow-800',
            allergy: 'bg-red-100 text-red-800'
        };
        return colors[type] || 'bg-gray-100 text-gray-800';
    };

    const getTypeIcon = (type) => {
        const icons = {
            vaccination: '💉',
            vet_visit: '🏥',
            medication: '💊',
            allergy: '⚠️'
        };
        return icons[type] || '📝';
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg">Loading health records...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Health Records</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Health Record
                </button>
            </div>

            {healthRecords.length > 0 ? (
                <div className="space-y-4">
                    {healthRecords.map((record) => (
                        <div key={record.id} className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-4">
                                    <span className="text-2xl">{getTypeIcon(record.type)}</span>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="text-lg font-medium text-gray-900">{record.title}</h3>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(record.type)}`}>
                                                {record.type.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {new Date(record.date).toLocaleDateString()}
                                        </p>
                                        {record.description && (
                                            <p className="text-gray-700 mb-2">{record.description}</p>
                                        )}
                                        {record.veterinarian && (
                                            <p className="text-sm text-gray-600">Veterinarian: {record.veterinarian}</p>
                                        )}
                                        {record.medication_name && (
                                            <p className="text-sm text-gray-600">Medication: {record.medication_name}</p>
                                        )}
                                        {record.notes && (
                                            <p className="text-sm text-gray-500 mt-2">Notes: {record.notes}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleEditRecord(record)}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteRecord(record.id)}
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
                    <span className="text-6xl">🏥</span>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No health records</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by adding the first health record.</p>
                    <div className="mt-6">
                        <button
                            onClick={() => setShowForm(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Add Health Record
                        </button>
                    </div>
                </div>
            )}

            {showForm && (
                <HealthRecordForm
                    petId={petId}
                    record={editingRecord}
                    onSubmit={handleRecordSubmit}
                    onClose={handleCloseForm}
                />
            )}
        </div>
    );
};

export default HealthRecords; 