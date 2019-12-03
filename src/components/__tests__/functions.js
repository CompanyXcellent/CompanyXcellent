import axios from 'axios';

module.exports = {
    validate : values => {
        const errors = {};

        //?email
        if(!values.email) {
            errors.email = 'Must provide an email address'
        } else if (!/\S+@\.\S+/.test(values.email)){
            errors.email = 'Invalid Email address'
        }

        //?firstName
        if(!values.firstName || null ) {
            errors.firstName = 'Must enter First Name';
        } else if ( values.firstName.length < 3 || false) {
            errors.firstName = 'no abbreviations please'
        }

        //?LastName
        if(!values.lastName || false ) {
            errors.lastName = 'Must enter Last Name';
        } else if ( values.lastName.length < 3 || false) {
            errors.lastName = 'no abbreviations please'
        }

        //?JobTitle
        if(!values.jobTitle || false ) {
            errors.jobTitle = 'Must enter Job Title';
        } else if ( values.jobTitle.length < 3 || false) {
            errors.jobTitle = 'must be more than 3 characters'
        }
        
    }
}