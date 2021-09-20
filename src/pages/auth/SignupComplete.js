import React, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { createOrUpdateUser } from '../../functions/auth'
const SignupComplete = ({ history }) => {
    const [email, setEmail] = useState("")
    const [pswd, setPswd] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
    }, [history])
    const handleSubmit = async (e) => {
        e.preventDefault();
        //email validation
        if (!email || !pswd) {
            toast.error("Email and Password is required")
            return
        }
        if (pswd.length < 6) {
            toast.error("password must be atleast 6 characters")
            return

        }
        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)
            console.log("result ", result)
            if (result.user.emailVerified) {
                //remove email from local storage
                toast.success("Registered successfully")
                window.localStorage.removeItem("emailForRegistration")
                let user = auth.currentUser;
                //save pswd
                await user.updatePassword(pswd)
                console.log("user", user)
                //get userid
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
                    })
                    .catch(e => console.log("err", e.message))

                //redirect to home
                history.push("/")
            }
        }
        catch (error) {
            console.log(error)

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
                    value={email}
                    disabled

                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    name="password"
                    placeholder="Set Password"
                    value={pswd}
                    className="form-control"
                    onChange={e => setPswd(e.target.value)}
                    autoFocus />
            </div>

            <div>
                <button type="submit" className="continue btn btn-danger">Complete Registration</button>
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
export default SignupComplete
