import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../Context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 year');
    const [about, setAbout] = useState('');
    const [fees, setFees] = useState('');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [speciality, setSpeciality] = useState("General physician");
    const { backendUrl, atoken } = useContext(AdminContext);
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            if (!docImg) {
                return toast.error('Image not selected');
            }
            const formData = new FormData();


            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('about', about);
            formData.append('fees', Number(fees));
            formData.append('degree', degree);
            formData.append('speciality', speciality);


            const address = JSON.stringify({ line1: address1, line2: address2 });
            formData.append('address', address);
            formData.forEach((value, key) => {
                console.log(`key ${key},value ${value}`);

            });
            const response = await axios.post(backendUrl + "/api/admin/add-doctor", formData, { headers: { atoken } });
            console.log("response", response);

            if (response.data.success) {
                toast.success(response.data.message);
                setDocImg(false);
                setName('');
                setEmail('');
                setPassword('');

                setAbout('');
                setFees('');
                setDegree('');
                setAddress1('');
                setAddress2('');


            }
            else {
                toast.error(response.data.message);


            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);

        }

    }
    return (
        <form onSubmit={onSubmitHandler} className="space-y-6 p-6 bg-gray-100 rounded-lg shadow-md max-w-3xl mx-auto">
        <div className="text-center">
            <p className="text-2xl font-semibold">Add Doctor</p>
        </div>
    
        <div className="flex flex-wrap gap-6">
            {/* Left Side */}
            <div className="w-full sm:w-1/2 space-y-4">
                <div>
                    <label htmlFor="doc-img" className="block text-lg font-medium">Upload Image</label>
                    <div className="flex justify-center items-center space-x-4">
                        <label htmlFor="doc-img">
                            <img
                                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                alt="Doctor"
                                className="w-32 h-32 object-cover rounded-full"
                            />
                        </label>
                        <input
                            onClick={(e) => setDocImg(e.target.files[0])}
                            type="file"
                            id="doc-img"
                            hidden
                        />
                    </div>
                    <p className="text-center text-sm text-gray-500">Click to upload image</p>
                </div>
    
                <div>
                    <label htmlFor="name" className="block text-lg font-medium">Doctor Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        id="name"
                        placeholder="Name"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
    
                <div>
                    <label htmlFor="email" className="block text-lg font-medium">Doctor Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
    
                <div>
                    <label htmlFor="password" className="block text-lg font-medium">Doctor Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        placeholder="Password"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
    
                <div>
                    <label htmlFor="experience" className="block text-lg font-medium">Experience</label>
                    <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        id="experience"
                        className="w-full p-3 border border-gray-300 rounded-md"
                    >
                        <option value="1 year">1 year</option>
                        <option value="2 years">2 years</option>
                        <option value="3 years">3 years</option>
                        <option value="4 years">4 years</option>
                        <option value="5 years">5 years</option>
                        <option value="6 years">6 years</option>
                        <option value="7 years">7 years</option>
                        <option value="8 years">8 years</option>
                        <option value="9 years">9 years</option>
                        <option value="10 years">10 years</option>
                    </select>
                </div>
    
                <div>
                    <label htmlFor="fees" className="block text-lg font-medium">Doctor Fees</label>
                    <input
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        type="number"
                        id="fees"
                        placeholder="Fees"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
    
            {/* Right Side */}
            <div className="w-full sm:w-1/2 space-y-4">
                <div>
                    <label htmlFor="speciality" className="block text-lg font-medium">Speciality</label>
                    <select
                        value={speciality}
                        onChange={(e) => setSpeciality(e.target.value)}
                        id="speciality"
                        className="w-full p-3 border border-gray-300 rounded-md"
                    >
                        <option value="General physician">General physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatricians">Pediatricians</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                    </select>
                </div>
    
                <div>
                    <label htmlFor="degree" className="block text-lg font-medium">Education</label>
                    <input
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        type="text"
                        id="degree"
                        placeholder="Education"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
    
                <div>
                    <label htmlFor="address1" className="block text-lg font-medium">Address</label>
                    <input
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        type="text"
                        id="address1"
                        placeholder="Address 1"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                    <input
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        type="text"
                        id="address2"
                        placeholder="Address 2"
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </div>
    
        <div>
            <label htmlFor="about" className="block text-lg font-medium">About Doctor</label>
            <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                id="about"
                placeholder="Write About"
                rows={5}
                required
                className="w-full p-3 border border-gray-300 rounded-md"
            />
        </div>
    
        <div className="text-center">
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Submit
            </button>
        </div>
    </form>
    )
}

export default AddDoctor