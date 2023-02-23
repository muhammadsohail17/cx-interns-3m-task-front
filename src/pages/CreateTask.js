import React, { useState } from 'react';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('pending');
    const [project, setProject] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Send form data to backend here
    };
  
    return (
      <div className="max-w-md mx-auto my-8">
        <h1 className="text-2xl font-bold mb-4">Create Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-2 font-bold text-gray-700">Title:</label>
            <input type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} required className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2" />
          </div>
  
          <div>
            <label htmlFor="content" className="block mb-2 font-bold text-gray-700">Content:</label>
            <textarea id="content" name="content" value={content} onChange={(event) => setContent(event.target.value)} required className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2" />
          </div>
  
          <div>
            <label htmlFor="coverImage" className="block mb-2 font-bold text-gray-700">Cover Image:</label>
            <input type="file" id="coverImage" name="coverImage" onChange={(event) => setCoverImage(event.target.files[0])} className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2" />
          </div>
  
          <div>
            <label htmlFor="dueDate" className="block mb-2 font-bold text-gray-700">Due Date:</label>
            <input type="date" id="dueDate" name="dueDate" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2" />
          </div>
  
          <div>
            <label htmlFor="status" className="block mb-2 font-bold text-gray-700">Status:</label>
            <select id="status" name="status" value={status} onChange={(event) => setStatus(event.target.value)} className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
  
          <div>
            <label htmlFor="project" className="block mb-2 font-bold text-gray-700">Project:</label>
            <input type="text" id="project" name="project" value={project} onChange={(event) => setProject(event.target.value)} className="block w-full border-gray-400 rounded-lg shadow-sm py-2 px-4 mb-2" />
          </div>
  
          <div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Task</button>
          </div>
        </form>
        </div>
    )
}

export default CreateTask;