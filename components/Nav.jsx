'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

import Link from 'next/link';
import Image from 'next/image';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" alt="Promptsight" className="object-contain" width={30} height={30} />
        <p className='logo_text'>Promptsight</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black-btn'>
              Create Post
            </Link>
            
            <button type='button' onClick={signOut} className='outline-btn'>
              Sign Out
            </button>

            <Link href='/profile' className='flex gap-2 flex-center'>
              <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' />
            </Link>
          </div>
        ) : (
          <>
            {providers && Object.values(providers).map(provider => (
              <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black-btn'>
                Sign In
              </button>
            ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropDown(prev => !prev)} />
          
            {toggleDropDown && (
              <div className='dropdown'>
                <Link href='/profile' className='dropdown-link' onClick={() => setToggleDropDown(false)}>
                  My Profile
                </Link>
                <Link href='/create-prompt' className='dropdown-link' onClick={() => setToggleDropDown(false)}>
                  Create Prompt
                </Link>
                <button type='button' className='mt-5 w-full black-btn' onClick={() => {
                  setToggleDropDown(false);
                  signOut();
                }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ): (
          <>
            {providers && Object.values(providers).map(provider => (
              <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black-btn'>
                Sign In
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav