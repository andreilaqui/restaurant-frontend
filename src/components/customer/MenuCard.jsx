import React from 'react'

function MenuCard({ item }) {
  return (
    <div className="rounded-lg shadow bg-sunrice-cream overflow-hidden hover:shadow-lg transition">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-sunrice-brown font-semibold text-lg">
          {item.name}
        </h3>
        <p className="text-sunrice-brown/80 text-sm mt-1">
          {item.description}
        </p>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-sunrice-green text-sunrice-brown px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price */}
        <p className="mt-3 font-bold text-sunrice-yellow">
          ${item.price}
        </p>
      </div>
    </div>

  )
}

export default MenuCard