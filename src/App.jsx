import { useState, useCallback, useEffect, useRef } from 'react';

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const passwordReference = useRef(null)

  const copyToClipboard = useCallback(() => {
    passwordReference.current.select();
    passwordReference.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {passwordGenerator()}, [length, numberAllowed, characterAllowed, passwordGenerator])



  return (
    <>
      <div
        className="w-full max-w-xl mx-auto shadow-md rounded-lg
        px-6 py-8 my-8 text-orange-500 bg-gray-700 flex flex-col justify-center items-center"
      >
        <h1 className='text-white text-center mb-4 text-3xl'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 w-full'>
          <input
            type='text'
            value={password}
            className='outline-none px-4 py-2 w-full'
            placeholder='Password'
            readOnly
            ref={passwordReference}
          />
          <button 
            className='
            text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 
            dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
            dark:focus:ring-blue-800
          '
          onClick={copyToClipboard}
          >Copy</button>
        </div>
        <div className='flex items-center justify-between w-full gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <label className='flex items-center gap-x-1'>Length: {length}</label>
            <input
              type='range'
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type='checkbox'
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
              className='cursor-pointer'
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-2'>
            <input
              type='checkbox'
              checked={characterAllowed}
              onChange={() => setCharacterAllowed(!characterAllowed)}
              className='cursor-pointer'
            />
            <label>Special Characters</label>
          </div>
        </div>
        {/* <button className='text-white bg-green-700 hover:bg-green-800 focus:ring-4
            focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 
            dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none
            dark:focus:ring-green-800 mt-10'
            onClick={passwordGenerator}
            >
          Generate Password
        </button> */}
      </div>
    </>
  );
};

export default App;
