import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import { Breadcrumb, BreadcrumbLink, BreadcrumbList,BreadcrumbSeparator,BreadcrumbItem,BreadcrumbPage } from './ui/breadcrumb'

import HeadderUser from './user/headder-user'

const DashHeader = () => {
  return (
    <header className="flex h-10 shrink-0 items-center gap-2  transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12   flex-row justify-between border-b bg-blue-50 py-7 md:py-7 sticky  lg:py-8 ">
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
              Building Your Application
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    
    </div>
    <div className='px-4'>
      <HeadderUser />
    </div>
  </header>
  ) 
}

export default DashHeader