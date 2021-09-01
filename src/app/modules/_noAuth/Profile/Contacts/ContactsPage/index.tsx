// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-static-element-interactions */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/click-events-have-key-events */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-onchange */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import BottomNavbar from 'app/modules/__modules__/BottomNavbar';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import ChevronLeftVector from 'app/modules/__modules__/_vectors/chevronLetfVector';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';
import CountrySelectorInput from 'app/modules/__modules__/CountrySelectorInput';
import TwitterVector from 'app/modules/__modules__/_vectors/twitterVector';
import InstagramVector from 'app/modules/__modules__/_vectors/instagramVector';
import FacebookVector from 'app/modules/__modules__/_vectors/facebookVector';
import SocialMedia from '../SocialMedia';

const ContactsPage = () => {
  const {
    code,
    currentUserNumber,
    currentUser,
    onFetchCurrentUser,
    onCodeChange,
  } = useProfile();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser.userId) {
      onFetchCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFetchCurrentUser]);

  return (
    <div>
      <div className="container mx-auto px-0 md:px-8 no-scrollbars">
        <div className="h-full mt-3 mb-24 md:mt-2 mx-7 sm:mx-0">
          <div className="pb-4 flex justify-between items-center">
            <div className="flex justify-start items-center ml-[-1.3rem]">
              <span
                onClick={() => {
                  return history.push('/profile');
                }}
              >
                <ChevronLeftVector className="h-7 w-7 text-gray-500" />
              </span>
              <p className="pl-2 text-[1.1rem] sm:text-xl">
                Contacts
              </p>
            </div>
            <p className="text-sm sm:text-xl text-blue-700">
              Enregister
            </p>
          </div>
          <div className="pt-4 pb-8 border-b border-gray-300">
            <p className="text-sm sm:text-xl text-gray-700">
              Fournissez des contacts qui aideront les voyageurs et
              les clients à entrer facilement en contact avec vous
            </p>
            <div className="py-5">
              <p className="py-2 text-sm sm:text-xl font-medium">
                Numero de Telephone professionel
              </p>
              <div className="w-full inline-block relative">
                <CountrySelectorInput onChange={onCodeChange} />
                <div className="pointer-events-none absolute inset-y-0 right-[03%] flex items-center px-2 text-gray-700">
                  <ChevroDownVector className="fill-brand-bold h-5 w-5" />
                </div>
              </div>
              <div className="my-4 border border-gray-300 rounded flex justify-between items-center">
                <p className="px-3 border-r border-gray-300 text-sm sm:text-xl text-gray-800">
                  {code}
                </p>
                <input
                  className="appearance-none block w-full rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm sm:text-xl text-gray-900"
                  id="grid-last-name"
                  type="text"
                  defaultValue={currentUserNumber}
                />
              </div>
            </div>
            <div className="pt-3">
              <div className="py-3 text-sm sm:text-xl font-medium">
                <p className="text-sm sm:text-xl font-medium">
                  Adresse e-mail
                </p>
                <input
                  className="w-full mt-3 appearance-none block w-full border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm sm:text-xl text-gray-900"
                  type="text"
                  placeholder="Entrer votre addresse e-mail"
                />
              </div>
            </div>
          </div>
          <div className="pt-6">
            <p className="text-sm sm:text-xl font-medium">
              Médias sociaux
            </p>
            <p className="pt-3 text-[0.85rem] sm:text-xl text-gray-700">
              Fournissez des liens vers les plateformes des médias
              sociaux suivantes pour faciliter la communication avec
              des clients
            </p>

            <SocialMedia
              key="fb"
              icon={<FacebookVector />}
              placeholder="Lien de profile facebook"
            />
            <SocialMedia
              key="twitter"
              icon={<TwitterVector />}
              placeholder="Lien de profile twitter"
            />
            <SocialMedia
              key="ig"
              icon={<InstagramVector />}
              placeholder="Lien de profile instagram"
            />
          </div>
        </div>
        <BottomNavbar />
      </div>
    </div>
  );
};

export default ContactsPage;
