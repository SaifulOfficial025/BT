import React, { useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import dayjs from 'dayjs'

const makeRow = (i) => ({
  id: i + 1,
  name: ['Stephen Adejare', 'Jane Doe', 'Ozenua Tobi', 'Titus Olumba', 'ireti Pinnuade', 'Oluwafemi Peter'][i % 6],
  verificationType: i % 2 === 0 ? 'Background Checks' : '-',
  paymentOption: i % 3 === 0 ? 'Installment (2 payouts)' : 'Full Payment',
  paymentStatus: i % 4 === 0 ? `In Progress (₦3,000 remaining)` : i % 4 === 1 ? 'Paid' : i % 4 === 2 ? 'Completed' : 'Failed',
  verificationStatus: ['In Review', 'Sent to Vetting', 'Verified', 'Failed', 'Declined'][i % 5],
  vettingFeedback: i % 3 === 0 ? 'ID Validated – Address Pending' : i % 3 === 1 ? 'ID mismatch' : 'All checks passed',
  lastUpdated: dayjs().subtract(i, 'day').format('DD-MM-YYYY'),
})

const INITIAL = new Array(18).fill(0).map((_, i) => makeRow(i))

function ProfileVerificationProvider() {
  const [rows] = useState(INITIAL)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [openMenuId, setOpenMenuId] = useState(null)

  const pageSize = 8

  const filtered = useMemo(() => {
    if (!query) return rows
    const q = query.toLowerCase()
    return rows.filter(r => r.name.toLowerCase().includes(q))
  }, [rows, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = filtered.slice((page - 1) * pageSize, page * pageSize)

  const makePageButtons = () => {
    const pages = []
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) pages.push(i)
    } else {
      pages.push(1)
      if (page > 4) pages.push('left-ellipsis')
      const start = Math.max(2, page - 2)
      const end = Math.min(pageCount - 1, page + 2)
      for (let i = start; i <= end; i++) pages.push(i)
      if (page < pageCount - 3) pages.push('right-ellipsis')
      pages.push(pageCount)
    }
    return pages
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-1/3">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search care provider" className="pl-10 pr-3 py-2 w-full rounded border border-gray-200 bg-white text-sm text-black" />
        </div>
      </div>

      <div className="flex flex-col min-h-[60vh]">
        <div className="overflow-hidden rounded border border-gray-100 text-black flex-1 flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm">
              <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="p-3 text-left w-12"><input type="checkbox" /></th>
              <th className="p-3 text-left">Care Provider Name</th>
              <th className="p-3 text-left">Verification Type</th>
              <th className="p-3 text-left">Payment Option</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-left">Verification Status</th>
              <th className="p-3 text-left">Vetting Feedback</th>
              <th className="p-3 text-left">Last Updated</th>
              <th className="p-3 text-left w-12">...</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {current.map((r, idx) => (
              <tr key={r.id} className={`border-b hover:bg-gray-50 ${idx === 0 && page === 1 ? 'bg-blue-50' : ''}`}>
                <td className="p-3 align-top"><input type="checkbox" /></td>
                <td className="p-3 align-top font-medium text-black">{r.name}</td>
                <td className="p-3 align-top text-black">{r.verificationType}</td>
                <td className="p-3 align-top text-black">{r.paymentOption}</td>
                <td className="p-3 align-top text-black">{r.paymentStatus}</td>
                <td className="p-3 align-top text-black">{r.verificationStatus}</td>
                <td className="p-3 align-top text-black">{r.vettingFeedback}</td>
                <td className="p-3 align-top text-black">{r.lastUpdated}</td>
                <td className="p-3 align-top">
                  <div className="relative inline-block">
                    <button onClick={() => setOpenMenuId(openMenuId === r.id ? null : r.id)} className="px-2 py-1 rounded hover:bg-gray-100 text-black">•••</button>
                    {openMenuId === r.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10 text-sm">
                        <ul>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">View</li>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">Approve</li>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">Reject</li>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">Message</li>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">Re Upload</li>
                          <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-black">Send Prompt</li>
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
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="inline-flex items-center px-3 py-2 border rounded-md bg-white text-sm disabled:opacity-50 text-black"
            >
              ← Previous
            </button>
          </div>

          <div className="flex-1 flex justify-center text-black">
            <nav className="inline-flex items-center gap-2" aria-label="Pagination">
              {makePageButtons().map((pbtn, idx) => {
                if (pbtn === 'left-ellipsis' || pbtn === 'right-ellipsis') {
                  return (
                    <span key={String(pbtn) + idx} className="px-2 py-1 text-sm text-gray-400">…</span>
                  )
                }

                const isActive = pbtn === page
                return (
                  <button
                    key={pbtn}
                    onClick={() => setPage(pbtn)}
                    className={`px-3 py-1 text-black rounded-md text-sm border ${isActive ? 'bg-[#0ea5d7] text-white' : 'bg-white text-black'} hover:shadow-sm`}
                  >
                    {pbtn}
                  </button>
                )
              })}
            </nav>
          </div>

          <div>
            <button
              disabled={page === pageCount}
              onClick={() => setPage(p => Math.min(pageCount, p + 1))}
              className="inline-flex items-center px-3 py-2 border rounded-md bg-white text-sm disabled:opacity-50 text-black"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileVerificationProvider
