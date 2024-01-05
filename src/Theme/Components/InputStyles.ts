const InputStyles = {
    variants: {
        outline: {
            field: {
                borderColor: 'darkgrey',
                textColor: 'darkgrey',
                _placeholder: {
                    textColor: 'lightgrey',
                },
                _invalid: {
                    borderWidth: '2px',
                    borderColor: 'red',
                    boxShadow: 'none',
                },
                _focus: {
                    boxShadow: 'none',
                    _invalid: {
                        borderColor: 'red',
                    },
                },
            },
        },
    },
};

export { InputStyles };
