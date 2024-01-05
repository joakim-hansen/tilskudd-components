const TextareaStyles = {
    variants: {
        outline: {
            borderColor: 'darkgrey',
            textColor: 'darkgrey',
            _placeholder: {
                textColor: 'lightgrey',
            },
            _focus: {
                borderColor: 'darkgrey',
                _invalid: {
                    borderColor: 'red',
                },
            },
            _invalid: {
                borderColor: 'red',
            },
        },
    },
};

export { TextareaStyles };
