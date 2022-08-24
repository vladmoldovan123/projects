const checkName = (name) =>
{
    const regex =/^[a-zA-Z ]{2,30}$/;
    return name.match(regex);
}

const checkEmail = (email) =>
{
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return email.match(regex);
}

const checkPassword = (password) =>
{
    return password !== '';
}

const checkUsername = (username) =>
{
    return username !== '';
}

const checkAddress = (address) =>
{
    return address !=='';
}

module.exports={
    checkName,
    checkUsername,
    checkPassword,
    checkEmail,
    checkAddress
}