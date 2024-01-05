const DatePickerStyles = {
    baseStyle: {
        backgroundColor: 'white',
        borderColor: 'darkgrey',
        borderRadius: '5px',
        borderWidth: '1px',
        inputContainer: {
            backgroundColor: 'white',
            borderColor: 'darkgrey',
            borderRadius: '5px',
            borderWidth: '1px',
            padding: '0 0 0 3px',
            _disabled: {
                color: 'lightgray',
                borderColor: 'lightgray',
            },
        },
        day: {
            color: 'darkgrey',
        },
        dayToday: {
            backgroundColor: 'lightblue',
            fontWeight: 'bold',
        },
        daySelected: {
            backgroundColor: 'blue',
            color: 'white',
        },
        dayKeyboardSelected: {
            backgroundColor: 'white',
        },
        dayDisabled: {
            color: '#A4A4A4',
        },
        dayName: {
            color: 'white',
        },
        header: {
            backgroundColor: 'blue',
        },
        navIcon: {
            marginTop: '12px',
            backgroundColor: 'white',
        },
        currentMonth: {
            color: 'white',
        },
    },
};

export { DatePickerStyles };
