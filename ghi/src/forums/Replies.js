import React, { useState, useEffect } from 'react';
import { useCreateReplyMutation, useDeleteReplyMutation, useGetRepliesQuery, useGetReplyQuery, useUpdateReplyMutation } from '../store/replyApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';



export default function Replies({id}){
  const { data: replyData } = useGetRepliesQuery(`${id}`);
  const [ post, replied ] = useCreateReplyMutation();
  const [ update, edited] = useUpdateReplyMutation();
  const [deleteReply] = useDeleteReplyMutation();
  const [answer, setAnswer] = useState('');
  const [image, setImage] = useState('');
  const [editedAnswer, setEditAnswer] = useState('')
  const [editedImage, setEditImage] = useState('')
  const user = useSelector(state => state.auth.user.username);


  const handleSubmit = async (e) => {
    e.preventDefault();
    await post({ 'answer': answer, 'forum_id': id, 'image': image, 'rating': 0});
    setAnswer('');
    setImage('');
    e.target.reset()
  };
  if (replied.isSuccess){
        replied.reset()
        toast.success('📝 Your reply was posted!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored", toastId:'un'
        });
  }

   if (edited.isSuccess){
    edited.reset()
    toast.success('♻️Your reply has been updated!', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored", toastId:'recycle'
    });
   }

    return(

  <section className=" dark:bg-gray-900 py-8 lg:py-16" >
    <form className=" bg-color5 bg-opacity-70 mb-6 max-w-5xl ml-12 p-5 rounded-2xl shadow-xl" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="text-lg lg:text-2xl font-bold p-2 mb-5 text-gray-900 dark:text-white">Reply</h2>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea type="text" id="comment" rows="6"
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write a reply..." required></textarea>
        </div>
              <input
                className="w-full rounded-lg text-sm py-2 pl-2 pr-[70px] bg-gray-100 mb-3 mr-2 focus:outline-secondary-200"
                type="text"
                placeholder="Image URL here"
                onChange={e => setImage(e.target.value)}
                maxLength="400"
              />
        <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post Reply
        </button>
    </form>
        <h2 className="text-lg lg:text-2xl p-4 font-bold text-gray-900 dark:text-white">Replies</h2>
      {Array.isArray(replyData) && replyData.map(reply =>{
            const options = {
                month: "long",
                day: "numeric",
                year: "numeric",
            };
        const replyId = reply.id
            return(
                <>
    <article key={reply.id} id="reply" className="shadow-lg overflow-visible selection:max-w-6xl min-w-5xl p-6 mb-6 static break-words text-base bg-color6 rounded-lg dark:bg-gray-900">
        <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center" key={reply.id}>
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={reply.avatar}
                        alt="Avatar" />User: {reply.username}</p>
            </div>



        {reply.username === user ?
            <>
            <div className="dropdown" >
                <label tabIndex={0} className="">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                    </svg>
                </label>
                <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box w-52">
                    <li><label htmlFor={`${reply.id}`} className="bg-color4/60 hover:bg-color4 flex  hover:bg font-bold justify-center">Edit Reply</label></li>
                    <li><label htmlFor='delete' className="bg-red-500 hover:bg-red-700 hover:bg font-bold justify-center">Delete Reply</label></li>
                </ul>
             </div>
                </>
            : null }
        </footer>
        <p key={reply.id} className="text-black-500 dark:text-gray-400">{reply.answer}</p>
        {reply.image != null ? <img src={reply.image} className='flex items-center object-scale-down max-w-md mx-auto' /> : null}
        <div className="flex items-center mt-4 space-x-4">
            <p
                className="flex items-center text-sm text-black-500 hover:underline dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16"> <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/> <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/> </svg>
                {new Date(reply.created_on).toLocaleDateString("en-US", options)} {new Date(reply.created_on).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
        </div>
    {/* Modal for editing a Reply */}
    <input type="checkbox" id={`${reply.id}`} className="modal-toggle" />
       <div className="modal" >
         <div className="modal-box w-11/12 max-w-3xl">
           <form onSubmit={ async(e) => {e.preventDefault(); await update( {id: `${replyId}`, data:{'answer':editedAnswer,'rating': 0, 'image': editedImage, 'forum_id': id}}) }}>
             <div className=" bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
               <h1 className="text-center text-2xl font-bold text-black-500 mb-10">Edit Reply</h1>
               <div className="space-y-4">
                 <label htmlFor={`${reply.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                 <div>
                  <label htmlFor="answer" className="text-xl font-bold ">Answer</label>
                  <textarea type="text"  required defaultValue={reply.answer} id="answer" className="w-full outline-none py-1 px-2 text-md border-2 rounded-md" onChange={(e) => setEditAnswer(e.target.value)}/>
                 </div>
                 <div>
                  <label htmlFor="name" className="text-lx font-serif">Image URL</label>
                  <input type="text" defaultValue={reply.image} id="image" className="w-full ml-2 outline-none py-1 px-2 text-md border-2 rounded-md" onChange={(e) => setEditImage(e.target.value)} />
                 </div>
                </div>
                console.log(reply.id)
                <div className="modal-action flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-3 dark:border-opacity-50">
                  <label htmlFor={`${reply.id}`} className="hover:bg-red-800 px-6 py-2  block rounded-md text-lg font-semibold text-gray-100 bg-red-600 ">Exit</label>
                  <button className="hover:bg-lime-800 px-6 py-2 mx-auto block rounded-md text-lg font-semibold bg-lime-600 text-gray-100" type="submit">Update</button>
                </div>
            </div>
           </form>
         </div>
       </div>
    {/* Modal for deleting a reply */}
    <input type="checkbox" id="delete" className="modal-toggle" />
      <div className='modal'>
        <div className='modal-box max-w-md '>
          <div className='bg-white flex justify-center  rounded-md2'>
            <div className='py-3'>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1  items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center mx-auto text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                     <h2 className="text-center pt-2 text-xl font-extrabold ">This will uproot the thread!</h2>
                       <div className='modal-action  flex justify-center '>
                         <label htmlFor="delete" className=" hover:bg-lime-800 px-6 py-2  block rounded-md text-lg font-semibold text-indigo-100 bg-lime-600 ">Keep</label>
                         <button onClick={async(e) => {e.preventDefault();  await deleteReply(reply.id);}} className="hover:bg-amber-800  px-6 py-2 block rounded-md text-lg font-semibold text-indigo-100 bg-amber-600 ml-3" >Delete</button>
                       </div>
                    </div>
                 </div>
                </div>
        </div>
    </article>
    </>
    )
  })}
</section>
        )

};
