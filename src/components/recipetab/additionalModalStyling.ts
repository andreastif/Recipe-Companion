
export const modalRecipeStyle = (isMobile: boolean) => {
    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : '50%',
        bgcolor: '#2b3035',
        border: '1px solid #FFF',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', // Enables vertical scrolling
        maxHeight: '90vh', // Prevents the modal from being taller than the viewport
    };
}

export const modalRecipeRemoveStyle = (isMobile: boolean) => {
    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : '15%',
        bgcolor: '#2b3035',
        border: '1px solid #FFF',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto', // Enables vertical scrolling
        maxHeight: '90vh', // Prevents the modal from being taller than the viewport
    }
}
