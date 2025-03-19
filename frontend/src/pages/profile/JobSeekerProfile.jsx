import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { getProfile, updateProfile } from '../../features/profile/profileSlice';
import { clearProfileError } from '../../features/profile/profileSlice';

const JobSeekerProfile = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
        education: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Create Profile</h2>
            <form>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Phone" />
                <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Enter Experience" />
                <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Enter Education" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default JobSeekerProfile;
