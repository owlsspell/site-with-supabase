'use client'
import { setActiveStep } from '@/lib/features/drawerStepsSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Drawer({ closeDrawer }: { closeDrawer?: () => void }) {
  const steps = [{ id: 0, slug: "general", title: "Build Event Page", description: "Add all of your event details and let attendees know what to expect" }, { id: 1, slug: "tickets", title: "Add Tickets" }, { id: 2, slug: "publish", title: "Publish" }]
  const activeStep = useAppSelector((state) => state.drawerSteps.activeStep)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (index: number) => {
    dispatch(setActiveStep(index))
    if (!closeDrawer) return
    router.push(`?page=${steps[index].slug}`)
    closeDrawer()
  }
  useEffect(() => {
    const page = searchParams.get("page");
    if (!page) {
      dispatch(setActiveStep(0))
      return
    }
    const step = steps.find(step => step.slug === page)
    dispatch(setActiveStep(step?.id))
  }, [searchParams])
  return (
    <div className='drawer__eds'>
      <h3>Steps</h3>
      <ul className='drawer_list'>
        {steps.map(({ id, title, description }) =>
          <li key={title} className={activeStep === id ? "drawer_li-active" : ""}>
            <label>
              <input name="eds_list"
                type="radio"
                checked={activeStep === id}
                onChange={() => handleChange(id)}
              />
              <div className='drawer_step'>
                <div className='drawer_step-title'>{title}</div>
                {description && <div>{description}</div>}
              </div>
            </label>
          </li>
        )}
      </ul>
    </div>
  )
}
