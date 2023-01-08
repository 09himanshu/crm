
const userTypes = {
    admin: 'admin'.toUpperCase(),
    customer: 'customer'.toUpperCase(),
    engineer: 'engineer'.toUpperCase(),
}

const userStatus = {
    admin: 'rejected'.toUpperCase(),
    engineer: 'pending'.toUpperCase(),
    customer: 'approved'.toUpperCase(),
}

const ticketStatus = {
    open: 'open'.toUpperCase(),
    closed: 'closed'.toUpperCase(),
    blocked: 'blocked'.toUpperCase(),
}
module.exports = {userTypes, userStatus,ticketStatus}