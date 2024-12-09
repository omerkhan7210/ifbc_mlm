export const checkRole = (role) => {
    if (role === 'N') {
        return { bgcolor: 'rgb(247, 152, 36)', roleName: 'Member' }
    } else if (role === 'D') {
        return { bgcolor: 'rgb(247, 152, 36)', roleName: 'Admin' }
    } else if (role === 'C') {
        return { bgcolor: 'rgb(247, 152, 36)', roleName: 'Consultant' }
    } else if (role === 'A') {
        return { bgcolor: 'rgb(247, 152, 36)', roleName: 'Ambassador' }
    } else if (role === 'O') {
        return { bgcolor: 'rgb(247, 152, 36)', roleName: 'Company' }
    } else {
        return { bgcolor: 'rgb(247, 152, 36)', roleName: 'Member' }
    }
}
