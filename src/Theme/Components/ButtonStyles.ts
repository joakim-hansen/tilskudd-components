const ButtonStyles = {
    baseStyle: {
        marginEnd: '12px',
    },
    variants: {
        primary: {
            backgroundColor: 'blue',
            color: 'white',
            _hover: {
                backgroundColor: 'lightblue',
                color: 'blue',
            },
            _disabled: {
                backgroundColor: 'darkgrey',
                color: 'white',
            },
        },
        secondary: {
            backgroundColor: 'white',
            color: 'blue',
            border: '1px solid',
            borderColor: 'blue',
            _hover: {
                backgroundColor: 'lightblue',
                color: 'blue',
            },
            _disabled: {
                backgroundColor: 'darkgrey',
                color: 'white',
            },
        },
        delete: {
            backgroundColor: 'red',
            color: 'white',
            _hover: {
                backgroundColor: 'darkred',
                color: 'white',
            },
            _disabled: {
                backgroundColor: 'darkgrey',
                color: 'white',
            },
        },
        iconButton: {
            color: 'blue',
            _hover: {
                cursor: 'pointer',
                backgroundColor: '#D4E2ED',
            },
            _active: {
                backgroundColor: '#C9D6E0',
            },
            /* icon: {
                margin: '25% 0 0 25%',
            }, */
        },
        iconAndTextButton: {
            color: 'blue',
            fontWeight: 'normal',
        },
        link: {
            color: 'blue',
            textDecoration: 'underline',
            _hover: {
                cursor: 'pointer',
            },
        },
    },
};

export { ButtonStyles };
