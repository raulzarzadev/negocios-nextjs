import { useState } from 'react'

const RatingSection = ({ value = 4, setValue }) => {
  const handleChangeRating = ({ target }) => {
    console.log('value', target.id)
  }

  const [disabled] = useState(true)

  return (
    <div
      className={`rating rating-sm gap-0.5 py-1  ${
        disabled && 'opacity-40'
      }`}
    >
      <input
        disabled={disabled}
        id="1"
        type="radio"
        name="rating-2"
        className={`
        bg-primary
        mask mask-star-2  
        `}
        onChange={handleChangeRating}
      />
      <input
        disabled={disabled}
        id="2"
        type="radio"
        name="rating-2"
        className={`
        bg-primary
        mask mask-star-2  
        `}
        onChange={handleChangeRating}
      />
      <input
        disabled={disabled}
        id="3"
        type="radio"
        name="rating-2"
        className={`
        bg-primary
        mask mask-star-2    `}
        onChange={handleChangeRating}
      />
      <input
        disabled={disabled}
        id="4"
        type="radio"
        name="rating-2"
        className={`
        bg-primary
        mask mask-star-2  `}
        onChange={handleChangeRating}
      />
      <input
        disabled={disabled}
        id="5"
        type="radio"
        name="rating-2"
        className={`
        bg-primary
        mask mask-star-2  s `}
        onChange={handleChangeRating}
      />
    </div>
  )
}
export default RatingSection
