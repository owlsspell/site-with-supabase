'use client'
import { setActiveStep } from '@/lib/features/drawerStepsSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import React from 'react'

export default function Drawer() {
  const steps = [{ title: "Build Event Page", description: "Add all of your event details and let attendees know what to expect" }, { title: "Add Tickets" }, { title: "Publish" }]
  const activeStep = useAppSelector((state) => state.drawerSteps.activeStep)
  const dispatch = useAppDispatch()
  const handleChange = (index: number) => dispatch(setActiveStep(index))
  return (
    <div className='drawer__eds'>
      <h3>Steps</h3>
      <ul className='drawer_list'>
        {steps.map(({ title, description }, index) =>
          <li key={title} className={activeStep === index ? "drawer_li-active" : ""}>
            <label>
              <input name="eds_list"
                type="radio"
                checked={activeStep === index}
                onClick={() => handleChange(index)}
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
