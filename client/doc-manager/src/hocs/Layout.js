import React, {useEffect} from 'react';
import Navbar from '../components/Navbar';
import {connect} from 'react-redux'; 
import { Navigate } from 'react-router-dom';
import { checkAuthenticated, load_user } from '../actions/auth'; 



const Layout = (props) => {

    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, []);

    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    )
    
};

export default connect(null, {checkAuthenticated, load_user })(Layout);