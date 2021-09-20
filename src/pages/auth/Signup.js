import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'

const Signup = ({ history }) => {
    const [email, setEmail] = useState(" ")
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        if (user && user.token) history.push("/")
    }, [user, history])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: "http://localhost:3000/signup/complete",
            handleCodeInApp: true,
        }
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(`link has been sent to ${email}.Please verify`)

        window.localStorage.setItem('emailForRegistration', email)

        setEmail("")
    }


    const SigninForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginTop: "10px" }}>
                <input
                    type="email"
                    name="emailid"
                    placeholder="Email Id"
                    className="form-control"
                    autoFocus
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div>
                <button className="continue btn btn-danger">continue</button>
            </div>
        </form>
    )
    return (
        <div className="container">
            <div className="d-flex justify-content-center flex-column align-items-center signin" >
                <h4 style={{ fontWeight: "500" }}> SIGN UP </h4>
                <div> {SigninForm()} </div>

            </div>
        </div>

    )
}
export default Signup
