import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../context/ThemeContext'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Photos', href: '/photos', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <Disclosure as="nav" className="fixed w-full top-0 z-50 bg-white dark:bg-zinc-900 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="text-2xl font-bold text-zinc-900 dark:text-white">
                    PhotoBlog
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                            : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={toggleTheme}
                  className="rounded-lg p-2.5 text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  {isDark ? '🌞' : '🌙'}
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}