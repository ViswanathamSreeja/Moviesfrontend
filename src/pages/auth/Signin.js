import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import { useSelector } from 'react-redux'
import { createOrUpdateUser } from '../../functions/auth'
const Signin = ({ history }) => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState(" ")
    const [pswd, setPswd] = useState(" ")
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        let intended = history.location.state
        if (intended) {
            return
        } else {
            if (user && user.token) history.push("/")
        }
    }, [user, history])

    const roleBasedRedirect = (res) => {
        //check if intended
        let intended = history.location.state
        if (intended) {
            history.push(intended.from)
        }
        else {
            if (res.data.role === 'admin') {
                history.push("/Admin/Dashboard")
            }
            else {
                history.push("/User/History")
            }
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const result = await auth.signInWithEmailAndPassword(email, pswd)
            const { user } = result
            const idTokenResult = await user.getIdTokenResult()
            createOrUpdateUser(idTokenResult.token)           //calling func
                .then(res => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,

                        }
                    });
                    roleBasedRedirect(res)
                })
                .catch(e => console.log("err", e.message))
            setLoading(false)

            history.push("/")

        }
        catch (e) {
            setLoading(false)
            toast.error(e.message)
        }


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
                    onChange={e => setEmail(e.target.value)}


                />
            </div>
            <div className="form-group">
                <input
                    type="pswd"
                    name="pswd"
                    placeholder="Password"
                    className="form-control"
                    onChange={e => setPswd(e.target.value)} />
            </div>

            <div>
                <button type="submit"
                    className="continue btn btn-danger btn-md btn-block"
                    disabled={!email || pswd.length < 6}><i className="bi bi-envelope"></i>Login with Email/Password</button>
            </div>
        </form>
    )
    return (
        <div className="container">
            <div className="d-flex justify-content-center flex-column align-items-center signin" >
                {loading ? (<h4>Loading.....</h4>) : (
                    <h4 style={{ fontWeight: "500" }}> SIGN IN </h4>)}
                <div> {SigninForm()} </div>

            </div>
        </div>

    )
}
export default Signin
