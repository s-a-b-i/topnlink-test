import React from "react"
import { FiInfo, FiX } from "react-icons/fi"
import { Popover } from "@headlessui/react"

const socialPlatforms = [
  { name: "facebook", placeholder: "https://facebook.com/yourpage", tooltip: "Enter your Facebook page URL." },
  { name: "instagram", placeholder: "https://instagram.com/yourpage", tooltip: "Enter your Instagram profile URL." },
  { name: "tiktok", placeholder: "https://tiktok.com/@yourpage", tooltip: "Enter your TikTok profile URL." },
  { name: "reddit", placeholder: "https://reddit.com/r/yoursubreddit", tooltip: "Enter your Reddit subreddit URL." },
  { name: "telegram", placeholder: "https://t.me/yourchannel", tooltip: "Enter your Telegram channel URL." },
]

const tooltipContent = {
  sensitiveTopics: "Select if your content includes sensitive topics like gambling, CBD, adult content, or trading.",
  googleNews: "Enable this option if your publication is registered with Google News.",
}

const SocialMediaSection = ({ formData, handleInputChange }) => {
  // Ensure formData.socialMedia exists and has default values
  React.useEffect(() => {
    if (!formData.socialMedia) {
      const defaultSocialMedia = socialPlatforms.reduce((acc, platform) => {
        acc[platform.name] = [""]
        return acc
      }, {})
      
      handleInputChange({
        target: {
          name: "socialMedia",
          value: defaultSocialMedia
        }
      })
    }
  }, [])

  const handleAddLink = (platform) => {
    const currentLinks = formData.socialMedia?.[platform] || [""]
    handleInputChange({
      target: {
        name: "socialMedia",
        value: {
          ...formData.socialMedia,
          [platform]: [...currentLinks, ""]
        }
      }
    })
  }

  const handleRemoveLink = (platform, index) => {
    const currentLinks = formData.socialMedia?.[platform] || [""]
    if (currentLinks.length > 1) { // Ensure we keep at least one input
      const updatedLinks = currentLinks.filter((_, i) => i !== index)
      handleInputChange({
        target: {
          name: "socialMedia",
          value: {
            ...formData.socialMedia,
            [platform]: updatedLinks.length ? updatedLinks : [""] // Ensure at least empty string
          }
        }
      })
    }
  }

  const handleLinkChange = (platform, index, value) => {
    const currentLinks = [...(formData.socialMedia?.[platform] || [""])]
    currentLinks[index] = value
    handleInputChange({
      target: {
        name: "socialMedia",
        value: {
          ...formData.socialMedia,
          [platform]: currentLinks
        }
      }
    })
  }

  // Guard for initial render when socialMedia might not exist
  if (!formData.socialMedia) {
    return null
  }

  return (
    <div className="space-y-6">
      {socialPlatforms.map((platform) => (
        <div key={platform.name} className="space-y-3">
          <div className="flex items-center gap-2">
            <label className="block font-medium text-gray-700 capitalize">{platform.name}</label>
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {platform.tooltip}
              </Popover.Panel>
            </Popover>
          </div>

          {/* Always ensure at least one input field exists */}
          {(formData.socialMedia[platform.name]?.length ? 
            formData.socialMedia[platform.name] : 
            [""]
          ).map((link, index) => (
            <div key={index} className="relative">
              <input
                type="url"
                value={link || ""}
                onChange={(e) => handleLinkChange(platform.name, index, e.target.value)}
                placeholder={platform.placeholder}
                className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {index > 0 && ( // Only show remove button for additional fields
                <button
                  type="button"
                  onClick={() => handleRemoveLink(platform.name, index)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleAddLink(platform.name)}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add another {platform.name} link
          </button>
        </div>
      ))}


      {/* Sensitive Topics section */}
      <div className="border-t pt-6 mt-6">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
          <label className="font-semibold mb-2 md:mb-0 md:mr-12 flex items-center gap-1">
            Sensitive Topics
            <Popover className="relative">
              <Popover.Button className="focus:outline-none">
                <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
              </Popover.Button>
              <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
                {tooltipContent.sensitiveTopics}
              </Popover.Panel>
            </Popover>
          </label>
          <div className="grid grid-cols-2 gap-4 md:flex md:space-x-10">
            {["Gambling", "CBD", "Adult", "Trading"].map((topic) => (
              <label key={topic} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sensitiveTopics.includes(topic)}
                  onChange={(e) => {
                    const isChecked = e.target.checked
                    handleInputChange({
                      target: {
                        name: "sensitiveTopics",
                        value: isChecked
                          ? [...formData.sensitiveTopics, topic]
                          : formData.sensitiveTopics.filter((t) => t !== topic),
                      },
                    })
                  }}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{topic}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Google News section */}
      <div className="border-t pt-6">
        <label className="flex items-center gap-2">
          <span className="font-semibold">Google News</span>
          <Popover className="relative">
            <Popover.Button className="focus:outline-none">
              <FiInfo className="text-gray-500 hover:text-gray-700 transition-colors" size={16} />
            </Popover.Button>
            <Popover.Panel className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-600 bg-white border rounded-lg shadow-lg">
              {tooltipContent.googleNews}
            </Popover.Panel>
          </Popover>
          <input
            type="checkbox"
            name="googleNews"
            checked={formData.googleNews}
            onChange={(e) =>
              handleInputChange({
                target: {
                  name: "googleNews",
                  value: e.target.checked,
                },
              })
            }
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
      </div>
    </div>
  )
}

export default SocialMediaSection

