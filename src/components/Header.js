import React from 'react'
import { Link } from "react-router-dom"
import firebase from '@firebase/app-compat'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { user } = useSelector(state => ({ ...state }))
    const logout = () => {
        firebase.auth().signOut()
        dispatch({
            type: "LOG_OUT",
            payload: null,
        })
        history.push("/signin")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ color: 'whitesmoke' }}>
                <Link className="navbar-brand" to="#"  ><i className="bi bi-film"></i> </Link>

                <ul className="navbar-nav">
                    <li className="nav-item active ">
                        <Link className="nav-link" to="/" >HOME <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active ">
                        <Link className="nav-link" to="/popular" >Popular <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active ">
                        <Link className="nav-link" to="/latest" >Latest <span className="sr-only">(current)</span></Link>
                    </li>
                </ul>





                <div className="ml-auto navbarNav">
                    {!user && (
                        <ul className="navbar-nav">


                            <li className="nav-item active">
                                <Link className="nav-link mr-5" to="/signin"><i className="bi bi-person"></i>Sign In</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link mr-5" to="/signup"><i className="bi bi-person-plus"></i>Sign Up</Link>
                            </li>
                        </ul>
                    )}
                    {(user) && (
                        <ul className="navbar-nav">
                            <li className="nav-item float-right active">
                                <Link className="nav-link" onClick={logout} to="#"><i className="bi bi-box-arrow-in-right"></i>Sign out</Link>
                            </li>
                        </ul>
                    )}

                </div>
            </nav >



        </div >
    )
}
export default Header
