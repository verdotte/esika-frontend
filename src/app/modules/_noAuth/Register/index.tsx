/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, LegacyRef, memo } from 'react';
import { Link } from 'react-router-dom';
import Header from 'app/modules/__modules__/Header';
import { SUPPORTED_COUNTRIES } from 'app/modules/utils/helpers';
import PhoneInput from 'app/modules/__modules__/PhoneInput';
import { useRegister } from 'app/modules/Contexts/RegisterContext';
import AlertBox from 'app/modules/__modules__/AlertBox';

const RegisterActivity: FC = (): JSX.Element => {
  const {
    formRef,
    countryCode,
    errors,
    isPerforming,
    onPhoneChange,
    onCountryChange,
    onRegister,
  } = useRegister();

  return (
    <div className="container mx-auto md:px-8">
      <Header
        showSearchBar={false}
        action={{ name: 'Connexion', push: '/login' }}
      />

      <div className="px-3 md:px-0 my-5 md:my-3 w-full ">
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap p-6 md:p-8 xl:p-10 bg-brand-bold h-[200px] md:h-[75vh] rounded-sm space-y-4 md:space-y-0">
          <div className="space-y-5 w-full text-white">
            <div className="relative">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold relative z-[1]">
                Creer son compte Agent
              </h1>
            </div>

            <p className="text-sm md:text-md">
              Connectez-vous a votre compte facilement et en toute
              securite.
            </p>

            <div className="flex items-center w-[70%]">
              <div className="h-[0.1rem] w-full bg-white" />
              <p className="hidden md:block m-2">Ou</p>
              <div className="h-[0.1rem] w-full bg-white" />
            </div>
            <p className="hidden md:block">
              <Link
                to="/login"
                className="bg-white p-2 px-4 rounded-sm text-brand-bold hover:text-brand-thin"
              >
                <span>Se connecter</span>
              </Link>
            </p>
          </div>

          <form
            ref={formRef as LegacyRef<HTMLFormElement> | undefined}
            onSubmit={onRegister}
            autoComplete="off"
          >
            <div className="p-8 md:p-12 bg-white rounded-md w-full md:h-[90%] flex flex-col justify-between space-y-5 md:space-y-3 shadow-md md:shadow-none">
              <AlertBox
                show={!!errors.message}
                message={errors.message}
                type={errors.type}
              />

              <div className="flex flex-wrap md:flex-nowrap w-full md:space-x-4">
                <div className="form-group w-full">
                  <div className="border rounded-md flex items-center space-x-3 p-4 overflow-hidden w-full">
                    <div className="w-full relative">
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Prénom"
                        name="firstName"
                        className="peer outline-none text-sm placeholder-transparent bg-transparent"
                      />
                      <label
                        htmlFor="firstName"
                        className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0"
                      >
                        Prénom
                      </label>
                    </div>
                  </div>

                  <p className="text-red-500 text-xs md:text-sm mt-2">
                    {errors.firstName}
                  </p>
                </div>
                <div className="form-group mt-5 md:mt-0 w-full">
                  <div className="border rounded-md flex items-center space-x-3 p-4 overflow-hidden w-full">
                    <div className="w-full relative">
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        placeholder="Nom de famille"
                        className="peer outline-none text-sm placeholder-transparent bg-transparent"
                      />
                      <label
                        htmlFor="lastName"
                        className="absolute left-0 -top-3.5 text-gray-400 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-0"
                      >
                        Nom de famille
                      </label>
                    </div>
                  </div>

                  <p className="text-red-500 text-xs md:text-sm mt-2">
                    {errors.lastName}
                  </p>
                </div>
              </div>

              <div className="form-group">
                <div className="border rounded-md overflow-hidden">
                  <div className="p-4 border-b">
                    <select
                      name="country"
                      id="country"
                      value={countryCode}
                      className="w-full outline-none"
                      onChange={onCountryChange}
                      onBlur={() => null}
                    >
                      <option value="DEFAULT" disabled>
                        Pays
                      </option>
                      {Object.keys(SUPPORTED_COUNTRIES).map(
                        (country) => (
                          <option
                            key={`country_${country}`}
                            value={
                              SUPPORTED_COUNTRIES[country].shortName
                            }
                          >
                            {SUPPORTED_COUNTRIES[country].countryName}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div className="p-4 py-2">
                    <PhoneInput
                      country={countryCode}
                      onChange={onPhoneChange}
                      placeholder="Phone number"
                      buttonClass="hidden"
                      inputProps={{ name: 'phoneNumber' }}
                      inputStyle={{
                        border: 0,
                        width: '100%',
                        paddingLeft: 0,
                        fontSize: '1rem',
                        lineHeight: '1.25rem',
                      }}
                      inputClass="bg-transparent"
                    />
                  </div>
                </div>
                <p className="text-red-500 text-xs md:text-sm mt-2">
                  {errors.phoneNumber}
                </p>
              </div>

              <label
                htmlFor="terms"
                className="flex items-center space-x-2 my-4"
              >
                <input
                  id="terms"
                  type="checkbox"
                  defaultChecked
                  className="form-tick appearance-none h-8 md:h-6 w-[50px] md:w-6 border border-gray-300 rounded-md checked:bg-green-600 checked:border-transparent focus:outline-none"
                />
                <p className="text-sm">
                  En continuant, vous acceptez nos{' '}
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:text-blue-400"
                  >
                    Terms and conditions
                  </Link>
                </p>
              </label>

              <button
                className="button p-3 bg-brand-bold text-white text-center rounded-md disabled:bg-gray-200 disabled:text-gray-700"
                type="submit"
                disabled={isPerforming}
              >
                S&apos;inscrire
              </button>
              <Link
                to="/signup"
                className="text-sm text-center hover:text-white md:hidden"
              >
                <span>Se connecter</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(RegisterActivity);
