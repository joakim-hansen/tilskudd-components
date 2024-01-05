const BadgeStyles = {
    baseStyle: {
        textTransform: 'none',
        color: 'white',
        textAlign: 'center',
    },
    variants: {
        normal: {
            backgroundColor: 'badge.ok',
        },
        warning: {
            backgroundColor: 'badge.warning',
        },
        neutral: {
            backgroundColor: 'darkgrey',
        },
        rejection: {
            backgroundColor: 'black',
        },
    },
};

export { BadgeStyles };
