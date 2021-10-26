import React, {
    createContext,
    FC,
    useCallback,
    useContext,
    useRef,
    useState,
} from 'react';
import { alertType, IObject } from 'app/modules/@Types';
import {
    formDataToObject,
} from 'app/modules/utils/helpers';
import Service from 'app/Services';
import ENDPOINTS from 'app/Services/endpoints';
import browserHistory from 'app/modules/utils/helpers/browserHistory';
import LocalStorage from 'app/modules/utils/helpers/LocalStorage';

type stateObject = Record<string, string>;

type propertyCtxType = {
    formRef: HTMLFormElement | null;
    errors: {
        title?: string;
        description?: string | null;
        price?: string | null;
        location?: string | null;
        category?: string | null;
        city?: string | null;
        unit?: string | null;
        squareFeet?: string | null;
        image?: string | null;
        currency?: string | null;
        type?: alertType;
    };
    isPerforming: boolean;
    onClearMessage?: () => void;
    onAddProperty?: (event: React.SyntheticEvent) => void;
    onResendCode?: () => void;
    onVerifyCode?: () => void;
};

const ctxDefaultState: propertyCtxType = {
    formRef: null,
    errors: {
        title: '',
        description: '',
        price: '',
        location: '',
        category: '',
        city: '',
        unit: '',
        squareFeet: '',
        image: '',
        currency: '',
        type: 'error',
    },
    isPerforming: false,
};

export const AddPropertyContext = createContext<
    propertyCtxType & IObject
>(ctxDefaultState);
export const useAddPropperty = () => useContext(AddPropertyContext);

const AddPropertyProvider: FC = ({ children }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<stateObject>({
        title: '',
        description: '',
        price: '',
        location: '',
        category: '',
        city: '',
        unit: '',
        squareFeet: '',
        image: '',
        currency: '',
        type: 'error',
    });

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number>();
    

    const [category, setCategory] = useState<string>('DEFAULT');
    const [city, setCity] = useState<string>('DEFAULT');
    const [unit, setUnit] = useState<string>('DEFAULT');
    const [currency, setCurrency] = useState<string>('DEFAULT');
    const [type, setType] = useState<string>('DEFAULT');

    const [isPerforming, setIsPerforming] = useState<boolean>(false);

    const onTitleChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const target = event.currentTarget;

        const { value } = target;
        
        setTitle(() => value);
    };

    const onDescriptionChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const target = event.currentTarget;

        const { value } = target;
        
        setDescription(() => value);
    };

    const onCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const target = event.currentTarget;

        const { value } = target;

        console.log('category', value);
        
        setCategory(() => value);
    };

    const onUnitChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const target = event.currentTarget;

        const { value } = target;

        setUnit(() => value);        
    };

    const onPriceChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const target = event.currentTarget;

        const { value } = target;

        setPrice(() => +value);
    };

    const onCityChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const target = event.currentTarget;

        const { value } = target;

        setCity(() => value);
    };

    const onCurrencyChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const target = event.currentTarget;

        const { value } = target;

        setCurrency(() => value);
    };

    const onTypeChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const target = event.currentTarget;

        const { value } = target;

        setType(() => value);
    };

    const onAddDetailsProperty = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        setErrors({});

        console.log('onAddProperty clicked !!!');

        console.log('title :', title);
        console.log('description :', description);
        console.log('category :', category);
        console.log('price :', price);
        console.log('unit :', unit);
        console.log('currency :', currency);

        let valid = true;

        const formErrors = { ...errors };

        if (!title) {
            formErrors.title = 'Veuillez entrer le titre de votre immobilier';
            valid = false;
        }

        if (!description) {
            formErrors.description = 'Veuillez entrer la description de votre immobilier';
            valid = false;
        }
        

        if (!price) {
            formErrors.price = 'Veuillez entrer le prix de votre immobilier';
            valid = false;
        }

        // if (!location) {
        //     formErrors.location = 'Veuillez entrer l adresse de votre immobilier';
        //     valid = false;
        // }

        // if (!image) {
        //     formErrors.lastName = 'Veuillez entrer les images de votre immobilier';
        //     valid = false;
        // }

        if (!category || category === 'DEFAULT') {
            formErrors.category = 'Veuillez sélectionner la catégorie de votre immobilier';
            valid = false;
        }

        if (!type || type === 'DEFAULT') {
            formErrors.category = 'Veuillez sélectionner le type de votre immobilier';
            valid = false;
        }

        // if (!city || city === 'DEFAULT') {
        //     formErrors.phoneNumber = 'Veuillez sélectionner la région de votre immobilier';
        //     valid = false;
        // }

        if (!unit || unit === 'DEFAULT') {
            formErrors.unit = 'Veuillez sélectionner la durée';
            valid = false;
        }

        if (!currency || currency === 'DEFAULT') {
            formErrors.currency = 'Veuillez sélectionner la devise';
            valid = false;
        }

        if (!valid) {
            setErrors(formErrors);
        }
       
        if (valid) {
            console.log('Here we move !!!!');
            
            LocalStorage.set('title', title);
            LocalStorage.set('description', description);
            LocalStorage.set('type', type);
            LocalStorage.set('price', price);
            LocalStorage.set('category', category);
            LocalStorage.set('unit', unit);
            LocalStorage.set('currency', currency);
        }




    };

    const onClearMessage = useCallback(() => {
        setErrors((prev) => ({ ...prev, message: '' }));
    }, []);

    return (
        <AddPropertyContext.Provider
            value={{
                formRef: formRef as unknown as HTMLFormElement,
                errors,
                category,
                city,
                unit,
                currency,
                isPerforming,
                onClearMessage,
                onTitleChange,
                onDescriptionChange,
                onCategoryChange,
                onUnitChange,
                onPriceChange,
                onCityChange,
                onCurrencyChange,
                onTypeChange,
                onAddDetailsProperty
            }}
        >
            {children}
        </AddPropertyContext.Provider>
    );
};

export default AddPropertyProvider;
