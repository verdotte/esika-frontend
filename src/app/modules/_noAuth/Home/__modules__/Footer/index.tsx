import React from 'react';
import PhoneVector from 'app/modules/__modules__/_vectors/phoneVector';
import InboxVector from 'app/modules/__modules__/_vectors/inboxVector';

const Footer = () => {
  return (
    <div className="mb-16 my-8 md:mb-8 px-4 py-7 md:p-8 lg:p-12 xl:px-16 bg-brand-bold">
      <div className="w-full flex flex-wrap md:flex-nowrap justify-between items-center my-4 mb-8">
        <div className="flex flex-col w-full border-b md:border-b-0 md:border-r-2 md:border-white pb-4 md:pb-0">
          <p className="text-xl md:text-2xl text-white font-semibold">
            Support
          </p>

          <div className="flex items-center flex-wrap mt-3 md:mt-0 text-xs md:text-sm">
            <div className="flex items-center space-x-2 text-white mr-3 my-1">
              <PhoneVector />
              <p>(+243) 976 890 483</p>
            </div>
            <div className="flex items-center space-x-2 my-1 text-white">
              <InboxVector className="h-6 w-6" />
              <p>support@esika.com</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full mt-4 md:mt-0 text-xs md:text-sm">
          <button
            type="button"
            className="p-3 px-12 bg-white text-black flex items-center space-x-3 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Creer un compte agent</p>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 w-full rounded-md flex justify-around flex-wrap">
        <p className="text-xs md:text-sm my-1">FAQ</p>
        <p className="text-xs md:text-sm my-1">A propos de nous</p>
        <p className="text-xs md:text-sm my-1">
          Termes et conditions
        </p>
        <p className="text-xs md:text-sm my-1">
          Politique de confidentialite
        </p>
      </div>
      <div className="my-3 text-center text-white text-xs">
        <p>
          Droit d&apos;auteur 2021 | Esika. Tous drois reserves. Notre
          marque est enregistree sous: 9798754/473245 Sous DR. Droit
          de conversion du Congo.
        </p>
      </div>
    </div>
  );
};

export default Footer;
