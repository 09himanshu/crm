
const userTypes = {
    admin: 'admin'.toUpperCase(),
    customer: 'customer'.toUpperCase(),
    engineer: 'engineer'.toUpperCase(),
}

const userStatus = {
    admin: 'approved'.toUpperCase(),
    engineer: 'pending'.toUpperCase(),
    customer: 'approved'.toUpperCase(),
}

module.exports = {userTypes, userStatus}