"use client";

export default function DashboardSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="editorial-title text-2xl md:text-3xl">Settings</h1>
        <p className="body-text text-sm mt-1">
          Manage your CMS configuration
        </p>
      </div>

      <div className="bg-white border border-[#eee] rounded-sm p-6 max-w-2xl">
        <h2 className="editorial-title text-lg mb-6">General Settings</h2>

        <div className="space-y-5">
          <div>
            <label className="category-label block mb-2">Site Name</label>
            <input
              type="text"
              defaultValue="Sukma Jaya Story"
              className="w-full text-sm font-light border border-[#eee] px-3 py-2.5 focus:outline-none focus:border-[#999] transition-colors"
            />
          </div>
          <div>
            <label className="category-label block mb-2">
              Site Description
            </label>
            <textarea
              defaultValue="Premium photography and videography studio based in Bogor."
              rows={3}
              className="w-full text-sm font-light border border-[#eee] px-3 py-2.5 focus:outline-none focus:border-[#999] transition-colors resize-none"
            />
          </div>
          <div>
            <label className="category-label block mb-2">Contact Email</label>
            <input
              type="email"
              defaultValue="hello@sukmajayastory.com"
              className="w-full text-sm font-light border border-[#eee] px-3 py-2.5 focus:outline-none focus:border-[#999] transition-colors"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#eee]">
          <button className="inline-flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 text-sm font-light tracking-wide hover:bg-[#333] transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
