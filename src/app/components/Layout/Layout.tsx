import { ValueOf } from '@/types'
import React from 'react'
import { LAYOUT_VARIANTS } from './Layout.constants'

interface LayoutProps extends React.PropsWithChildren {
    variant?: ValueOf<typeof LAYOUT_VARIANTS>;
}

//TODO: add variant for user panel
const Layout = (props: LayoutProps) => {
    const { children, variant = LAYOUT_VARIANTS.DEFAULT } = props;

    return <main className='flex flex-col justify-start items-center w-full min-h-full bg-red-950 text-white'>{children}</main>
}

export { Layout }