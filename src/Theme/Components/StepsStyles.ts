const StepsStyles = {
    baseStyle: {
        container: {
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'lightgrey',
            border: 'none',
            borderRadius: '50%',
            opacity: 0.7,
            marginRight: 2,
            active: {
                backgroundColor: 'green',
                opacity: 1,
                color: 'white',
            },
        },
        icon: { color: 'white', mt: '35%', ml: '15%' },
        number: {
            color: 'white',
        },
    },
};

export { StepsStyles };
