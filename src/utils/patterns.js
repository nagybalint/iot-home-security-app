
export const checkEmailFormat = (email) => {
    console.log("Checking email");
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return pattern.test(email);
}

export const checkPasswordFormat = (password) => {
    console.log("Checking password");
    if(password.lenght < 6) {
        return false;
    }
    return true;
}
