// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/no-onchange */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useCallback, memo } from 'react';
import { useProfile } from 'app/modules/Contexts/ProfileContext';
import ChevroDownVector from 'app/modules/__modules__/_vectors/ChevroDownVector';

interface Props {
  label: string;
  data: string;
  action: string;
}

const InfoItem = ({ label, data, action }: Props) => {
  const { setEditMode: setEditMode_ } = useProfile();

  const [editMode, setEditMode] = useState(false);
  const [code, setCode] = useState('+256');

  const onCodeChange = (event) => {
    setCode(event.target.value);
  };

  const onAction = useCallback(() => {
    // eslint-disable-next-line no-console
    setEditMode(true);
    if (setEditMode_) {
      setEditMode_(true);
    }
  }, [setEditMode_]);

  const onCancelAction = useCallback(() => {
    // eslint-disable-next-line no-console
    setEditMode(false);
    if (setEditMode_) {
      setEditMode_(false);
    }
  }, [setEditMode_]);

  return (
    <>
      <div
        className={`mb-5 border-b border-gray-300 ${
          editMode ? 'h-full' : 'h-[80px]'
        } transition-all duration-75`}
      >
        <div className="pt-5 flex justify-between items-center">
          <div className="block">
            <p className="text-sm sm:text-xl">{label}</p>
            <p
              className={`pt-1 text-sm sm:text-xl text-gray-700 transition-all duration-100 ${
                editMode ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {data}
            </p>
          </div>
          {editMode ? (
            <button
              onClick={onCancelAction}
              type="submit"
              className="text-sm sm:text-xl text-blue-700 transition-all duration-100"
            >
              Annuler
            </button>
          ) : (
            <button
              onClick={onAction}
              type="submit"
              className="text-sm sm:text-xl text-blue-700 transition-all duration-100"
            >
              {action}
            </button>
          )}
        </div>
        <div
          className={`mb-3 w-[90%] transition-all duration-100 ${
            editMode ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* <div className="mb-3 p-2 border border-gray-300 rounded">
            <label
              htmlFor={label}
              className="text-gray-600 text-xs transition-all duration-100"
            >
              {label}
            </label>
            <input
              id={label}
              name={label}
              type="text"
              className="peer w-full text-black font-medium focus:outline-none"
              defaultValue={data}
            />
          </div>
          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="py-2 px-3 bg-blue-300 text-white rounded"
            >
              Enregistrer
            </button>
          </div> */}

          {label === 'Prenom' && (
            <>
              <div className="mb-3 p-2 border border-gray-300 rounded">
                <label
                  htmlFor={label}
                  className="text-gray-600 text-xs transition-all duration-100"
                >
                  {label}
                </label>
                <input
                  id={label}
                  name={label}
                  type="text"
                  className="peer w-full text-black font-medium focus:outline-none"
                  defaultValue={data}
                />
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="py-2 px-3 bg-blue-300 text-white rounded"
                >
                  Enregistrer
                </button>
              </div>
            </>
          )}
          {label === 'Nom de Famille' && (
            <>
              <div className="mb-3 p-2 border border-gray-300 rounded">
                <label
                  htmlFor={label}
                  className="text-gray-600 text-xs transition-all duration-100"
                >
                  {label}
                </label>
                <input
                  id={label}
                  name={label}
                  type="text"
                  className="peer w-full text-black font-medium focus:outline-none"
                  defaultValue={data}
                />
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="py-2 px-3 bg-blue-300 text-white rounded"
                >
                  Enregistrer
                </button>
              </div>
            </>
          )}
          {label === 'Numero de Telephone' && (
            <>
              <div className="mb-3 p-2">
                <div className="w-full mb-2 inline-block relative">
                  <select
                    onChange={onCodeChange}
                    className="appearance-none block w-full border border-gray-300 rounded py-3 pl-4 pr-8 leading-tight focus:bg-white focus:outline-none focus:shadow-outline text-sm sm:text-xl text-gray-800"
                  >
                    <option value="+256">Ouganda (+256)</option>
                    <option value="+243">DRC (+243)</option>
                    <option value="+255">Tanzanie (+255)</option>
                  </select>
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
                    placeholder=""
                  />
                </div>
                <div className="flex justify-end items-center">
                  <button
                    type="submit"
                    className="py-2 px-3 bg-blue-300 text-white rounded"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </>
          )}
          {label === 'Addresse' && (
            <>
              <div className="mb-3 p-2 border border-gray-300 rounded">
                <label
                  htmlFor={label}
                  className="text-gray-600 text-xs transition-all duration-100"
                >
                  Pays/Region
                </label>
                <input
                  id={label}
                  name={label}
                  type="text"
                  className="peer w-full text-black font-medium focus:outline-none"
                  defaultValue="Rep. Dem. du Congo"
                />
              </div>
              <div className="mb-3 p-2 border border-gray-300 rounded">
                <label
                  htmlFor={label}
                  className="text-gray-600 text-xs transition-all duration-100"
                >
                  Ville
                </label>
                <input
                  id={label}
                  name={label}
                  type="text"
                  className="peer w-full text-black font-medium focus:outline-none"
                  defaultValue="Bukavu"
                />
              </div>
              <div className="w-full flex justify-between">
                <div className="w-[55%] mb-3 p-2 border border-gray-300 rounded">
                  <label
                    htmlFor={label}
                    className="text-gray-600 text-xs transition-all duration-100"
                  >
                    Etat
                  </label>
                  <input
                    id={label}
                    name={label}
                    type="text"
                    className="peer w-full text-black font-medium focus:outline-none"
                    defaultValue="Bukavu"
                  />
                </div>
                <div className="w-2/5 mb-3 p-2 border border-gray-300 rounded">
                  <label
                    htmlFor={label}
                    className="text-gray-600 text-xs transition-all duration-100"
                  >
                    Code Postal
                  </label>
                  <input
                    id={label}
                    name={label}
                    type="text"
                    className="peer w-full text-black font-medium focus:outline-none"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="flex justify-end items-center">
                <button
                  type="submit"
                  className="py-2 px-3 bg-blue-300 text-white rounded"
                >
                  Enregistrer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default memo(InfoItem);
