import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserHome = () => {
    const examineId = localStorage.getItem('userId');
    const [data, setData] = useState([]);
    const [reslt, setReslt] = useState([]);

    const handlefetch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/dashboard/exams/${examineId}`);
            if (!response.ok) throw new Error('Exams data not found');
            const result = await response.json();
            setData(result);

            const res = await axios.get(`http://localhost:5000/api/dashboard/examinee-result/${examineId}`);
            setReslt(Array.isArray(res.data.message) ? res.data.message : [res.data.message]);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    useEffect(() => {
        handlefetch();
    }, [examineId]);

    return (
        <div>
            <div className='container-fluid p-0'>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card p-2" style={{ border: "1px solid #6f42c1", minHeight: "170px", width: "100%" }}>
                            <div className="row mb-4">
                                <div className="col-sm-4">
                                    <div className="shadow p-4 bg-light text-center" style={{ border: "1px solid #6f42c1" }}>
                                        <u style={{ color: "#6f42c1" }}>
                                            <h5 className="fw-bold" style={{ height: "48px", color: "#6f42c1" }}>
                                                <i className="fa-solid fa-file-lines me-2"></i>Total Exams
                                            </h5>
                                        </u>
                                        <h5>{data.length}</h5>
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className="shadow p-4 bg-light text-center" style={{ border: "1px solid #6f42c1" }}>
                                        <u style={{ color: "#6f42c1" }}>
                                            <h6 className="fw-bold" style={{ height: "30px", color: "#6f42c1" }}>
                                                <i className="fa-solid fa-chart-line me-2"></i>Result Summary
                                            </h6>
                                        </u>
                                        <h6 className="fw-bold text-success mb-1">
                                            <i className="fa-solid fa-circle-check me-2"></i>Passed: {reslt.length}
                                        </h6>
                                        <h6 className="fw-bold text-danger">
                                            <i className="fa-solid fa-circle-xmark me-2"></i>Failed: {data.length - reslt.length}
                                        </h6>
                                    </div>
                                </div>

                                <div className="col-sm-4">
                                    <div className="shadow h-100 p-4 bg-light text-center" style={{ border: "1px solid #6f42c1" }}>
                                        <u style={{ color: "#6f42c1" }}>
                                            <h6 className="fw-bold" style={{ height: "30px", color: "#6f42c1" }}>
                                                <i className="fa-solid fa-chart-line me-2"></i>Overall Performance
                                            </h6>
                                        </u>
                                        <div className="progress" style={{ height: "20px" }}>
                                            <div
                                                className="progress-bar bg-success"
                                                role="progressbar"
                                                style={{ width: `${(reslt.length / data.length) * 100 || 0}%` }}
                                                aria-valuenow={(reslt.length / data.length) * 100 || 0}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {(reslt.length / data.length) * 100 || 0}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;