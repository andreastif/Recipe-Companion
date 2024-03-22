export const modalBoxStyle = (isMobile: boolean) => {
    return {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '90%' : '40%',
        bgcolor: '#2b3035',
        border: '1px solid #FFF',
        borderRadius: '5px',
        boxShadow: 24,
        p: 4,
    }
};

export const inspoContainer = (isMobile: boolean) => {
    return {
        width: isMobile ? "100%" : "95%",
        height: "90%",
        paddingTop: isMobile ? "5px" : "40px",
        paddingBottom: isMobile ? "0px" : "20px"
    }
};


