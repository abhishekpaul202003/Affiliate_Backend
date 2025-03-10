exports.ValidaName = (name) => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    return nameRegex.test(name)
}

exports.ValidaEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-].+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}

exports.ValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password)
}