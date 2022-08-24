const checkDescription = (description) =>
{
    return description !== '';
}

const checkAddress = (address) =>
{
    return address !== '';
}

const checkValue = (value) =>
{
    const regex = /^[+-]?([0-9]*[.])?[0-9]+$/;
    return value.match(regex);
}

module.exports = {
    checkValue,
    checkDescription,
    checkAddress
}