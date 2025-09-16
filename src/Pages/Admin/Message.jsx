import React, { useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import dayjs from 'dayjs'

const makeRow = (i) => ({
  id: i + 1,
  title: ['Policy Update: Background Check Now Required', 'Subscription Expiring in 2 Days', 'Care Request Assigned', 'Promo: Get Verified at 50% Off', 'New Academy Course Now Live'][i % 5],
  audience: i % 2 === 0 ? 'All Care Providers' : `CareSeeker – Jane Doe`,
  type: i % 3 === 0 ? 'Manual' : 'System',
  date: dayjs().subtract(i, 'day').format('DD-MM-YYYY'),
  delivery: i % 4 === 0 ? 'Delivered' : i % 4 === 1 ? 'Opened (60%)' : i % 4 === 2 ? 'Failed (3 users)' : 'Delivered',
})

const INITIAL = new Array(10).fill(0).map((_, i) => makeRow(i))

function Message() {
  const [rows] = useState(INITIAL)
  const [query, setQuery] = useState('')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [showSendModal, setShowSendModal] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const filtered = useMemo(() => {
    if (!query) return rows
    const q = query.toLowerCase()
    return rows.filter(r => r.title.toLowerCase().includes(q))
  }, [rows, query])

  return (
    <div className="bg-white text-black">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/3">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search for notification" className="pl-10 pr-3 py-2 w-full rounded border border-gray-200 bg-white text-sm text-black" />
        </div>
        <div>
          <button onClick={() => setShowSendModal(true)} className="px-4 py-2 bg-[#0ea5d7] text-white rounded">Send Message</button>
        </div>
      </div>

      <div className="overflow-hidden rounded border border-gray-100 text-black">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left w-12"><input type="checkbox" /></th>
              <th className="p-3 text-left">Message Title</th>
              <th className="p-3 text-left">Audience</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Date Sent</th>
              <th className="p-3 text-left">Delivery Status</th>
              <th className="p-3 text-left w-12">...</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-3 align-top"><input type="checkbox" /></td>
                <td className="p-3 align-top font-medium text-black">{r.title}</td>
                <td className="p-3 align-top text-black">{r.audience}</td>
                <td className="p-3 align-top text-black">{r.type}</td>
                <td className="p-3 align-top text-black">{r.date}</td>
                <td className="p-3 align-top text-black">{r.delivery}</td>
                <td className="p-3 align-top">
                  <div className="relative inline-block">
                    <button onClick={() => setOpenMenuId(openMenuId === r.id ? null : r.id)} className="px-2 py-1 rounded hover:bg-gray-100 text-black">•••</button>
                    {openMenuId === r.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10 text-sm">
                        <ul>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">View</li>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">Resend</li>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">Archive</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Send Message Modal */}
      {showSendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 text-black ">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowSendModal(false)} />
          <div className="relative z-50 bg-white max-w-3xl w-full rounded shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Message Title</h3>
              <input className="w-full p-3 border border-gray-200 rounded mb-4 bg-white" placeholder="Input title" />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <select className="p-3 border border-gray-200 rounded bg-white">
                  <option>Select audience</option>
                </select>
                <select className="p-3 border border-gray-200 rounded bg-white">
                  <option>Select Option</option>
                </select>
              </div>

              <textarea className="w-full p-3 border border-gray-200 rounded h-48 mb-4 bg-white" placeholder="Input message" />

              <div className="flex justify-end">
                <button onClick={() => setShowSendModal(false)} className="px-4 py-2 mr-3 border rounded">Cancel</button>
                <button onClick={() => { setShowSendModal(false); setSuccessMsg('Message sent successfully'); setTimeout(() => setSuccessMsg(''), 3000); }} className="px-6 py-2 bg-[#0ea5d7] text-white rounded">Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success alert */}
      {successMsg && (
        <div className="fixed top-6 right-6 z-60">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded shadow">{successMsg}</div>
        </div>
      )}
    </div>
  )
}

export default Message
