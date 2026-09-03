import React from 'react';
import { Search, Plus, Upload, Save, Settings, Users, Database, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminScreen() {
  const documents = [
    { id: 'DOC001', title: 'Annihilation of Caste (Original Manuscript)', type: 'Manuscript', status: 'Digitized', tags: 'Caste, Reform', date: '2023-10-12', access: 'Public' },
    { id: 'DOC002', title: 'Speech at Mahad Satyagraha', type: 'Audio', status: 'Processing', tags: 'Dalit Rights', date: '2023-10-15', access: 'Public' },
    { id: 'DOC003', title: 'Constituent Assembly Final Address', type: 'Transcript', status: 'Digitized', tags: 'Constitution', date: '2023-10-20', access: 'Public' },
    { id: 'DOC004', title: 'Personal Letters to Family', type: 'Letter', status: 'Archived', tags: 'Personal', date: '2023-11-05', access: 'Restricted' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row text-gray-800 font-sans">
      {/* Sidebar */}
      <div className="w-full lg:w-64 lg:h-screen bg-gray-900 text-white flex flex-col flex-shrink-0">
        <div className="p-4 lg:p-6 border-b border-gray-800">
          <h1 className="text-lg lg:text-xl font-bold leading-tight">Archive Admin</h1>
          <p className="text-gray-400 text-xs lg:text-sm mt-1">Staff Portal</p>
        </div>
        <nav className="flex-1 p-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
          <a href="#" className="flex items-center space-x-3 bg-blue-600 text-white px-4 py-3 rounded-lg font-medium">
            <Database size={20} />
            <span>Documents</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <Users size={20} />
            <span>Users & Access</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-300 hover:bg-gray-800 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <Settings size={20} />
            <span>System Config</span>
          </a>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link to="/" className="flex items-center space-x-3 text-gray-400 hover:text-white px-4 py-3 rounded-lg font-medium transition-colors">
            <LogOut size={20} />
            <span>Exit to Kiosk</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:h-screen lg:overflow-hidden min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 lg:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Document Management</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <div className="relative">
              <input type="text" placeholder="Search archive..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Plus size={20} />
              <span>Add New Document</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 flex flex-col xl:flex-row gap-8">
          
          {/* Table */}
          <div className="flex-[2] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Date Added</th>
                  <th className="p-4 font-semibold">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documents.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="p-4">
                      <p className="font-semibold text-gray-800">{doc.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{doc.id} • {doc.tags}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{doc.type}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        doc.status === 'Digitized' ? 'bg-green-100 text-green-700' :
                        doc.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">{doc.date}</td>
                    <td className="p-4 text-sm text-gray-600">{doc.access}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form Side Panel */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Add New Document</h3>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Document title" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                    <option>Manuscript</option>
                    <option>Book</option>
                    <option>Speech</option>
                    <option>Photo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                  <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                    <option>Public</option>
                    <option>Restricted</option>
                    <option>Staff Only</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Caste, Law, History" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none" placeholder="Brief description of the document..."></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
                  <Upload size={32} className="mb-2 text-gray-400" />
                  <p className="text-sm">Click to upload or drag and drop</p>
                  <p className="text-xs mt-1">PDF, JPG, MP4 up to 50MB</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Preservation Status</p>
                  <p className="text-xs text-blue-600">Off-site backup pending</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Database size={20} />
                </div>
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center space-x-2">
                <Save size={20} />
                <span>Save to Archive</span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
