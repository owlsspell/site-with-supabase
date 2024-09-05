'use client'
import { setActiveStep } from '@/lib/features/drawerStepsSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React from 'react'

export default function Drawer({ closeDrawer }: { closeDrawer?: () => void }) {
  const steps = [{ id: 0, title: "Build Event Page", description: "Add all of your event details and let attendees know what to expect" }, { id: 1, title: "Add Tickets" }, { id: 2, title: "Publish" }]
  const activeStep = useAppSelector((state) => state.drawerSteps.activeStep)
  const dispatch = useAppDispatch()
  const handleChange = (index: number) => {
    dispatch(setActiveStep(index))
    if (!closeDrawer) return
    closeDrawer()
  }
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
