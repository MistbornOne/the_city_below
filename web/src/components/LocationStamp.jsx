import React from 'react'

export default function LocationStamp({ location, character }) {
  if (!location) return null
  return (
    <div className="mb-6 space-y-1">
      <div className="location-stamp">{character.name} | {character.occupation} | Age: {character.age}</div>
      <div className="block">
        <span className="location-stamp">{location.place}</span>
      </div>
      <div className="block">
        <span className="location-stamp">{location.level}</span>
      </div>
      <div className="block">
        <span className="location-stamp">{location.time}</span>
      </div>
    </div>
  )
}
