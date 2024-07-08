'use client'
import React, { useState } from 'react'

export default function Drawer() {
  const steps = [{ title: "Build Event Page", description: "Add all of your event details and let attendees know what to expect" }, { title: "Add Tickets" }, { title: "Publish" }]
  const [active, setActive] = useState(0)
  return (
    <div className='drawer__eds'>
      <h3>Steps</h3>
      <ul className='drawer_list'>
        {steps.map(({ title, description }, index) =>
          <li key={title} className={active === index ? "drawer_li-active" : ""}>
            <label>
              <input name="eds_list"
                type="radio"
                checked={active === index}
                onChange={() => setActive(index)}
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
