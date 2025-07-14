import Header from '@/components/shared/header'
import { getSession } from '@/actions/user'
import { Button } from '@workspace/ui/components/button'
import React from 'react'
import Todos from './todo'

const Page = async () => {
  

  //Example #1 on server side session
  const session = await getSession();

  
  return (
    <>
    <Header crumb={[{title: "Dashboard", url: "/dashboard"}]}>
    {/* YOU CAN PUT ANYTHING HERE */}
   {null}
    </Header>

    <div className='flex flex-col max-w-4xl mx-auto gap-4 py-20'>
        <Todos/>
    </div>
    </>
  )
}

export default Page