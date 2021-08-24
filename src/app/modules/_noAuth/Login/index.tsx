/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, LegacyRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { SUPPORTED_COUNTRIES } from 'app/modules/utils/helpers';
import Header from 'app/modules/__modules__/Header';
import PhoneInput from 'app/modules/__modules__/PhoneInput';
import PhoneVector from 'app/modules/__modules__/_vectors/phoneVector';
import { useLogin } from 'app/modules/Contexts/LoginContext';
import AlertBox from 'app/modules/__modules__/AlertBox';

const LoginActivity: FC = (): JSX.Element => {
  const {
    formRef,
    countryCode,
    errors,
    isPerforming,
    onPhoneChange,
    onCountryChange,
    onLogin,
  } = useLogin();

  return (
    <div className="container mx-auto md:px-8">
      <Header showSearchBar={false} />

      <div className="px-3 md:px-0 my-5 md:my-3 w-full ">
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap p-6 md:p-8 xl:p-10 bg-brand-bold h-[200px] md:h-[75vh] rounded-sm space-y-4 md:space-y-0">
          <div className="space-y-5 w-full text-white">
            <div className="relative">
              <h1 className="text-2xl lg:text-3xl font-extrabold relative z-[1]">
                Se connecter
              </h1>
            </div>

            <p className="text-sm">
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
                to="/register"
                className="bg-white p-2 px-4 rounded-sm text-brand-bold hover:text-brand-thin"
              >
                <span>Creer un compte</span>
              </Link>
            </p>
          </div>

          <form
            ref={formRef as LegacyRef<HTMLFormElement> | undefined}
            onSubmit={onLogin}
            autoComplete="off"
          >
            <div className="p-8 md:p-12 bg-white rounded-md w-full md:h-4/5 flex flex-col justify-between space-y-7 md:space-y-3 shadow-md md:shadow-none">
              <AlertBox
                show={!!errors.message}
                message={errors.message}
                type={errors.type}
              />
              <div className="border rounded-md overflow-hidden">
                <div className="p-4 border-b">
                  <select
                    name="country"
                    id="country"
                    value={countryCode}
                    onChange={onCountryChange}
                    onBlur={() => null}
                    className="w-full outline-none"
                  >
                    <option value="DEFAULT" disabled>
                      Pays/Code
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
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <PhoneVector />

                    <PhoneInput
                      country={countryCode}
                      onChange={onPhoneChange}
                      placeholder="Phone number"
                      buttonClass="hidden"
                      inputProps={{ name: 'phoneNumber' }}
                      inputStyle={{
                        border: 0,
                        paddingLeft: 0,
                        fontSize: '1rem',
                        lineHeight: '1.25rem',
                      }}
                      inputClass="bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <p className="text-red-500 text-xs md:text-sm mt-2">
                {errors.phoneNumber}
              </p>
              <button
                className="button p-3 bg-brand-bold text-white text-center rounded-md disabled:bg-gray-300 disabled:text-gray-700"
                type="submit"
                disabled={isPerforming}
              >
                Se connecter
              </button>
              <Link
                to="/signup"
                className="text-sm text-center hover:text-white md:hidden"
              >
                <span>Creer un compte</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginActivity);
