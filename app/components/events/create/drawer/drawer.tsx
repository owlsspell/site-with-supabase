'use client'
import { DrawerSteps, setActiveStep } from '@/lib/features/drawerStepsSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function Drawer({ closeDrawer }: { closeDrawer?: () => void }) {
  const steps = [{ id: 0, slug: "general", title: "Build Event Page", description: "Add all of your event details and let attendees know what to expect" }, { id: 1, slug: "tickets", title: "Add Tickets" }, { id: 2, slug: "publish", title: "Publish" }]
  const activeStep = useAppSelector((state) => state.drawerSteps.activeStep)
  const isEventCreated = useAppSelector((state) => state.createdEventInfo.isEventCreated)
  const stepsStatus = useAppSelector((state) => state.drawerSteps.stepsStatus)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (id: number) => {
    if (isEventCreated) {
      dispatch(setActiveStep(id))
      if (!closeDrawer) return
      closeDrawer()
    }
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

  useEffect(() => {
    router.push(`?page=${steps[activeStep ?? 0].slug}`)
  }, [activeStep])
  return (
    <div className='drawer__eds'>
      <h3>Steps</h3>
      <ul className='drawer_list'>
        {steps.map(({ id, slug, title, description }) =>
          <li key={title} className={`drawer_li ${activeStep === id ? "drawer_li-active" : ""} ${stepsStatus[slug as keyof DrawerSteps["stepsStatus"]] ? "drawer_li-active drawer_li-done" : ""}`}>
            <label>
              <input name={slug}
                type="radio"
                checked={activeStep === id || stepsStatus[slug as keyof DrawerSteps["stepsStatus"]]}
                onChange={() => handleChange(id)}
                onClick={() => handleChange(id)}
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
