/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Header from 'app/modules/__modules__/Header';
import PhoneVector from 'app/modules/__modules__/_vectors/phoneVector';

const LoginActivity: FC = (): JSX.Element => {
  return (
    <div className="container mx-auto md:px-8">
      <Header showSearchBar={false} />

      <div className="px-3 md:px-0 my-5 md:my-3 w-full ">
        <div className="flex items-center justify-between flex-wrap md:flex-nowrap p-6 md:p-8 xl:p-10 bg-brand-bold h-[200px] md:h-[75vh] rounded-sm space-y-4 md:space-y-0">
          <div className="space-y-5 w-full">
            <div className="relative">
              <h1 className="text-2xl lg:text-3xl font-extrabold relative z-[1]">
                Se connecter
              </h1>

              <div className="h-4 bg-white absolute bottom-0 inset-x-0" />
            </div>

            <p className="text-sm">
              Connectez-vous a votre compte facilement et en toute
              securite.
            </p>

            <p className="hidden md:block">
              <span className="mr-2">Ou alors</span>
              <Link
                to="/register"
                className="font-bold hover:text-white"
              >
                <span>Creer un compte</span>
              </Link>
            </p>
          </div>

          <div className="p-8 md:p-12 bg-white rounded-md w-full md:h-4/5 flex flex-col justify-between space-y-7 md:space-y-3 shadow-md md:shadow-none">
            <div className="border rounded-md overflow-hidden">
              <div className="p-4 border-b">
                <select
                  name="country"
                  id="country"
                  defaultValue="DEFAULT"
                  className="w-full outline-none"
                >
                  <option value="DEFAULT" disabled>
                    Pays/Code
                  </option>
                </select>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-3">
                  <PhoneVector />

                  <input
                    type="tel"
                    className="outline-none"
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>

            <button
              className="button p-3 bg-brand-bold text-center rounded-md"
              type="button"
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
        </div>
      </div>
    </div>
  );
};

export default LoginActivity;
