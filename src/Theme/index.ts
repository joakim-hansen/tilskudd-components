import { extendTheme } from '@chakra-ui/react';

import { colors } from './Theme';

import {
    TextStyles as Text,
    HeadingStyles as Heading,
    ButtonStyles as Button,
    Card,
    TabStyles as Tabs,
    BreadcrumbStyles as Breadcrumb,
    CheckboxStyles as Checkbox,
    RadioStyles as Radio,
    StepsStyles as Steps,
    DatePickerStyles as DatePicker,
    InputStyles as Input,
    TextareaStyles as Textarea,
    SwitchStyles as Switch,
    BadgeStyles as Badge,
    ContentContainerStyles as ContentContainer,
    ProgressStyles as Progress,
    Link,
    Select,
    MultiSelect,
    Form,
    Alert,
    Icon,
    TBody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
    THrow,
    TFrow,
    Accordion,
    ComposedSpinner,
    OverlaySpinner,
    Spinner,
} from './Components';

const overrides = {
    colors,
    components: {
        Text,
        Heading,
        Button,
        Card,
        Tabs,
        Breadcrumb,
        Checkbox,
        Radio,
        Steps,
        DatePicker,
        Input,
        Textarea,
        Switch,
        Badge,
        ContentContainer,
        Progress,
        Link,
        Select,
        MultiSelect,
        Form,
        Alert,
        Icon,
        TBody,
        Td,
        Tfoot,
        Th,
        Thead,
        Tr,
        THrow,
        TFrow,
        Accordion,
        ComposedSpinner,
        OverlaySpinner,
        Spinner,
    },
};

const styles = extendTheme(overrides);

export { styles };
