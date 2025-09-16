import React, { useMemo, useState } from 'react';
import { FaSearch, FaDownload, FaTrashAlt, FaEdit, FaChevronDown, FaCalendarAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import CubeIcon from '../../../public/3dcube.svg?react';
import CubeIconGreen from '../../../public/3dcubeGreen.svg?react';
import CubeIconPink from '../../../public/3dcubePink.svg?react';
import CubeIconOrange from '../../../public/3dcubeOrange.svg?react';


// Sample data generator
const makeRow = (i, status = 'Pending', careType = 'Child Care') => ({
  id: `ASE${34454 + i}F`,
  name: ['Stephen Adejare', 'Mary Johnson', 'Samuel Green', 'Priya Patel'][i % 4],
  careType,
  status,
  date: dayjs().subtract(i % 30, 'day').format('DD-MM-YYYY'),
});

// Create a larger set of rows covering all statuses for demo
const ALL_ROWS = [
  ...Array.from({ length: 8 }).map((_, i) => makeRow(i, 'Pending', ['Child Care','Tutoring','Elderly Care'][i % 3])),
  ...Array.from({ length: 6 }).map((_, i) => makeRow(20 + i, 'Ongoing Activity', ['Tutoring','Elderly Care','Child Care'][i % 3])),
  ...Array.from({ length: 4 }).map((_, i) => makeRow(40 + i, 'Fulfilled', ['Elderly Care','Child Care'][i % 2])),
];

const statsConfig = [
  { key: 'all', label: 'All Activities', value: ALL_ROWS.length, icon: CubeIcon },
  { key: 'fulfilled', label: 'Fulfilled Requests', value: ALL_ROWS.filter(r => r.status === 'Fulfilled').length, icon: CubeIconGreen },
  { key: 'pending', label: 'Pending Approval', value: ALL_ROWS.filter(r => r.status === 'Pending').length, icon: CubeIconPink },
  { key: 'ongoing', label: 'Ongoing Activities', value: ALL_ROWS.filter(r => r.status === 'Ongoing Activity').length, icon: CubeIconOrange },
];

function Activities() {
  const [activeStat, setActiveStat] = useState('all');
  const [rows, setRows] = useState(ALL_ROWS);
  const [editRow, setEditRow] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const [query, setQuery] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState({ key: 'date', dir: 'desc' });

  const statusOptions = useMemo(() => ['All', 'Pending', 'Ongoing Activity', 'Fulfilled'], []);
  const serviceOptions = useMemo(() => ['All', 'Child Care', 'Tutoring', 'Elderly Care'], []);

  const filtered = useMemo(() => {
    let data = [...rows];

    // Stat filter
    if (activeStat === 'fulfilled') data = data.filter(r => r.status === 'Fulfilled');
    if (activeStat === 'pending') data = data.filter(r => r.status === 'Pending');
    if (activeStat === 'ongoing') data = data.filter(r => r.status === 'Ongoing Activity');

    // Search
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(r => r.id.toLowerCase().includes(q) || r.name.toLowerCase().includes(q));
    }

    // Service filter
    if (serviceFilter !== 'All') data = data.filter(r => r.careType === serviceFilter);

    // Status filter
    if (statusFilter !== 'All') data = data.filter(r => r.status === statusFilter);

    // Sort
    data.sort((a, b) => {
      const k = sortBy.key;
      let av = a[k];
      let bv = b[k];
      if (k === 'date') {
        av = dayjs(a.date, 'DD-MM-YYYY').toDate();
        bv = dayjs(b.date, 'DD-MM-YYYY').toDate();
      }
      if (av < bv) return sortBy.dir === 'asc' ? -1 : 1;
      if (av > bv) return sortBy.dir === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [rows, activeStat, query, serviceFilter, statusFilter, sortBy]);

  function toggleSort(key) {
    setSortBy(s => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  }

  function downloadCSV() {
    const csv = [
      ['Request ID', 'User Name', 'Care Type', 'Status', 'Date Created'],
      ...filtered.map(r => [r.id, r.name, r.careType, r.status, r.date]),
    ].map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activities.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 text-black bg-white">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {statsConfig.map(s => {
          const isActive = activeStat === s.key;
          return (
            <div
              key={s.key}
              onClick={() => setActiveStat(s.key)}
              className={`p-4 rounded-lg cursor-pointer flex flex-col justify-between ${isActive ? 'bg-[#0e2f43] text-white' : 'bg-white text-black'} border`}
            >
              <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start">
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full mb-5 ${isActive ? 'bg-white/10' : 'bg-slate-100'}`}>
                      {(() => {
                        const Icon = s.icon || CubeIcon;
                        return <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-black'}`} />;
                      })()}
                    </div>
                    <div className="text-sm font-medium">{s.label}</div>
                  </div>
                  <div className={`ml-auto text-2xl font-semibold ${isActive ? 'text-white' : 'text-black'}`}>{s.value.toLocaleString()}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls: search left, filters right */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1">
            <div className="flex items-center bg-white rounded-md px-3 py-2 shadow-sm text-black relative z-40">
              <FaSearch className="text-slate-400 mr-2" />
              <input type="search" tabIndex={0} className="outline-none w-full text-sm text-black bg-white" placeholder="search care provider" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select value={serviceFilter} onChange={e => setServiceFilter(e.target.value)} className="appearance-none px-4 py-2 border rounded-md text-sm bg-white text-black pr-8">
              <option>Service Type</option>
              {serviceOptions.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="appearance-none px-4 py-2 border rounded-md text-sm bg-white text-black pr-8">
              <option>Filter by Status</option>
              {statusOptions.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <FaChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative">
            <div className="flex items-center px-4 py-2 border rounded-md text-sm bg-white text-black gap-2">
              <FaCalendarAlt className="text-slate-400" />
              <input type="date" className="outline-none text-sm text-black bg-white" />
            </div>
          </div>

          <button onClick={downloadCSV} className="px-3 py-2 border rounded-md flex items-center justify-center" aria-label="download">
            <FaDownload className="text-slate-600" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow-sm overflow-hidden text-black">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 text-xs">
            <tr>
              <th className="p-3"><input type="checkbox" /></th>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort('id')}>Request ID</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort('name')}>User Name</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort('careType')}>Care Type</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort('status')}>Status</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => toggleSort('date')}>Date Created</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b last:border-b-0 hover:bg-slate-50">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3 font-semibold">{r.id}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.careType}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs ${r.status === 'Pending' ? 'bg-purple-50 text-purple-600' : r.status === 'Ongoing Activity' ? 'bg-sky-50 text-sky-600' : 'bg-green-50 text-green-600'}`}>{r.status}</span>
                </td>
                <td className="p-3">{r.date}</td>
                <td className="p-3 flex items-center gap-3 text-slate-500">
                  <button title="delete" onClick={() => setDeleteRow(r)}><FaTrashAlt /></button>
                  <button title="edit" onClick={() => setEditRow(r)}><FaEdit /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">No results</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit / Details Modal */}
      {editRow && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
          <div className="absolute inset-0 bg-black/30" onClick={() => setEditRow(null)} />
          <div className="relative bg-white w-[380px] rounded-lg shadow-lg p-6 z-50">
            <button className="absolute right-3 top-3 text-slate-500 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center" onClick={() => setEditRow(null)}>✕</button>
            <h3 className="text-lg font-medium mb-4">Details</h3>

            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Requester</span><span className="text-right">{editRow.name}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Care Provider's Name</span><span className="text-right">Ezeonu Justina</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Care Provider's Phone Number</span><span className="text-right">+234123456789</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Care Provider's Email</span><span className="text-right">olivia@untitledui.com</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Care Type</span><span className="text-right">{editRow.careType}</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Time Slot</span><span className="text-right">07:00 am - 09:30 pm</span></div>
              <div className="flex justify-between py-2 border-b"><span className="text-slate-500">Payment Rate</span><span className="text-right">₦53,589.00</span></div>
              <div className="flex justify-between py-2"><span className="text-slate-500">Status</span><span className="text-right"><span className="px-3 py-1 rounded-full text-xs bg-purple-50 text-purple-600">{editRow.status}</span></span></div>
            </div>

            <div className="mt-6">
              <button className="w-full bg-[#0b93c6] text-white py-2 rounded-md mb-3">Message</button>
              <button className="w-full border border-[#0b93c6] text-[#0b93c6] py-2 rounded-md" onClick={() => setEditRow(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setDeleteRow(null)} />
          <div className="relative bg-white w-[320px] rounded-lg shadow-lg p-5 z-50 text-center">
            <button className="absolute right-3 top-3 text-slate-400 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center" onClick={() => setDeleteRow(null)}>✕</button>
            <h4 className="text-lg font-medium mb-2">Cancel Request</h4>
            <p className="text-sm text-slate-600 mb-4">Are you sure you want to cancel request?</p>
            <div className="flex items-center justify-center gap-3">
              <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => { setRows(rows.filter(x => x.id !== deleteRow.id)); setDeleteRow(null); }}>Delete</button>
              <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md" onClick={() => setDeleteRow(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;

