import React, { useCallback, useState,useEffect, useMemo } from 'react';
import { useHome } from 'app/modules/Contexts/HomeContext';
import Paginate from 'app/modules/utils/helpers/paginator';
import Header from 'app/modules/__modules__/Header';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import Footer from 'app/modules/_noAuth/Home/__modules__/Footer';
import { PropertyCard } from 'app/modules/__modules__/_Cards/PropertyCard';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import { HeroCarouselIndicator } from 'app/modules/_noAuth/Home/__modules__/HeroCarousel/Indicator';
import { VerifiedIcon } from 'app/modules/__modules__/_vectors/verifiedICon';
import { HeartVector } from 'app/modules/__modules__/_vectors/heartVector';
import ContactButton from 'app/modules/__modules__/ContactButton';
import ApartmentVector from 'app/modules/__modules__/_vectors/apartmentVector';
import EyeVector from 'app/modules/__modules__/_vectors/eyeVector';
import HotelVector from 'app/modules/__modules__/_vectors/hotelVector';
import HouseVector from 'app/modules/__modules__/_vectors/houseVector';
import { useParams } from 'react-router';
import { IObject } from 'app/modules/@Types';

const Property = () => {

    const [property, setProperty] = useState({});

    const { slug } = useParams<{slug?: string}>();

    const {
        onFetchProperties,
        onFetchAgents,
        properties,
        loading,
        paginationIndicators,
        onIndicatorChange,
    } = useHome();

    useEffect(() => {
        if (!properties.length) {
            onFetchProperties();
            onFetchAgents();
        }
        return () => {
            onFetchProperties();
            onFetchAgents();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onFetchProperties]);

    const { propertiesIndicator: indicator } = paginationIndicators;
    const chunks = useMemo(() => Paginate(properties, 6), [properties]);

    const onIndicatorClick = useCallback(
        (position: number) => {
            onIndicatorChange(position, 'propertiesIndicator');
        },
        [onIndicatorChange],
    );

    const renderProperties = useCallback(() => {
        if (loading) {
            return Array.from({ length: 6 }).map((_, index) => (
                <PropertyCard key={index} preload={loading} />
            ));
        }
        return (
            chunks[indicator] &&
            chunks[indicator].map((property, index) => (
                <PropertyCard
                    data={property}
                    key={`property_${property.property_id}_${index}`}
                />
            ))
        );
    }, [chunks, loading, indicator]);

    useEffect(() => {

        const fetchProperty = async () => {

            
        };
        fetchProperty();

    }, [slug]);

    console.log("slug ==>", slug)
    console.log("properties ==>", properties)


    return (
        <div className="container mx-auto px-0 md:px-8 no-scrollbars">
            <Header className="fixed md:sticky z-20 md:z-10 top-0" />

            <div className="h-full mt-20 md:mt-4 my-4 bg-brand-thin" >
                <div className="flex justify-between">

                    <div className="w-[65%] flex items-center p-14">
                        <ShowWidget
                            condition={true}
                            fallback={<div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />}
                        >
                            <div className="relative">
                                <img
                                    src="https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                    alt="User avatar"
                                    className="w-14 h-14 rounded-full object-cover"
                                // onError={onImageError}
                                />
                                <VerifiedIcon />
                            </div>
                        </ShowWidget>
                        <div className="ml-6 flex-1">
                            <ShowWidget
                                condition={true}
                                fallback={
                                    <div className="h-4 bg-gray-200 animate-pulse" />
                                }
                            >
                                <div className="">
                                    <p className="line-clamp-1 text-xl">Maison de passage à bon prix</p>
                                </div>
                            </ShowWidget>

                            <div className="w-[100%] flex">

                                <ShowWidget
                                    condition={true}
                                    fallback={
                                        <div className="h-4 w-full mt-2 bg-gray-200 animate-pulse" />
                                    }
                                >
                                    <div className="mt-2 flex justify-between items-center">
                                        <p className="text-sm text-gray-600">
                                            Il y a 08 heures
                                        </p>
                                        <p className="text-sm text-gray-600 pl-5">
                                            Durba, Avenue du 24, en face de la Bralima
                                        </p>
                                    </div>
                                </ShowWidget>
                            </div>
                        </div>
                    </div>

                    <div className="w-[35%] items-center " >

                        <ShowWidget
                            condition={true}
                            fallback={
                                <div className="items-center pl-5 pt-10 pb-10 ">
                                    <div className="h-8 w-full items-center p-4 pl-5 pt-10 pb-10 bg-gray-200 animate-pulse" />
                                </div>
                            }
                        >
                            <div className="w-full flex items-center pl-5 pt-10 pb-10">
                                <div className="bg-yellow-400/60 p-4">
                                    <p className="line-clamp-1 text-xl">
                                        200 000 FC Par mois
                                    </p>
                                </div>

                                <div className="p-5">
                                    <ShowWidget
                                        condition={true}
                                        fallback={
                                            <div className="h-5 w-40 bg-gray-200 animate-pulse" />
                                        }
                                    >
                                        <button
                                            type="button"
                                            className="bg-red-500 flex-1 p-3 rounded-lg"
                                        >
                                            <HeartVector className="text-white h-10 w-10" />
                                        </button>
                                    </ShowWidget>
                                </div>
                            </div>
                        </ShowWidget>

                    </div>

                </div>
                <div className="flex justify-between">
                    <div className="w-[65%] relative">
                        <ShowWidget
                            condition={true}
                            fallback={
                                <div className="h-full w-full bg-gray-200 animate-pulse" />
                            }
                        >
                            <img
                                src="https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                alt="House on hood"
                                className="w-full h-full object-cover"
                            // onError={onImageError}
                            />
                        </ShowWidget>
                        <button
                            type="button"
                            className="bg-brand-bold border border-white text-sm rounded-lg p-2 px-5 absolute bottom-[5%] left-[3%] hidden md:block"
                        >
                            Naviguer
                        </button>
                    </div>
                    <div className="w-[35%] h-full pl-5 relative" >
                        <ShowWidget
                            condition={true}
                            fallback={
                                <div className="h-[15rem] w-full mb-2 bg-gray-200 animate-pulse" />
                            }
                        >
                            <img
                                src="https://images.pexels.com/photos/8134746/pexels-photo-8134746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                alt="House on hood"
                                className="w-full h-full object-cover"
                            // onError={onImageError}
                            />
                        </ShowWidget>
                        <ShowWidget
                            condition={true}
                            fallback={
                                <div className="h-[15rem] w-full bg-gray-200 animate-pulse" />
                            }
                        >
                            <img
                                src="https://images.pexels.com/photos/8134745/pexels-photo-8134745.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                alt="House on hood"
                                className="w-full h-full pt-3 object-cover"
                            // onError={onImageError}
                            />
                        </ShowWidget>
                        <button
                            type="button"
                            className="bg-brand-bold border border-white text-sm rounded-lg p-2 px-5 absolute bottom-[5%] right-[3%] hidden md:block"
                        >
                            + Plus d'images
                        </button>
                    </div>


                </div>
                <div className="flex justify-between">
                    <div className="flex">

                        <div className="w-[65%]  pt-10 pl-10 pb-10">
                            <div className=" block border bg-white p-8 ">
                                <ShowWidget
                                    condition={true}
                                    fallback={
                                        <div className="h-4 w-full pt-2 pl-5 bg-gray-200 animate-pulse" />
                                    }
                                >
                                    <p className="text-sm text-gray-600 pt-2 pl-5">
                                        La place de la Charlie a une vue magnifique sur la rivière et la baignoire est un bon bonus! Moustiquaires pour portes
                                    </p>
                                </ShowWidget>

                                <div className="flex pt-8">
                                    <div className="flex my-2 px-4">
                                        <ShowWidget
                                            condition={true}
                                            fallback={
                                                <div className="h-8 w-16 rounded-full mr-3 bg-gray-200 animate-pulse" />
                                            }
                                        >
                                            <div className="p-2 px-3 rounded-full bg-brand-bold text-gray-700 mr-3">
                                                <p className="text-xs">
                                                    4 chambres
                                                </p>
                                            </div>
                                        </ShowWidget>
                                        <ShowWidget
                                            condition={true}
                                            fallback={
                                                <div className="h-8 w-16 rounded-full mr-3 bg-gray-200 animate-pulse" />
                                            }
                                        >
                                            <div className="p-2 px-3 rounded-full bg-brand-bold text-gray-700 mr-3">
                                                <p className="text-xs">
                                                    Douche
                                                </p>
                                            </div>
                                        </ShowWidget>
                                        <ShowWidget
                                            condition={true}
                                            fallback={
                                                <div className="h-8 w-16 rounded-full mr-3 bg-gray-200 animate-pulse" />
                                            }
                                        >
                                            <div className="p-2 px-3 rounded-full bg-brand-bold text-gray-700 mr-3">
                                                <p className="text-xs">
                                                    Balcon à vitre
                                                </p>
                                            </div>
                                        </ShowWidget>
                                        <ShowWidget
                                            condition={true}
                                            fallback={
                                                <div className="h-8 w-16 rounded-full mr-3 bg-gray-200 animate-pulse" />
                                            }
                                        >
                                            <div className="p-2 px-3 rounded-full bg-brand-bold text-gray-700 mr-3">
                                                <p className="text-xs">
                                                    Paking
                                                </p>
                                            </div>
                                        </ShowWidget>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[35%] pl-5 pt-10 pb-10 pr-5">
                            <div className="w-full flex border bg-white rounded-lg space-x-2 overflow-hidden">
                                <ShowWidget
                                    condition={true}
                                    fallback={
                                        <div className="h-full w-32 flex-initial  bg-gray-200 animate-pulse" />
                                    }
                                >
                                    <img
                                        src="https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                        alt="agent name will be replaced here"
                                        className="h-full w-32 object-cover flex-initial"
                                    // onError={onImageError}
                                    />
                                </ShowWidget>

                                <div className="w-full flex-initial flex flex-col justify-between p-4 pl-1 md:pl-3">
                                    <div className="flex items-center space-x-2">
                                        <ShowWidget condition={true}>
                                            <VerifiedIcon className="text-blue-500 text-xl h-6 w-6" />
                                        </ShowWidget>

                                        <ShowWidget
                                            condition={true}
                                            fallback={
                                                <div className="w-full h-4 bg-gray-200 animate-pulse" />
                                            }
                                        >
                                            <p className="text-md font-semibold">
                                                Alf Doe
                                            </p>
                                        </ShowWidget>
                                    </div>

                                    <ShowWidget
                                        condition={true}
                                        fallback={
                                            <div className="w-full h-7 mt-3 bg-gray-200 animate-pulse" />
                                        }
                                    >
                                        <p className="text-xs text-gray-600">
                                            Trouver toutes les maisons aux alentours de Durba à bon prix... Contactez moi ou visiter mes articles
                                        </p>
                                    </ShowWidget>


                                    <div className="flex items-center space-x-3 my-3">
                                        <div className="flex items-center">
                                            <HouseVector className="h-3 w-3" />
                                            <p className="text-xs ml-1">{3}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <HotelVector className="h-3 w-3" />
                                            <p className="text-xs ml-1">{4}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <ApartmentVector className="h-3 w-3" />
                                            <p className="text-xs ml-1">{2}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-3">
                                        <ShowWidget
                                            condition={true}
                                            fallback={
                                                <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
                                            }
                                        >
                                            <ContactButton
                                                className="bg-green-600 text-white flex items-center justify-center space-x-1 lg:space-x-2 w-full pt-2 pb-2 pl-6 pr-6 rounded-lg text-xs"
                                                vectorStyle="text-ehite h-4 w-4"
                                            />
                                        </ShowWidget>

                                        <ShowWidget
                                            condition={true}
                                            fallback={
                                                <div className="h-8 w-full bg-gray-200 rounded-md animate-pulse" />
                                            }
                                        >
                                            <button
                                                type="button"
                                                className="bg-brand-bold flex items-center justify-center space-x-1 lg:space-x-2 w-full p-3 rounded-lg text-xs"
                                            >
                                                <EyeVector className="h-4 w-4" />
                                                <p>Plus</p>
                                            </button>
                                        </ShowWidget>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="font-extrabold text-5xl my-8 pt-20">Voir aussi...</p>

            <div className="w-full my-20 min-h-[500px]">
                <div className="w-full flex flex-col sm:grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 gap-5 lg:gap-12 my-8">
                    {renderProperties()}
                </div>
                <ShowWidget condition={chunks.length > 1}>
                    <div className="w-full flex justify-end">
                        {chunks.map((_, index) => (
                            <HeroCarouselIndicator
                                key={index}
                                current={indicator === index}
                                position={index}
                                defaultStyle="w-4"
                                currentStyle="w-10 bg-brand-bold"
                                className="h-4 border border-brand-bold rounded-full mr-3"
                                onClick={onIndicatorClick}
                            />
                        ))}
                    </div>
                </ShowWidget>
            </div>


            <Footer />
            <BottomNavbar />
        </div>
    );
};

export default Property;