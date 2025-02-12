import Logo from './../Assets/Logo.png'

export const StickyFooterMobile = () => (
    <>
        <nav className='md:hidden w-screen flex justify-center items-center p-4 bg-white shadow-md sticky bottom-0 z-50' >
            <div className='flex items-center space-x-2'>
                <img src={Logo} alt='logo' className='w-10 h-10' />
                <h1 className='text-xl font-bold'>DAIICT</h1>
            </div>
        </nav>
    </>
)