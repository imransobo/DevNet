import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

const Contact = () => {
    
    const [form, setForm] = useState({
        title: '',
        message: ''
    })

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name] : event.target.value
            
        })
        console.log([event.target.name] + " " + event.target.value);
    }

    const sendMail = () => {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("message", form.message);

        axios.post("http://localhost:5000/sendEmail", formData).then((response) => {
            console.log(response.data);
            console.log(response.status);
            if(response.status === 200) {
                Swal.fire({
                    title: 'Uspješno ste poslali poruku našem timu!',
                    icon: 'success',
                    toast: true,
                    timer: 4000,
                    position: 'top-end',
                    color: 'blue',
                    iconColor: 'blue',
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }
        })
    }

    useEffect(() => {
        document.title = "Kontakt"
    })

    return (
        <div className='container mt-4 login'>
                <div className='row'>
                    <div className='col-6 offset-3'>
                        <div className='card'>
                            <h4 className="mt-4 ms-3">Prijavite grešku / dajte recenziju</h4>
                            <div className='card-body'>
                                <div className="mb-3">
                                    <label className="form-label h6">Naslov</label>
                                    <input type={"text"} required onChange={handleChange} className="form-control regPolja" name="title" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label h6">Poruka</label>
                                    <textarea style={{ resize: "none"}} type={"text"} onChange={handleChange} className="form-control regPolja" name="message" />
                                </div>
                                <button type="submit" onClick={sendMail} className="btn btn-dark">Pošalji</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Contact;