/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { FC, useRef } from 'react';
import Header from 'app/modules/__modules__/Header';
import UserVector from 'app/modules/__modules__/_vectors/userVector';
import OTPWidget from 'app/modules/__modules__/OTPWidget';

const VerifyCodeActivity: FC = (): JSX.Element => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]).current;

  return (
    <div className="container mx-auto md:px-8">
      <Header showSearchBar={false} />
      <div className="px-3 md:px-0 my-5 md:my-3 w-full">
        <div className="bg-brand-bold flex justify-center p-6 md:p-8 lg:p-12 md:h-[80vh] rounded-sm">
          <div className="bg-white p-6 md:p-8 lg:p-12 rounded-md flex flex-col md:justify-center items-center shadow-md md:shadow-none h-full">
            <div className="flex items-center space-x-3">
              <UserVector className="w-8 h-8" />
              <h1 className="md:text-xl">Verification du compte</h1>
            </div>

            <div className="my-4 p-3 w-full bg-brand-thin border border-brand-bold rounded-sm">
              <p className="text-center text-xs">
                Vous avez reçu un code de verification au{' '}
                <span className="font-semibold">
                  (+243) 970 874 944
                </span>
              </p>
            </div>

            <div className="my-3 text-center">
              <p>Entrez le code PIN</p>
              <OTPWidget pins={4} inputs={inputRefs} />
            </div>

            <div className="my-3">
              <div className="my-5 text-center">
                <button
                  type="button"
                  className="bg-brand-bold p-3 px-5 rounded-md text-center text-sm"
                >
                  Verifier et terminer
                </button>
              </div>
              <div className="mt-5 text-center">
                <p className="text-sm">
                  Vous n&apos;avez reçu le code?{' '}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-black"
                  >
                    Renvoyez le code
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodeActivity;
