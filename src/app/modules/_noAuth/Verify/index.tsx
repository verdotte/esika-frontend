/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import Header from 'app/modules/__modules__/Header';
import UserVector from 'app/modules/__modules__/_vectors/userVector';
import OTPWidget from 'app/modules/__modules__/OTPWidget';
import { useRegister } from 'app/modules/Contexts/RegisterContext';
import LocalStorage from 'app/modules/utils/helpers/LocalStorage';
import keys from 'app/modules/utils/configs/keys';
import { formRefType } from 'app/modules/@Types';
import ShowWidget from 'app/modules/__modules__/ShowWidget';
import AlertBox from 'app/modules/__modules__/AlertBox';

const VerifyCodeActivity: FC = (): JSX.Element => {
  const {
    codeInputRefs,
    isPerforming,
    errors,
    onClearMessage,
    onResendCode,
    onVerifyCode,
  } = useRegister();
  const phoneNumber = LocalStorage.get(
    keys.PHONE_STORAGE_KEY as string,
  );

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

            <ShowWidget condition={!!phoneNumber}>
              <div className="my-4 p-3 w-full text-black border border-brand-bold rounded-lg">
                <p className="text-center text-xs">
                  <span>
                    Vous avez reçu un code de verification au
                  </span>
                  <span className="font-semibold ml-1">
                    {phoneNumber}
                  </span>
                </p>
              </div>
            </ShowWidget>

            <AlertBox
              show={!!errors.message}
              message={errors.message}
              className="w-full"
              type={errors.type}
              onHide={onClearMessage}
            />
            <div className="my-3 text-center">
              <p>Entrez le code PIN</p>
              <OTPWidget
                pins={4}
                inputs={codeInputRefs as formRefType[]}
                disabled={isPerforming}
                onSumitPin={onVerifyCode}
              />
            </div>

            <div className="my-3">
              <div className="mt-3 md:5 my-5 text-center">
                <button
                  type="button"
                  disabled={isPerforming}
                  onClick={onVerifyCode}
                  className="bg-brand-bold text-white p-3 px-5 rounded-md text-center text-sm disabled:bg-gray-200 disabled:text-gray-700"
                >
                  Verifier et terminer
                </button>
              </div>
              <div className="mt-5 text-center">
                <p className="text-sm">
                  Vous n&apos;avez reçu le code?{' '}
                  <button
                    type="button"
                    disabled={isPerforming}
                    onClick={onResendCode}
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
