const Alert = {
    baseStyle: {
        container: { borderRadius: '6px', backgroundColor: 'lightblue' },
        title: { color: 'darkgrey' },
        description: { color: 'darkgrey' },
        icon: { position: 'absolute', left: '12px', top: '12px' },
        spinner: {},
        width: '400px',
    },
    variants: {
        warning: {
            container: { backgroundColor: 'yellow' },
            icon: { color: 'amber' },
        },
        info: {
            container: { backgroundColor: 'lightblue' },
            icon: { color: 'blue' },
        },
        error: {
            container: { backgroundColor: 'lightred' },
            icon: { color: 'red' },
        },
        success: {
            container: { backgroundColor: 'lightgreen' },
            icon: { color: 'green' },
        },
    },
};

export { Alert };
