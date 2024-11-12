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
        <form onSubmit={onSubmitHandler}>


            <div>
                <p>Add Doctor</p>
                <div>

                    <div>
                        <label htmlFor='doc-img'>
                            <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} />
                        </label>
                        <input onClick={(e) => setDocImg(e.target.files[0])} type='file' id='doc-img' hidden />
                        <p>upload image</p>
                    </div>
                    <div>
                        {/* left side*/}
                        <div>
                            <div>
                                <p>doctor name </p>
                                <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Name' required />
                            </div>
                            <div>
                                <p>doctor email </p>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required />
                            </div>
                            <div>
                                <p>doctor password </p>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required />
                            </div>
                            <div>
                                <p>Experience</p>
                                <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                                    <option value='1 year'>1 year</option>
                                    <option value='2 years'>2 years</option>
                                    <option value='3 years'>3 years</option>
                                    <option value='4 years'>4 years</option>
                                    <option value='5 years'>5 years</option>
                                    <option value='6 years'>6 years</option>
                                    <option value='7 years'>7 years</option>
                                    <option value='8 years'>8 years</option>
                                    <option value='9 years'>9 years</option>
                                    <option value='10 years'>10 years</option>
                                </select>
                            </div>
                            <div>
                                <p>doctor Fees </p>
                                <input value={fees} onChange={(e) => setFees(e.target.value)} type='number' placeholder='Fees' required />
                            </div>
                        </div>
                    </div>

                    <div>
                        {/*right side */}
                        <div>
                            <p>speciality</p>
                            <select value={speciality} onChange={(e) => setSpeciality(e.target.value)}>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>

                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div>
                            <p>Education</p>
                            <input value={degree} onChange={(e) => setDegree(e.target.value)} type='text' placeholder='Education' required />
                        </div>
                        <div>
                            <p>Address</p>
                            <input value={address1} onChange={(e) => setAddress1(e.target.value)} type='text' placeholder='address 1' required />
                            <input value={address2} onChange={(e) => setAddress2(e.target.value)} type='text' placeholder='address 2' required />
                        </div>
                    </div>
                    <div>
                        <p>about Doctor</p>
                        <textarea value={about} onChange={(e) => setAbout(e.target.value)} type='text' placeholder='write About' rows={5} required />
                    </div>

                </div>

            </div>
            <button >submit</button>
        </form>
    )
}

export default AddDoctor